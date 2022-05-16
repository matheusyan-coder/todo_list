module.exports = (app)=>{
    //abrir a view registro.ejs
    app.get('/registro', (req,res)=>{
        res.render('registro.ejs')
    })
}