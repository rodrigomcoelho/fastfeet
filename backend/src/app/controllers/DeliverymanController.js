import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import DeleteAvatarService from '../services/DeleteAvatarService';

import Cache from '../../lib/Cache';

class DeliverymanController {
  async index(req, res) {
    const { page = 1, limit = 10, q, all, order } = req.query;

    const where = q ? { name: { [Op.iLike]: `%${q}%` } } : {};

    const vLimit = all ? null : limit;
    const offset = all ? null : (page - 1) * limit;

    const sort = order ? order.split(' ') : ['id'];

    const deliverymen = await Deliveryman.findAll({
      where,
      limit: vLimit,
      offset,
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
      order: sort,
    });

    return res.json(deliverymen);
  }

  async store(req, res) {
    const { name, email, avatar_id } = req.body;

    const existUser = await Deliveryman.findOne({ where: { email } });

    if (existUser)
      return res.status(401).json({ error: 'User already exists' });

    const deliveryman = await Deliveryman.create({ name, email, avatar_id });

    return res.json(deliveryman);
  }

  async show(req, res) {
    const { id } = req.params;

    const cachedKey = `deliveryman:${id}`;
    const cached = await Cache.get(cachedKey);
    if (cached) return res.json(cached);

    if (!id) return res.status(400).json({ error: 'ID param invald' });

    const deliveryman = await Deliveryman.findByPk(id, {
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    Cache.set(cachedKey, deliveryman);

    return res.json(deliveryman);
  }

  async update(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: 'ID param invald' });

    const { name, email, avatar_id } = req.body;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman)
      return res.status(400).json({ error: 'Deliveryman not found' });

    if (avatar_id && avatar_id !== deliveryman.avatar_id)
      await DeleteAvatarService.run({ avatarId: deliveryman.avatar_id });

    const existDeliveryman = await Deliveryman.findOne({ where: { email } });

    if (existDeliveryman && existDeliveryman.email !== deliveryman.email)
      return res.status(400).json({ error: 'User already exist' });

    await deliveryman.update({ name, email, avatar_id });

    const cachedKey = `deliveryman:${id}`;
    await Cache.invalidate(cachedKey);

    return res.json(deliveryman);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (deliveryman) {
      await DeleteAvatarService.run({ avatarId: deliveryman.avatar_id });

      await Deliveryman.destroy({ where: { id } });
    }

    const cachedKey = `deliveryman:${id}`;
    await Cache.invalidate(cachedKey);

    return res.json();
  }
}

export default new DeliverymanController();
