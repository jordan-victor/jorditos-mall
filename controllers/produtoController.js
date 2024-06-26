const express = require('express')
const produtoController = express.Router()

const connection = require('../database/database')
const { raw } = require('body-parser')
const { where } = require('sequelize')
const Produto = connection.Produto

//IMPORTANDO MIDDLEWARE DE AUTENTICAÇÃO DO USUÁRIO
//const userAuth = require('../middlewares/userAuth')
const userController = require('./userController')
produtoController.use('/', userController)
//const userAuth = require('./userController')
//const user = userAuth.userAuth





//LISTANDO OS PRODUTOS
produtoController.get('/cadastro-produto', (req, res)=>{
    Produto.findAll({raw:true, order:[['id', 'DESC']]}).then(produtos=>{
        if(req.session.user != undefined){
            res.render('./produtos/cadastroProduto',{
                produtos:produtos
            })   
        }
        else{
            req.session.message = "Necessário fazer login para acessar módulos de administrador"
            res.render('./index', {message: req.session.message})
        }
    })  
})


//CADASTRO DE PRODUTOS
produtoController.post('/cadastrarProd', (req, res)=>{
    let nomeProd = req.body.nomeProd
    let preco = req.body.preco
    let fornecedor = req.body.fornecedor
    let quantidade = req.body.quantidade
    let categoria = req.body.categoria
    let descricao = req.body.descricao

    Produto.create({
        nomeProd: nomeProd,
        preco: preco,
        fornecedor: fornecedor, 
        quantidade: quantidade, 
        categoria: categoria,
        descricao: descricao
    }).then(()=>{
        res.redirect('/cadastro-produto')
    })
})


//DELETANDO PRODUTOS CADASTRADOS
produtoController.post('/deletarProd/:id?', (req, res)=>{
    /*let id = req.params.id*/
    let id = req.body.id
    Produto.destroy({where:{id:id}}).then(()=>{
        res.redirect('/cadastro-produto')
    })
})


//FILTRANDO PRODUTOS LISTADOS
produtoController.post('/filtroProd',(req, res)=>{
    let categoria = req.body.categoria
    let pesquisado = req.body.pesquisado

    if(categoria == "todos"){
        Produto.findAll({raw:true}).then(produtos=>{
            res.render('./produtos/cadastroProduto',{
                produtos:produtos
            })
        })
    }
    else{
        Produto.findAll({raw:true, where:{categoria:categoria}}).then(categoria=>{
            res.render('./produtos/cadastroProduto',{
                produtos:categoria,
            })
        })
    }    
})


//PESQUISANDO PRODUTOS
produtoController.post('/pesquisarProd',(req, res)=>{
    let pesquisado = req.body.pesquisado
    
    if(pesquisado != undefined){
        Produto.findAll({raw:true, where:{id:pesquisado}}).then(produto=>{
            res.render('./produtos/cadastroProduto',{
                produtos:produto
            })
        })
    }
    else{
        res.redirect('/cadastro-produto')
    }
})


//EXIBINDO VIEW DE EDIÇÃO DE PRODUTO E EDIÇÃO DO PRODUTO
produtoController.get('/edicao-produto/:id?', (req, res)=>{
    let id = req.params.id 
    
    if(id != undefined){
        Produto.findByPk(id).then(produto=>{
            res.render('./produtos/edicaoProduto',{produto:produto})
        })
    }else{
        res.redirect('/cadastro-produto')
    } 
})


produtoController.post('/atualizarProd',(req, res)=>{
    let id = req.body.id
    let nome = req.body.nomeProd
    let preco = req.body.preco
    let fornecedor = req.body.fornecedor
    let categoria = req.body.categoria
    let quantidade = req.body.quantidade
    let descricao = req.body.descricao

    Produto.update({
        nomeProd:nome,
        preco:preco,
        fornecedor:fornecedor,
        categoria:categoria,
        descricao:descricao
        },
        {where:{id:id}
    })
    .then(async()=>{
        Produto.findByPk(id).then(produto=>{
            res.render('./produtos/edicaoProduto',{produto:produto})
        })
           
    })
})

module.exports = produtoController