var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });


  //update
   // PUT route for updating posts
   /*
   name: DataTypes.STRING,
    description: DataTypes.TEXT,
    email: DataTypes.STRING,
    amount: DataTypes.STRING,
    number:
   */
   app.put("/api/examples/:id", function(req, res) {
     console.log("PUT ENDPOINT HIT", req.body);
    db.Example.update({
        name: req.body.name,
          description: req.body.description,
          email: req.body.email,
          amount: req.body.amount,
          number: req.body.number

      },{


        where: {
          id: req.body.id
          

        }
      })
      .then(function(dbExample) {
        res.json(dbExample);
      });
  });
};
