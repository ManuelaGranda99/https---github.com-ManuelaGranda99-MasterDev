const express = require("express");
const { createReadStream } = require('fs')
var cors = require('cors');
const multer = require('multer')

var modelo = require('./usuarios')
var modeloUbicacion = require('./ubicacion');
var modeloInmueble = require('./Inmuebles');

const app = new express();
const HTML_CONTENT_TYPE = 'text/html'
const bodyParser = require("body-parser");

let fs = require("fs")

app.use(bodyParser.json());
app.use(cors());

const path = require("path");
app.use(express.static("./public")); // direccion de los archivos a los cuales 
let objMulter = multer({ dest: "./public" })

app.use(objMulter.any());

require('./conexion_bd') // solicita la conexion a la base de datos en Mongo

///////inserter imueble

// app.put("/registrarInmueble", (req,res) => {
//     console.log("llego al final");
//     const respuesta={
//         nombre: req.body.nombre,
//         tipo: req.body.tipo,
//         barrio:req.body.barrio,
//         Transaccion:req.body.Transaccion,
//         Area:req.body.Area,
//         Banios:req.body.Banios,
//         habitaciones:req.body.habitaciones,
//         Estrato:req.body.Estrato,
//         precio:req.body.precio
//     }
//     modeloInmueble.collection.insertOne(respuesta, function(err, res) {
//         if (err) throw err;

//     })
//     res.send(JSON.stringify(respuesta))
// });

app.put("/registrarInmueble", (req, res) => {

    let oldname = req.files[0].path;
    let newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
    fs.renameSync(oldname, newName);

    const dir = "http://localhost:900/" + req.files[0].filename + path.parse(req.files[0].originalname).ext;
    console.log(dir);

    modeloUbicacion.find({ barrio: req.body.barrio }, (err, docs) => {
        var myobj = {
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            imagen: dir,
            ubicacion: docs[0]._id,
            Transaccion: req.body.transaccion,
            Area: req.body.area,
            Banios: req.body.banios,
            habitaciones: req.body.habitaciones,
            Estrato: req.body.estrato,
            Precio: req.body.precio,
            Descripcion: 'va la descrip.'
        };
        modeloInmueble.collection.insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
        console.log(docs[0]._id)
    });

    res.send(JSON.stringify({ respo: "correcto" }));

});

////////////////Guardar imagen

app.post("/guardarImagen", (req, res) => {
    let archivo = req.files[0].originalname;
    let oldname = req.files[0].path;
    let newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
    fs.renameSync(oldname, newName);

    const dir = "http://localhost:900/" + req.files[0].filename + path.parse(req.files[0].originalname).ext;

    console.log(dir);
    // console.log(req.files[0].originalname);
})

///////insertar ubicacion

app.put("/insertarUbicacion", (req, res) => {
    console.log("insertando ubicacion");
    var myobj = {
        zona: req.body.zona,
        barrio: req.body.barrio
    };

    modeloUbicacion.collection.insertOne(myobj, function(err, res) {
        if (err) throw err;

    });
    res.send(JSON.stringify({ respo: "correcto" }));
});

//////////ingresar usuario

app.put("/insertarUsu", (req, res) => {
    console.log("insertando usuario");
    var usuario = {
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        celular: req.body.celular,
        user: req.body.user,
        clave: req.body.clave

    };

    modelo.collection.insertOne(usuario, function(err, res) {
        if (err) throw err;

    });
});

///////////// login . iniciar sesion

app.post("/login", (req, res) => {
    console.log(req.body);
    var usuario = {
        user: req.body.user,
        clave: req.body.clave
    };
    modelo.find(usuario, function(err, res1) {
        // if (err) throw err;
        console.log(res);
        res.end(JSON.stringify({ respuesta: res1.length > 0 }));
    });
});

//CONSULTA DE OBJETOS RELACIONADOS 

// modeloInmueble.find({}, function (err, inmuebles) {
//     modeloUbicacion.populate(inmuebles, { path: "ubicacion" }, function (err, inmuebles) {
//         console.log(inmuebles[0].ubicacion.barrio);
//     })
// })

///////////////   Consulta personalizada inmuebles
app.get("/consultaInmu", (req, res) => {
    console.log(req.query);
    var myobj = {
        tipo: req.query.tipo,
        Transaccion: req.query.transaccion,
        habitaciones: req.query.habitaciones,
        barrio: req.query.barrio
    };
    modeloInmueble.find(myobj, function(err, inmuebles) {
        console.log(inmuebles);
        modeloUbicacion.populate(inmuebles, { path: "ubicacion" }, function(err, inmuebles) {

            res.end(JSON.stringify(inmuebles));
        });
    });
});

/////////////consulta disponibles

app.get("/consulta", (req, res) => {
    modeloInmueble.find({}, function(err, inmuebles) {
        modeloUbicacion.populate(inmuebles, { path: "ubicacion" }, function(err, inmuebles) {
            //console.log(inmuebles);
            res.end(JSON.stringify(inmuebles));
        });
    });
});

/////////////////////////////////////////

app.post("/upload", (req, res) => {
    var myobj = {
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        celular: req.body.celular,
        user: req.body.user,
        clave: req.body.clave
    };
    modelo.collection.insertOne(myobj, function(err, res) {
        if (err) throw err;

    })
    res.send("upload documento guardado con exito")
})

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': HTML_CONTENT_TYPE })
    createReadStream('./index.html').pipe(res)
        //res.end("hola mundo");
});

app.listen(900, () => {

    console.log("aplicacion corriendo en el puerto 900");

});