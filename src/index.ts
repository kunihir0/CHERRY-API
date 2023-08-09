import { CustomDataSource } from "./config/data-source"
import { User } from "./entity/users"
import { Cherry } from "./cherry"
import { UserUtil } from "./lib/user.util"

class Main {
    private cherry = new Cherry(5000, "development");
    public appDataSource = new CustomDataSource();
    public userUtil: UserUtil;

    constructor() {
        this.userUtil = new UserUtil(this.appDataSource);
        this.appDataSource.initialize().then(async () => {
            try {
                this.userUtil.createUser("poop", 999, "poop@email.moe");
            } catch (error) {
                console.error(error);
            }

            // Start the Fastify server here
            this.cherry.start();

        }).catch(error => console.log(error))
    }
}

new Main();

