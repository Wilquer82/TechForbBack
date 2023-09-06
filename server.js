const connection = require('./connection');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
connection();

const { saveUser, loginUser, getUsers, getBalance, pathBalance } = require("./users/controller");
const { saveMoviment, getMoviment  } = require("./moviment/controller");

const options = {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin:'*', 
    credentials: true,  
    optionSuccessStatus: 200,
}
  
app.use(cors(options));

app.use(express.json());

//--------------------------------Usuários--------------------------------

app.post('/user', saveUser);
app.use('/user', saveUser);

app.get('/', getUsers);
app.use('/users', getUsers);

app.post('/login', loginUser);
app.use('/login', loginUser);

app.get('/balance/:user', getBalance);
app.use('/balance', getBalance);

app.path('/altbalance/:user', pathBalance);
app.use('/altbalance', pathBalance);

//-------------------------------MOVIMENTO----------------------------------

app.post('/moviment', saveMoviment);
app.use('/moviment', saveMoviment);

app.get('/getmov', getMoviment);
app.use('/getmov', getMoviment);

app.listen(port, async () => {
  console.log(`Servidor Rodando em ${port}`);
});