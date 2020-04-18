import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import WithdrawDeliveryService from '../services/WithdrawDeliveryService';

class WithdrawDeliveryController {
  async index(req, res) {
    const { page = 1, limit = 20, finished } = req.query;
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: 'Deliveryman is invalid' });

    const deliveyman = await Deliveryman.findByPk(id);

    if (!deliveyman)
      return res.status(400).json({ error: 'Deliveryman not found' });

    const where = { canceled_at: null, deliveryman_id: id };

    where.end_date = finished && finished === 'true' ? { [Op.ne]: null } : null;

    const deliveries = await Delivery.findAll({
      where,
      attributes: [
        'id',
        'product',
        'createdAt',
        'start_date',
        'end_date',
        'status',
        'deliveryman_id',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'state',
            'city',
            'zipcode',
          ],
        },
      ],
      limit,
      offset: (page - 1) * limit,
      order: [
        finished && finished === 'true'
          ? ['end_date', 'DESC']
          : ['createdAt', 'ASC'],
      ],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Invalid Params' });

    let { start_date } = req.body || new Date();
    const { id, deliverymanId } = req.params;

    if (!id) return res.status(400).json({ error: 'Delivery ID invalid' });

    start_date = parseISO(start_date);

    const { product, recipient_id } = await WithdrawDeliveryService.run({
      start_date,
      id,
      deliverymanId,
    });

    return res.json({ id, product, start_date, recipient_id });
  }
}

export default new WithdrawDeliveryController();
