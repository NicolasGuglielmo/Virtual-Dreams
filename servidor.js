const express = require('express');
const path = require('path');
const rp = require('request-promise');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(4000, () => {
    console.log('Escuchando puerto 4000')
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,"crearPersonas.html"));
});

app.post('/', (req, res) => {
    var codEstado = 201;
    dniInt = parseInt(req.body.dni);
    try {
        if (Object.keys(req.body).length < 4) {

            if (req.body.dni != '' && dniInt > 0 && dniInt <= 999999999) {
                if (req.body.apellido != "" && typeof req.body.apellido === 'string') {
                    var options = {
                        method: 'POST',
                        uri: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
                        body: {
                            nombre: req.body.nombre,
                            apellido: req.body.apellido,
                            dni: dniInt
                        },
                        json: true
                    };
                    
                    rp(options)
                    .then(function (resp) {
                        res.status(codEstado).send(options.body);
                    })
                    .catch(function (err) {
                        resp.status(500).send("Error en el POST: " + err);
                        console.log('error: ' + err);
                    });
                    
                } else {
                    codEstado = 400;
                     throw new Error(`Codigo Estado:${codEstado}, En el campo Apellido se envio: "${req.body.apellido}"`);
                }
            } else {
                codEstado = 400;
                throw new Error(`Codigo Estado:${codEstado}, En el campo DNI se envio: "${req.body.dni}"`);
        }
    }
        else {
            throw new Error("La cantidad de atributos enviadas es mayor a la solicitada.");
        }
    } catch (err2) {
        var error = err2;
        if (codEstado === 201)
            codEstado = 500;
        console.log(err2);
        res.status(codEstado).send("Error inesperado, revise bien las celdas antes de enviar la informacion");
    }
});