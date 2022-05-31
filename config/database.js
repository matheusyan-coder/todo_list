//importar o mongoose
const mongoose = require('mongoose')
//scritps de conexao 
const conn = async()=>{
    const atlas = await mongoose.connect('mongodb+srv://userLR:matheus2006@fiaptecnico.p5s1m.mongodb.net/test')
}

//exportar as informações para acesso externo 
module.exports = conn