const User = require("./covidInfo.model.js");

exports.findAll = function (req, res) {
  User.findAll(function (err, user) {
    console.log("In controller findAll");
    if (err) res.send(err);
    console.log("res".user);
    res.send(user);
  });
};

exports.create = function (req, res) {
  /*const new_user = new User(req.body);*/
  const new_user = req.body.user;
  console.log(new_user);
  if (req.body.constructor == Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    User.create(new_user, function (err, user) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "user added successfully",
        data: user,
      });
    });
  }
};

exports.findById = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.update = function (req, res) {
  User.update(req.params.id, new User(req.body), function (err, user) {
    if (err) res.send(err);
    res.json({ error: false, message: "user update successfully" });
  });
};

exports.delete = function (req, res) {
  User.delete(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json({ error: false, message: "user delete successfully" });
  });
};
