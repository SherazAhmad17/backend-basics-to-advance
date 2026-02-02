import app from "./app.js";

const PORT = process.env.PORT || 3000;


app.listen(PORT, (err) => {

    if(err){
    console.error('Error starting server:', err);
    }
    console.log(`Server is running on port ${PORT}`);



}   );