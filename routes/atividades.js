const atividades = require('../models/atividades')
const usuarios = require('../models/usuarios')

module.exports = (app)=>{
    //criar a rota para renderizar a view atividades
    app.get('/atividades', async(req,res)=>{
    //capturar o id da barra de endereço
    var id = req.query.id
    //buscar o nome na collection usuarios
    var user = await usuarios.findOne({_id:id})
    //buscar todas as atividades desse usuário 
    var abertas = await atividades.find({usuario:id, status:0}).sort({data:1}) 
    var entregues = await atividades.find({usuario:id, status:1}).sort({data:1})
    var excluidas = await atividades.find({usuario:id, status:2}).sort({data:1}) //esse find q gera os dados
    //console.log(buscar)
    //res.render('atividades.ejs',{nome:user.nome,id:user._id,dados:abertas, dadosx:excluidas, dadose:entregues}) 
    //abrir a view accordion
    //res.render('accordion.ejs',{nome:user.nome,id:user._id,dados:abertas, dadosx:excluidas, dadose:entregues})
    //abrir a view atividades2
    res.render('atividades2.ejs',{nome:user.nome,id:user._id,dados:abertas, dadosx:excluidas, dadose:entregues})
    
    })

    //gravar as informações
    app.post('/atividades', async(req,res)=>{
        //recuperando as informações digitadas
        var dados = req.body
        //exibindo no terminal 
        console.log(dados)
        const conexao = require('../config/database')()
        //model atividades
        const atividades = require('../models/atividades')
        //salvar as informações do formulário no database
        var salvar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            entrega:dados.entrega,
            instrucoes:dados.orientacao,
            disciplina:dados.disciplina,
            usuario:dados.id
        }).save()
       
        //redirecionar para a rota atividades
        res.redirect('/atividades?id='+dados.id)
    })

    //excluir atividades
    app.get("/excluir", async(req,res)=>{
        //recuperar o parâmetro id da barra de endereço
        var id = req.query.id
        var excluir = await atividades.findOneAndUpdate(//pd ser findOneAndDelete tbm, faz same coisa
            {_id:id}, 
            {status:2})
        //redirecionar para  a rota atividades
        res.redirect('/atividades?id='+excluir.usuario)
    })

    //entrega atividades
    app.get("/entregue", async(req,res)=>{
        //recuperar o parâmetro id da barra de endereço
        var id = req.query.id
        var entregue = await atividades.findOneAndUpdate(//pd ser findOneAndDelete tbm, faz same coisa
            {_id:id}, 
            {status:1})
        //redirecionar para  a rota atividades
        res.redirect('/atividades?id='+entregue.usuario)
    })
    
      //desfazer ações
      app.get("/desfazer", async(req,res)=>{
        //recuperar o parâmetro id da barra de endereço
        var id = req.query.id
        var desfazer = await atividades.findOneAndUpdate(//pd ser findOneAndDelete tbm, faz same coisa
            {_id:id}, 
            {status:0})
        //redirecionar para  a rota atividades
        res.redirect('/atividades?id='+desfazer.usuario)
    })


    //criar a rota para renderizar a view alterar (primeira rota-get onde vai buscar a atividade q quer alterar e exibir)
    app.get('/alterar', async(req,res)=>{
        //capturar o id da barra de endereço
        var id = req.query.id
        //buscar a atividade q será alterada 
        var alterar = await atividades.findOne({_id:id})
        //buscar o nome na collection usuarios
        var user = await usuarios.findOne({_id:alterar.usuario}) //pq n vai dar certo id:id? pq rlr n vai encontrar o usuario q nao corresponde (ta em atividades), vai conseguir saber o id do usuario colocando 'alterar.usuario'
        //abrir a view atividades2
        res.render('alterar.ejs',{nome:user.nome,id:user._id,dados:alterar})
        
        })
    
    //criar a rota para gravar as alterações na atividade
    app.post('/alterar', async(req,res)=>{
        //qual atividade será atualizada?
        var id_a = req.query.id //recuperar algo da barra de endereço - request query
        //quais são as informações digitadas?
        var infos = req.body
        console.log(infos)
        //gravar as alterações na collection atividades
        var gravar = await atividades.findOneAndUpdate (
            {_id:infos.id_a},
            {   data:infos.data,
                tipo:infos.tipo,
                disciplina:infos.disciplina,
                entrega:infos.entrega,
                instrucoes:infos.orientacao
            }
        )
        res.redirect('/atividades?id='+infos.id)
        
    })

}

