module.exports = (app)=>{
    //abrir a view login 
    app.get('/login', (req,res)=>{
        res.render('login.ejs')
    })

    //abrir a view atividades 
    app.post ('/login', async(req,res)=>{
        //conectar com o banco de dados 
        const conexao = require('../config/database')()
        //importar a model usuarios 
        const usuarios = require('../models/usuarios')
        //procurar pelo endereço de email
        var procurar = await usuarios.findOne({email:req.body.email})
        if(!procurar){
            return res.send('Email não cadastrado!!')
        }
        //comparar a senha digitada com a armazenada 
        const bcrypt = require('bcryptjs')
        var comparar = await bcrypt.compare(req.body.senha,procurar.senha)
        if(!comparar){
            return res.send("Senha incorreta")
        }
        //buscar os documentos na coleção atividades desse usuário
        const atividades = require('../models/atividades')
        var buscar = await atividades.find({usuario:procurar._id}) //esse procurar ta acessando a collection usuarios, qnd vem da collection tem _
        //abrir a view atividades e enviar nome e id
        res.render('atividades.ejs', {nome:procurar.nome,id:procurar._id,dados:buscar})
    })
}

//req.body é uma informação que vem pelo corpo do formularip
//req.query é pela barra de endereço
//no var procurar faz um find dentro da tabela usuarios, por isso consegue ter acesso ao banco de dados e ao endereço correspondente
//quando um campo vem de uma collection precisa do _