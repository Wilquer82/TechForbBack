const User = require('./model.js');
const connection = require('../connection');
const bcrypt = require('bcrypt');



exports.saveUser = async (req, res) => {
  try {
    const newUser = await User.saveUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    return { success: false, message: 'Erro ao salvar Usuário!' };
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getUsers();
    return res.json({ users });
  } catch (err) {
    throw(err)
  }
}

exports.loginUser = async (req, res) => {
  const db = await connection();
  const doc_num = req.body.doc_num;
  const password = req.body.pass;

  
  const doc = await db.collection('Login').findOne({doc_num: doc_num });

  if (!doc) {
    return res.json(1);
  }
  
  const match = await bcrypt.compare(password, doc.pass);

  if (!match){
    return res.json(2);
  }

  const user = doc.user;

  res.json( user );
};

exports.getBalance = async (req, res) => {
  const user = req.params.user;
  console.log(req.params.user)
  try {
    const balance = await User.getBalance(user);
    console.log(balance)
    return res.json({ balance });
  } catch (err) {
    throw(err)
  }
}

exports.pathBalance = async (req, res) => {
  const user = req.body.user;
  const value = req.body.newBalance;
  try {
    const balance = await User.getBalance(user);
    console.log(balance, 'antigo CONTROLLER');
    const newBalance = (balance) + (value);
    console.log(newBalance, 'novo CONTROLLER');
    await User.updateBalance({ user:  user }, { balance:  newBalance });
    res.status(200).json({ message: 'Saldo atualizado com sucesso!' });
  } catch (error) {
    // Enviar resposta de erro
    console.log(error);
    res.status(500).json({ message: 'Ocorreu um erro ao atualizar o saldo.' });
  }
}