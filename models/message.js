'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    read: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'senderId',
    });
    Message.belongsTo(models.User, {
      as: 'recipient',
      foreignKey: 'recipientId',
    });
  };
  return Message;
};
