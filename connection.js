const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:adm123@cluster0-ygxxi.mongodb.net/gameData?retryWrites=true&w=majority', { useNewUrlParser: true })
    //mongoose.connect('mongodb+srv://admin:adm123@mohdatabase-ykmzo.mongodb.net/loginDB?retryWrites=true', { useNewUrlParser: true })
    .then(() => console.log("Succesfully Connected"))
    .catch((err) => console.error(err));



module.exports = mongoose;