import pino from 'pino';

export class Logger {
    private logger: pino.Logger;

    constructor() {
        this.logger = pino();
    }

    public info(message: string, data?: object) {
        this.logger.info(data, message);
    }

    public error(message: string, data?: object) {
        this.logger.error(data, message);
    }

    public warn(message: string, data?: object) {
        this.logger.warn(data, message);
    }

    public debug(message: string, data?: object) {
        this.logger.debug(data, message);
    }
}
