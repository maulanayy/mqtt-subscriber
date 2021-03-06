const sequelize = require("../config/database");
const Sequelize = require("sequelize");

const tableName = "m_ewon_subscriber";

const MEwonSubscriber = sequelize.define(
  "m_ewon_subscriber",
  {
    intEwonSubsID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    intEwonSubsSettingID: Sequelize.INTEGER,
    intValue: Sequelize.FLOAT,
  },
  { tableName, timestamps: false }
);

module.exports = MEwonSubscriber;
