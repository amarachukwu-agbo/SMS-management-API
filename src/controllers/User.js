import models from '../../models';
import { Op } from 'sequelize';

class User {
  static async createUser(req, res) {
    const { name, phoneNumber } = req.body;
    try {
      const existingUser = await models.User.findOne({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: name } },
            { phoneNumber: { [Op.iLike]: phoneNumber } }
          ]
        }
      });
      if (existingUser) {
        return res.status(409).json({
          message: 'Error creating user',
          error: 'User with this name or phone number already exists',
        });
      }
      const user = await models.User.create(req.body);
      return res.status(201).json({
        message: 'User created successfully',
        user
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating user',
        error
      });
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await models.User.findAll();
      return res.status(200).json({
        message: 'Users retrieved successfully',
        users
      });
    } catch(error) {
      return res.status(500).json({
        message: 'Error retrieving users',
        error
      });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await models.User.findByPk(req.params.userId);
      if (!user) {
        return res.status(404).json({
          message: 'Error retrieving user',
          error: 'User does not esist'
        });
      }
      return res.status(200).json({
        message: 'User retrieved successfully',
        user
      });
    } catch(error) {
      return res.status(500).json({
        message: 'Error retrieving user',
        error
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await models.User.findByPk(req.params.userId);
      if (!user) {
        return res.status(404).json({
          message: 'Error retrieving user',
          error: 'User does not esist'
        });
      }
      await user.destroy();
      return res.status(200).json({
        message: 'User has been deleted successfully'
      });
    } catch(error) {
      return res.status(500).json({
        message: 'Error deleting user',
        error
      });
    }
  }
}

export default User;
