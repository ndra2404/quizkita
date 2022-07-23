const config = require("../../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

function getData(id, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err, null);
    } else {
      connection.query(
        `SELECT * FROM question_answer WHERE question_id = ${id}`,
        (err, rows) => {
          connection.release();
          if (err) {
            callback(err, null);
          } else {
            callback(null, rows);
          }
        }
      );
    }
  });
}
module.exports = {
  getAllQuestions(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query("SELECT * FROM question", function (error, results) {
        if (error) throw error;

        let dataresponse = [];
        results.forEach((element) => {
          dataresponse.push({
            id: element.question_id,
            question: element.question,
            is_image: element.is_images,
            question_image: element.question_image,
            question_data: getData(element.question_id, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    return data;
                }
                }
            ),
          });
        });

        res.send({
          success: true,
          message: "Berhasil ambil data!",
          data: dataresponse,
        });
      });
      connection.release();
    });
  },
};
