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
if (process.env.NODE_ENV === "dev") {
  urlDB =
    "mongodb+srv://generalUser:WM2ohphEjekZQhlj@cluster0.pc6ee.mongodb.net/cafe?retryWrites=true&w=majority";
} else {
  urlDB =
    "mongodb+srv://generalAppUsua:lucuma2020@cluster0.a8kcm.mongodb.net/cafe?retryWrites=true&w=majority";
}

process.env.urlDB = urlDB;
