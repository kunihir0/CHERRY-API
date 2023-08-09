import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "../entity/users"

export class CustomDataSource extends DataSource {
    constructor() {
        super({
            type: "mongodb",
            database: "cherry_api",
            host: "localhost",
            replicaSet: "cherry",
            port: 30001,
            directConnection: true,
            synchronize: true,
            logging: true,
            entities: [User],
            migrations: [],
            subscribers: []
        });
    }
}
