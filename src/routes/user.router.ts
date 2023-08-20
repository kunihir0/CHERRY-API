import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { CustomDataSource } from '../config/data-source';

export class UserRouter {
    private fastifyInstance: FastifyInstance;
    private userController: UserController;

    constructor(fastifyInstance: FastifyInstance, appDataSource: CustomDataSource) {
        this.fastifyInstance = fastifyInstance;
        this.userController = new UserController(appDataSource);
    }

    public initializeRoutes() {
        this.fastifyInstance.register((instance, opts, done) => {
            instance.post('/login', this.userController.login);
            instance.get('/', this.userController.getAllUsers);
            instance.post('/signup', this.userController.signUp);

            // Add your authentication logic here
            instance.addHook('onRequest', this.authenticate);

            done();
        }, { prefix: '/api/users' });
    }

    private authenticate(request, reply, done) {
        // Your authentication logic here
        done();
    }
}
