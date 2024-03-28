var connection = require("../config/db.js");

var User = function (user) {
  this.national_id = user.national_id;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.city = user.city;
  this.street = user.street;
  this.building_number = user.building_number;
  this.date_of_birth = user.date_of_birth;
  this.phone_number = user.phone_number;
  this.cell_phone_number = user.cell_phone_number;
};

var Covid = function (covid) {
  this.user_national_id = covid.user_national_id;
  this.first_vaccine_date = covid.first_vaccine_date;
  this.first_vaccine_manu = covid.first_vaccine_manu;
  this.second_vaccine_date = covid.second_vaccine_date;
  this.second_vaccine_manu = covid.second_vaccine_manu;
  this.third_vaccine_date = covid.third_vaccine_date;
  this.third_vaccine_manu = covid.third_vaccine_manu;
  this.fourth_vaccine_date = covid.fourth_vaccine_date;
  this.fourth_vaccine_manu = covid.fourth_vaccine_manu;
  this.positive_date = covid.positive_date;
  this.recover_date = covid.recover_date;
};

User.create = function (newUser, result) {
  connection.beginTransaction(function (err) {
    if (err) {
      throw err;
    }
    const {
      firstName,
      lastName,
      userId,
      address,
      birthdate,
      phone,
      cellphone,
    } = newUser;
    connection.query(
      `INSERT INTO users (national_id, first_name, last_name, date_of_birth, phone_number, cell_phone_number, city, street, building_number) VALUES (${userId}, '${firstName}', '${lastName}', '${birthdate}', '${phone}', '${cellphone}', "null", "null", 0)`,
      function (err, res) {
        if (err) {
          connection.rollback(function () {
            throw err;
          });
        }
    /*connection.query(
      `INSERT INTO users ('national_id','first_name','last_name','date_of_birth','phone_number','cell_phone_number') VALUES (${userId},${firstName},${lastName},${birthdate},${phone},${cellphone})`,
      function (err, res) {
        if (err) {
          connection.rollback(function () {
            throw err;
          });
        }*/
        
    
        /*connection.query(
          "INSERT INTO covid set ?",
          newCovid,
          function (err, res) {
            if (err) {
              connection.rollback(function () {
                throw err;
              });
            }
            connection.commit(function (err) {
              if (err) {
                connection.rollback(function () {
                  throw err;
                });
              }
              console.log("Transaction Complete.");
              result(null, res);
            });
          }
        );*/
      }
    );
  });
};

User.apply.findByNationalId = function (id, result) {
  connection.query(
    "SELECT *" +
      "FROM users INNER JOIN covid" +
      "ON users.national_id = covid.user_national_id" +
      "WHERE users.national_id=?",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

User.findAll = function (result) {
  connection.query(
    "SELECT national_id, first_name, last_name " + "FROM users",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(`user :`, res);
        result(null, res);
      }
    }
  );
};

User.findAllUsersCovid = function (result) {
  connection.query(
    "SELECT *" +
      "FROM users INNER JOIN covid" +
      "ON users.national_id = covid.user_national_id",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(`user :`, res);
        result(null, res);
      }
    }
  );
};

User.update = function (id, user, covid, result) {
  connection.query(
    "UPDATE user" +
      "INNER JOIN covid ON user.national_id=covid.user_national_id" +
      "SET user.first_name=?,user.last_name=?,user.city=?" +
      "user.street=?,user.building_number=?,user.date_of_birth=?" +
      "user.phone_number=?,user.cell_phone_number=?,covid.first_covid_date=?" +
      "covid.first_covid_manufactur=?,covid.second_covid_date=?" +
      "covid.second_covid_manufactur=? ,covid.third_covid_date=?" +
      "covid.third_covid_manufactur=?,covid.fourth_covid_date=?" +
      "covid.fourth_covid_manufactur=?,covid.positive_date=?,covid.recover_date=?",
    [
      user.first_name,
      user.last_name,
      user.city,
      user.street,
      user.uilding_number,
      user.date_of_birth,
      user.phone_number,
      user.cell_phone_number,
      covid.first_covid_date,
      covid.first_covid_manufactur,
      covid.second_covid_date,
      covid.second_covid_manufactur,
      covid.third_covid_date,
      covid.third_covid_manufactur,
      covid.fourth_covid_date,
      covid.fourth_covid_manufactur,
      covid.positive_date,
      covid.recover_date,
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

User.delete = function (id, result) {
  connection.query(
    "DELETE users, covid FROM users" +
      "INNER JOIN covid ON users.national_id=covid.user_national_id WHERE users.national_id=?",
    [id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = User;
