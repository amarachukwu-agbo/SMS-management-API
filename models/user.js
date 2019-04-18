'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Message, {
      as: 'sender',
      foreignKey: 'senderId'
    });
    User.hasMany(models.Message, {
      as: 'recipient',
      foreignKey: 'recipientId'
    });
  };
  return User;
};
