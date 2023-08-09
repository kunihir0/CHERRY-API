import { User } from "../entity/users";
import { CustomDataSource } from "../config/data-source";
import { Logger } from "./logger";
import { ObjectId } from "typeorm";

// Method for editing an existing user
export class UserUtil {
    private appDataSource: CustomDataSource;
    private logger: Logger;

    // Constructor takes an instance of CustomDataSource as an argument
    constructor(appDataSource: CustomDataSource) {
        this.appDataSource = appDataSource;
        this.logger = new Logger();
    }

    // Method for editing an existing user
    public async createUser(username: string, age: number, email: string) {
        // Check if username or email already exists
        if (
            (await this.findUserByUsername(username)) ||
            (await this.findUserByEmail(email))
        ) {
            this.logger.warn("Username or email already exists");
            return { error: "Username or email already exists" };
        }

        // Create and save new user
        const newUser = new User();
        newUser.username = username;
        newUser.age = age;
        newUser.email = email;
        await this.appDataSource.manager.save(newUser);
        this.logger.info("Created new user", { id: newUser.id });
        return newUser;
    }

    // Method for editing an existing user
    public async editUser(id: ObjectId, data: Partial<User>) {
        // Check if user exists
        const existingUser = await this.findUserById(id);
        if (!existingUser) {
            this.logger.warn("User not found", { id });
            return { error: "User not found" };
        }

        await this.appDataSource.manager.update(User, id, data);
        this.logger.info("Updated user", { User });
    }

    // Method for deleting an existing user
    public async deleteUser(id: ObjectId) {
        // Check if user exists
        const existingUser = await this.findUserById(id);
        if (!existingUser) {
            this.logger.warn("User not found", { id });
            return { error: "User not found" };
        }

        await this.appDataSource.manager.delete(User, id);
        this.logger.info("Deleted user", { id });
    }

    // Method for finding a user by their username
    public async findUserByUsername(username: string) {
        let user = await this.appDataSource.manager.findOne(User, {
            where: { username },
        });

        if (user) {
            this.logger.info("Found user", { user });
        } else {
            this.logger.warn("User not found", { username });
        }
        return user;
    }

    // Method for finding a user by their email
    public async findUserByEmail(email: string) {
        let user = await this.appDataSource.manager.findOne(User, {
            where: { email },
        });

        if (user) {
            this.logger.info("Found user", { user });
        } else {
            this.logger.warn("User not found", { email });
        }
        return user;
    }

    // Method for finding a user's ID by either their username or email
    public async findUserById(id: ObjectId) {
        let user = await this.appDataSource.manager.findOne(User, {
            where: { id },
        });

        if (user) {
            this.logger.info("Found user", { user });
        } else {
            this.logger.warn("User not found", { id });
        }
        return user;
    }

    // Method for finding a user's ID by either their username or email
    public async findUserIdByUsernameOrEmail(username?: string, email?: string) {
        let user;
        if (username) {
            user = await this.appDataSource.manager.findOne(User, { where: { username } });
        } else if (email) {
            user = await this.appDataSource.manager.findOne(User, { where: { email } });
        }

        if (user) {
            this.logger.info('Found user', { user });
            return user.id;
        } else {
            this.logger.warn('User not found', { username, email });
            return undefined;
        }
    }
}
