const sequelize = require("../config/database");
const Sequelize = require("sequelize");

const tableName = "m_ewon_subscriber_setting";

const MEwonSubscriberSetting = sequelize.define(
  "m_ewon_subscriber_setting",
  {
    intEwonSubsSettingID: {
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    txtTopic: Sequelize.STRING,
    txtTypeTopic: Sequelize.STRING,
    txtStatus: Sequelize.BOOLEAN,
  },
  { tableName }
);

module.exports = MEwonSubscriberSetting;
