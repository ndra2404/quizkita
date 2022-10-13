const config = require("../../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

function saveData(req, res) {
  let name = req.body.name;
  let score = req.body.score;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "insert into user(name,score) value ('" + name + "','" + score + "')"
    );
  });
  res.send({
    success: true,
    message: "Berhasil simpan data",
    data: req.body,
  });
}
function getAllData(req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query("SELECT * FROM user", function (error, results) {
      if (error) throw error;

      let dataresponse = [];
      results.forEach((element) => {
        dataresponse.push({
          id: element.id,
          name: element.name,
          score: element.score,
        });
      });

      res.send({
        success: true,
        message: "Berhasil ambil data dong",
        data: dataresponse,
      });
    });
    connection.release();
  });
}
module.exports = {
  saveData,
  getAllData
};
