const MEwonSubscriberSetting = require("../models/M_Ewon_Subscriber_Setting");
const MEwonSubscriber = require("../models/M_Ewon_Subscriber");

const errorDB = (err) => console.info("error on database:", err);

const MEwon = () => {
  const getAll = async () => {
    try {
      const data = await MEwonSubscriberSetting.findAll({
        attributes: [
          "txtTopic",
        ],
        raw: true,
      });

      return data;
    } catch (err) {
      errorDB(err);
    }
  };

  const insertEwon = async (data) => {
    try {
      await MEwonSubscriber.create(
        {
          intEwonSubsSettingID: data.ewon_id,
          intValue: data.value,
        },
        { fields: ["intEwonSubsSettingID", "intValue"] }
      );
    } catch (err) {
      errorDB(err);
    }
  };
  return {
    getAll,
    insertEwon,
  };
};

module.exports = MEwon;
