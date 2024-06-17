const express = require('express')
const produtoController = express.Router()

const connection = require('../database/database')
const { raw } = require('body-parser')
const { where } = require('sequelize')
const Produto = connection.Produto




//LISTANDO OS PRODUTOS
produtoController.get('/cadastro-produto', (req, res)=>{
    Produto.findAll({raw:true, order:[['id', 'DESC']]}).then(produtos=>{
        res.render('./produtos/cadastroProduto',{
            produtos:produtos
        })
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
produtoController.get('/deletarProd/:id?', (req, res)=>{
    let id = req.params.id
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


module.exports = produtoController