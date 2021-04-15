//========================
// PUERTO
//========================

process.env.PORT = process.env.PORT || 3000;

//========================
// ENTORNO
//========================

process.env.NODE_ENV = process.env.NODE_ENV || "dev"; //env de heroku

//========================
// BASE DE DATOS
//========================
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB =
    "mongodb+srv://generalUser:WM2ohphEjekZQhlj@cluster0.pc6ee.mongodb.net/cafe?retryWrites=true&w=majority";
} else {
  urlDB = process.env.MONGO_URI_PROD;
}

process.env.uriDB = urlDB;
