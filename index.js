const express = require("express");
let servidor = express();

let array = [
  {
    nombre: "Pchan",
    edad: 2,
    tipo: "cerdo",
  },
  {
    nombre: "Olivia",
    edad: 8,
    tipo: "perro",
  },
  {
    nombre: "Dune",
    edad: 6,
    tipo: "gato",
  },
  {
    nombre: "Thedas",
    edad: 6,
    tipo: "perro",
  },
  {
    nombre: "Fuji",
    edad: 13,
    tipo: "perro",
  },
];

servidor.get("/", (req, res) => {
  let mostrarAnimales = "";
  for (let i = 0; i < array.length; i++) {
    mostrarAnimales += `
            <h3>Nombre: ${array[i].nombre}</h3>
            <p>Edad: ${array[i].edad}</p>
            <p>Tipo: ${array[i].tipo}</p>
            <form action="/adoptar">	
            <input type="hidden" value="${array[i].nombre}" name="nombre">
            <button type=“submit”>Adoptar</button>
        </form>
        `;
  }
  res.send(mostrarAnimales);
});

servidor.get("/sumar-animal", (req, res) => {
  let nombre = req.query.nombre;
  let edad = req.query.edad;
  let tipo = req.query.tipo;

  let animal = {
    nombre: nombre,
    edad: edad,
    tipo: tipo,
  };
  array.push(animal);
  res.send("El animal ha sido añadido");
});

servidor.get("/dejar-animal", (req, res) => {
  let formulario = `
        <form action="/sumar-animal">	
            <input placeholder="nombre" type="text" name="nombre">
            <input placeholder="edad" type="text" name="edad">
            <input placeholder="tipo" type="text" name="tipo">
            <button type=“submit”>Enviar</button>
        </form>
    `;
  res.send(formulario);
});

servidor.get("/adoptar", (req, res) => {
  let boolean = false;
  let nombre = req.query.nombre;
  for (let i = 0; i < array.length; i++) {
    if (nombre === array[i].nombre) {
      array.splice(i, 1);
      boolean = true;
      res.send("El animal con ese nombre se ha borrado de la lista");
    }
  }
  boolean
    ? res.send("El animal con ese nombre se ha borrado de la lista")
    : res.send("El animal con ese nombre no existe");
});

servidor.listen(3002);
