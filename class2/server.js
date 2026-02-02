import app from './app.js';

const port = process.env.PORT || 7744;


app.listen(port, ()=>{
    if(!port){
        console.log('Error in server setup');
        process.exit(1);
    }
    console.log(`Server is running on port ${port}`);
})