import mongoose from "mongoose";
import chalk from "chalk";

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(chalk.green.bold(`server is successfully connected on ${conn.connection.host} and port ${conn.connection.port}`));
    } catch (error) {
        console.log(chalk.red.bold(`failed to connect to database: ${error.message}`));
        process.exit(1);
    }
}

export default ConnectDB;
