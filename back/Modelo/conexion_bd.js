// Este codigo conecta la base de datos creada en Mongo BD
const mongourl = "mongodb+srv://manuelagranda:mg1000396461@desarrolloweb.juexf.mongodb.net/InmobiliariaMaster?retryWrites=true&w=majority";
var mongoose = require('mongoose');

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("mongodb is connected");
}).catch((error) => {
    console.log("mondb not connected");
    console.log(error);
});
//mongodb+srv://manuelagranda:mg1000396461@desarrolloweb.juexf.mongodb.net/InmobiliariaMaster?retryWrites=true&w=majority
//mongodb+srv://IvanG:981130@clusterg.ivx5s.mongodb.net/Inmuebles?retryWrites=true&w=majority