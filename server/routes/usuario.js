const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario");
const {
  verificarToken,
  verificarAdminRole,
} = require("../middlewares/autenticacion");

const app = express();

app.get("/usuario", verificarToken, (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({ estado: true }, "nombre email role estado google img")
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Usuario.countDocuments({ estado: true }, (err, cont) => {
        //count() deprecated
        res.json({
          ok: true,
          usuarios: usuarios,
          count: cont,
        });
      });
    });
});

app.post("/usuario", [verificarToken, verificarAdminRole], function (req, res) {
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

app.put(
  "/usuario/:id",
  [verificarToken, verificarAdminRole],
  function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

    Usuario.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }, //retorna nuevo objeto, exec validators
      (err, usuarioDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }

        res.json({
          ok: true,
          usuario: usuarioDB,
        });
      }
    );
  }
);

app.delete(
  "/usuario/:id",
  [verificarToken, verificarAdminRole],
  function (req, res) {
    let id = req.params.id;

    Usuario.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }, //retorna nuevo objeto
      (err, usuarioDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }

        res.json({
          ok: true,
          usuario: usuarioDB,
        });
      }
    );
  }
);

module.exports = app;
