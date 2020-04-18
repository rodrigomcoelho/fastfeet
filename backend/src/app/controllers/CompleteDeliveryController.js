import * as Yup from 'yup';
import CompleteDeliveryService from '../services/CompleteDeliveryService';

class CompleteDeliveryController {
  async update(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Invalid params ' });

    const { end_date = new Date() } = req.body;

    const { id } = req.params;

    const { filename: path, originalname: name } = req.file;

    const {
      product,
      recipient_id,
      start_date,
      file,
    } = await CompleteDeliveryService.run({
      id,
      path,
      name,
      end_date,
    });

    return res.json({ id, product, recipient_id, start_date, end_date, file });
  }
}

export default new CompleteDeliveryController();
