const express = require('express')
const app = express()
const bodyParser = require('body-parser')



app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({'extended': false}))
app.use(express.static('public'))

const connection = require('./database/database')
const { where } = require('sequelize')
connection.connection.authenticate()
.then(()=>{
    console.log("Conexão realizada")
})
.catch((erro)=>{
    console.log(erro)
})
const Cliente = connection.Cliente




//Rotas importadas de uma outra pasta
const produtoController = require('./controllers/produtoController')
app.use('/', produtoController)





app.get('/',(req, res)=>{
    res.render('index')
})





app.get('/cadastro', (req, res)=>{
    res.render('cadastro')
})
app.post('/cadastrar', (req, res)=>{
    let nome = req.body.nome
    let cpf = req.body.cpf
    let email = req.body.email
    let localizacao = req.body.localizacao
    let sexo = req.body.sexo
    let ncompra = req.body.ncompra

    Cliente.create({
        nome:nome,
        cpf:cpf,
        email:email,
        localizacao:localizacao,
        sexo:sexo,
        ncompra:ncompra
    })
    .then(()=>{
        res.redirect('/clientes')
    })
})


app.get('/clientes/:id?', (req, res)=>{
    let filtro = req.params.id
     if(filtro == "m"){
        Cliente.findAll({raw:true, where:{sexo:"M"}, order:[['id','DESC']]}).then(filtro=>{
            res.render('clientes',{clientes:filtro})
        })
     }
     else if(filtro == 'f'){
        Cliente.findAll({raw:true, where:{sexo:"F"}, order:[['id','DESC']]}).then(filtro=>{
            res.render('clientes',{clientes:filtro})
        })
     }
     else if(filtro == "todos"){
        Cliente.findAll({raw:true, order:[['id','DESC']]}).then(todos=>{
            res.render('clientes', {clientes:todos})
        })
     }

    Cliente.findAll({raw:true, order:[['id','DESC']]}) //,where:{nome:'Jordão'}
    .then(clientes=>{
        res.render('clientes',{
            clientes:clientes
        })
    })
})


app.post('/pesquisar', (req, res)=>{
    let id = req.body.id

    Cliente.findOne({
        where:{id:id}
    }).then(cliente=>{
        res.render('cliente',{
            cliente:cliente
        })
    })
})

app.post('/search',(req, res)=>{
    let cliente = req.body.cliente

    Cliente.findOne({where:{id:cliente}}).then(cliente=>{
        res.render('cliente',{
            cliente:cliente
        })
    })
})


app.listen(8080)