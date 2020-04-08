import Problem from '../models/Problem';
import Delivery from '../models/Delivery';

class ProblemController {
  async index(req, res) {
    const { page = 1, limit = 20, allActive } = req.query;

    const where = {};

    if (allActive && allActive === 'true') {
      where.canceled_at = null;
      where.end_date = null;
    }

    const problems = await Problem.findAll({
      include: [
        {
          model: Delivery,
          as: 'delivery',
          where,
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(problems);
  }
}

export default new ProblemController();
