import { UserUtil } from '../lib/user.util';
import { CustomDataSource } from '../config/data-source';

export class UserController {
    private userUtil: UserUtil;

    constructor(appDataSource: CustomDataSource) {
        this.userUtil = new UserUtil(appDataSource);
    }

    public async login(request, reply) {
        console.log('login function called');
        try {
            const { email, password } = request.query; // Use request.query here
            console.log('finding user');
            // Find user by email
            // Check password
            // Generate token
            console.log('sending response');
            reply.code(200).send({
                token: 'generated_token',
                user: 'found_user',
            });
        } catch (err) {
            console.log('error occurred', err);
            // Handle server error
        }
    }

    public async getAllUsers(request, reply) {
      console.log('getAllUsers function called');
      try {
        // Get all users
        reply.code(200).send('all_users');
      } catch (err) {
        console.log('error occurred', err);
        // Handle server error
      }
    }

    public async authenticate(request, reply, done) {
      try {
        const token = request.headers.authorization.split(' ')[1];
        // Verify token
        request.authUser = 'decoded_token';
        done();
      } catch (err) {
        reply.code(401).send({ message: 'Unauthorized' });
      }
    }

    public async signUp(request, reply) {
      console.log('signUp function called');
      try {
        const { email, password, firstName, lastName } = request.query;
        console.log('finding user');
        // Find user by email
        // Check if user already exists
        console.log('hashing password');
        // Hash password
        console.log('creating user');
        // Create new user
        console.log('generating token');
        // Generate token
        console.log('sending response');
        reply.code(200).send({
          token: 'generated_token',
          user: 'created_user',
        });
      } catch (err) {
        console.log('error occurred', err);
        // Handle server error
      }
    }
  }
