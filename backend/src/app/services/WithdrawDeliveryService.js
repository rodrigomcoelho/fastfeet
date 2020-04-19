import { Op } from 'sequelize';
import {
  isBefore,
  isAfter,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  startOfDay,
  endOfDay,
} from 'date-fns';

import Delivery from '../models/Delivery';

import AppError from '../errors/AppError';

class WithdrawDeliveryService {
  async run({ start_date, id, deliverymanId }) {
    const minRange = setMilliseconds(
      setSeconds(setMinutes(setHours(start_date, 8), 0), 0),
      0
    );

    const maxRange = setMilliseconds(
      setSeconds(setMinutes(setHours(start_date, 18), 0), 0),
      0
    );

    if (isBefore(start_date, minRange) || isAfter(start_date, maxRange))
      throw new AppError('Withdraw is only allowed between 8h and 18h');

    const delivery = await Delivery.findOne({
      where: { id, canceled_at: null },
    });

    if (!delivery) throw new AppError('Delivery not found');

    if (!deliverymanId || delivery.deliveryman_id !== Number(deliverymanId))
      throw new AppError('Delivery assigned to another deliveryman');

    const maxDeliveries = await Delivery.findAll({
      where: {
        deliveryman_id: deliverymanId,
        start_date: {
          [Op.between]: [startOfDay(start_date), endOfDay(start_date)],
        },
      },
    });

    if (maxDeliveries.length >= 5)
      throw new AppError('You may only withdraw 5 deliveries per day');

    const { product, recipient_id } = delivery;

    if (delivery.start_date)
      throw new AppError('You have already started the delivery');

    if (!recipient_id)
      throw new AppError('You cannot delivery with a recipient address');

    delivery.start_date = start_date;

    await delivery.save();

    return { product, recipient_id };
  }
}

export default new WithdrawDeliveryService();
