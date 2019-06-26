const Usermodel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const consts = require("../consts");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async function(req, res) {
    try {
      let u = await Usermodel.findOne({ email: req.body.email });
      if (!u) {
        const user = new Usermodel(req.body);
        user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);
        await user.save();
        delete user.password;
        res.status(200).json(user);
      } else {
        res.status(403).json({ message: "E-mail já registrado", error: e });
      }
    } catch (e) {
      res.status(500).json({ message: "Error save", error: e });
    }
  },

  login: function(req, res) {
    const password = req.body.password;
    const email = req.body.email;

    Usermodel.findOne({ email: email })
      .lean()
      .exec(function(err, user) {
        if (err) {
          return res.status(500).json({
            message: "Servidor com erro",
            error: err
          });
        }

        const auth_err = password == "" || password == null || !user;

        if (!auth_err) {
          if (bcrypt.compareSync(password, user.password)) {
            let token = jwt.sign({ id: user.id }, consts.keyJWT, {
              expiresIn: consts.expiresJWT
            });
            delete user.password;
            return res.json({
              ...user,
              token: token
            });
          }
        }

        return res.status(404).json({
          message: "E-mail errado ou Senha."
        });
      });
  }
};
