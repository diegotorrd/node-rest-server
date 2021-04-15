require("./config/config");

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//routes
app.use(require("./routes/usuario"));

//base de datos
mongoose.connect(
  process.env.uriDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, res) => {
    if (err) {
      console.log("envv : " + process.env.uriDB);
      throw err;
    }

    console.log("Base de datos ONLINE");
  }
);

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT);
});
