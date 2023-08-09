import fastify, { FastifyInstance } from 'fastify';
import pino from 'pino';

export class Cherry {
    private server: FastifyInstance;
    private port: number;
    private nodeEnv: string;

    constructor(port: number, nodeEnv: string) {
        this.port = port;
        this.nodeEnv = nodeEnv;

        this.server = fastify({
            logger: pino({ level: 'info' }),
        });
    }

    public async start() {
        try {
            this.server.setErrorHandler((error, request, reply) => {
                this.server.log.error(error);
            });
            this.server.get('/', (request, reply) => {
                reply.send({ name: 'CHERRY SERVER' });
            });

            if (this.nodeEnv === 'production') {
                for (const signal of ['SIGINT', 'SIGTERM']) {
                    process.on(signal, () =>
                        this.server.close().then((err) => {
                            console.log(`close application on ${signal}`);
                            process.exit(err ? 1 : 0);
                        }),
                    );
                }
            }

            await this.server.listen({ port: this.port });

        } catch (e) {
            console.error(e);
        }
    }
}
