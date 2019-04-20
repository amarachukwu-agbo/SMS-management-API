import models from '../../models';
import { Op } from 'sequelize';

class Message {
  static async createMessage(req, res) {
    const { content, recipientId, senderId } = req.body;
    try {
      const existingMessage = await models.Message.findOne({
        where: {
          content,
          recipientId,
          senderId
        }
      });
      if (existingMessage) {
        return res.status(409).json({
          message: 'Error creating message',
          error: 'Message has already been created',
        });
      }
      const createdMessage = await models.Message.create(req.body);
      return res.status(201).json({
        message: 'Message created successfully',
        createdMessage
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating message',
        error
      });
    }
  }

  static async getMessages(req, res) {
    const { userId } = req.params;
    try {
      const messages = await models.Message.findAll({
        where: {
          [Op.or]: [{ recipientId: userId }, { senderId: userId }]
        },
        include: [
          { model: models.User, as: 'recipient'},
          { model: models.User, as: 'sender'}
        ]
      });
      return res.status(200).json({
        message: 'Messages retrieved successfully',
        messages
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error retrieving message',
        error
      });
    }

  }

  static async getMessage(req, res) {
    const { messageId, userId } = req.params;
    try {
      const sms = await models.Message.findOne({
        where: {
          [Op.or]: [{ senderId: userId }, { recipientId: userId }],
          id: messageId
        },
        include: [
          { model: models.User, as: 'recipient'},
          { model: models.User, as: 'sender'}
        ]
      });
      if (!sms) {
        return res.status(404).json({
          message: 'Error retrieving message',
          error: 'Message does not exist'
        });
      }
      return res.status(200).json({
        message: 'Messages retrieved successfully',
        sms
      });
    } catch(error) {
      return res.status(500).json({
        message: 'Error retrieving message',
        error
      });
    }
  }
}

export default Message;
