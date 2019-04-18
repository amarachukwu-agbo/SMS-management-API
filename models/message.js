'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    read: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    });
    Message.belongsTo(models.User, {
      as: 'recipient',
      foreignKey: 'recipientId',
      onDelete: 'CASCADE'
    });
  };
  return Message;
};