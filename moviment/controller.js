const Moviment = require('./model.js');

exports.saveMoviment = async (req, res) => {
  try {
    const newMoviment = await Moviment.saveMoviment(req.body);
    res.status(201).json(newMoviment);
  } catch (err) {
    return { success: false, message: 'Erro ao salvar produto' };
  }
};


exports.getMoviment = async (req, res) => {
  try {
    const moviment = await Moviment.getMoviment();
    return res.json(moviment);
  } catch (err) {
    // res.status(500).json({ message: err.message });
  }
};
