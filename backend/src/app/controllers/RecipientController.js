import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

import Cache from '../../lib/Cache';

class RecipientController {
  async index(req, res) {
    const { page = 1, limit = 20, q, all, order } = req.query;

    const where = q ? { name: { [Op.iLike]: `%${q}%` } } : {};

    const vLimit = all ? null : limit;
    const offset = all ? null : (page - 1) * limit;

    const sort = order ? order.split(' ') : ['id'];

    const recipients = await Recipient.findAll({
      where,
      limit: vLimit,
      offset,
      order: sort,
    });

    return res.json(recipients);
  }

  async store(req, res) {
    const { name, street, address1, number, state, city, zipcode } = req.body;

    const recipient = await Recipient.create({
      name,
      street,
      address1,
      number,
      state,
      city,
      zipcode,
    });

    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient)
      return res.status(400).json({ error: 'Recipient not found' });

    await recipient.update(req.body);

    const cachedKey = `recipient:${id}`;
    await Cache.invalidate(cachedKey);

    return res.json(recipient);
  }

  async show(req, res) {
    const { id } = req.params;

    const cachedKey = `recipient:${id}`;
    const cached = await Cache.get(cachedKey);
    if (cached) return res.json(cached);

    const recipient = await Recipient.findByPk(id);

    if (!recipient)
      return res.status(400).json({ error: 'Recipient not found' });

    Cache.set(cachedKey, recipient);

    return res.json(recipient);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Recipient.destroy({ where: { id } });

    const cachedKey = `recipient:${id}`;
    await Cache.invalidate(cachedKey);

    return res.json();
  }
}

export default new RecipientController();
