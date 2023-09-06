const connection = require('../connection');


const saveUser = async ( data ) => {
  const db = await connection();
  try {
    db.collection('Login').insertOne(data);
      return { success: true, message: 'Usuário salvo com sucesso' };
  } catch (err) {
    console.log(err);
    return { success: false, message: 'Erro ao salvar Usuário' };
  } finally {
    if (db) {
      db.close();
    }
  }
};

const getUsers = async () => {
  const db = await connection();
  return await db.collection('Login').find().toArray();
};

const getBalance = async (user) => {
  const db = await connection();
  const data = await db.collection('Login').findOne({ user: user });
  if (data) {
    return data.balance;
  } else {
    return "Erro";  
  }
}

const updateBalance = async (user, newBalance) => {
  const db = await connection();
  console.log(user, "USER");
  console.log(newBalance, 'NEW');
  const newValue = newBalance.balance;
    try {
      const result = await db.collection('Login').updateOne({ user: user.user }, { $set: { balance: newValue } })
        return result;
    } catch (err) {
        console.error(err);
    }
    
    if (db) {
      db.close();
    }
};

module.exports = {
  saveUser,
  getUsers,
  getBalance,
  updateBalance,
};