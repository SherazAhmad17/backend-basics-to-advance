import app from './app.js';
import ConnectDB from './config/db.config.js';
import chalk from 'chalk';

const port = process.env.PORT || 3000;

ConnectDB()

.then(()=>{
    app.listen(port, ()=>{
        console.log(chalk.blue.bgBlack.bold.underline(`server is running on port ${port}`))
    })
})
.catch((err)=>{
    console.log(chalk.red.bgCyan.bold.underline(`failed to connect to server`))
})
