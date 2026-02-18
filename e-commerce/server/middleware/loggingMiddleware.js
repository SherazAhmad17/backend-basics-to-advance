import chalk from "chalk";

function loggingMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;

    console.log(chalk.cyan(`[${timestamp}]`) + " " + chalk.yellow.bold(method) + " " + chalk.white(url));

    next();
}

export default loggingMiddleware;
