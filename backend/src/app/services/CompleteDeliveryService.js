import Delivery from '../models/Delivery';
import File from '../models/File';

import AppError from '../errors/AppError';

class CompleteDeliveryService {
  async run({ id, path, name, end_date }) {
    if (!id) throw new AppError('Delivery ID not provided');

    const delivery = await Delivery.findOne({
      where: { id, canceled_at: null, end_date: null },
    });

    if (!delivery) throw new AppError('Delivery not found');

    if (!path) throw new AppError('A signature is required');

    if (!path || !name) throw new AppError('Image mal formatted');

    const file = await File.create({
      name,
      path,
    });

    delivery.end_date = end_date;
    delivery.signature_id = file.id;

    await delivery.save();

    const { product, recipient_id, start_date } = delivery;

    if (!recipient_id)
      throw new AppError('You cannot delivery with a recipient address');

    return { id, product, recipient_id, start_date, end_date, file };
  }
}

export default new CompleteDeliveryService();
