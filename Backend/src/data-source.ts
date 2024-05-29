import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Following } from "./entities/Following"
import { Like } from "./entities/Like"
import { Thread } from "./entities/Thread"
import { Reply } from "./entities/Reply"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "administrator",
    database: "circleApp",
    synchronize: false,
    logging: false,
    entities: [Reply, Following, Like, User, Thread],
    migrations: ['./src/migrations/1716913520192-circleMigration.ts'],
    subscribers: [],
})
