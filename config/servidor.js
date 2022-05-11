//importar o express
const express = require('express')
//executar o express
const app = express()
//definir a forma do servidor local
const porta = 3535

/*&conteúdo aleatório
app.get('/',(req,res)=>{
    res.send("qualquer coisa")
})

//ligar o servidor sem deifinir a porta
app.listen(porta)*/

//exportar o app e a porta
module.exports = {app,porta}