module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    email: DataTypes.STRING,
    amount: DataTypes.STRING,
    number: DataTypes.STRING
  });
  return Example;
};
