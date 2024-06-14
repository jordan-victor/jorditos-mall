const express = require('express')
const produtoController = express.Router()

const connection = require('../database/database')
const { raw } = require('body-parser')
const Produto = connection.Produto





produtoController.get('/cadastro-produto', (req, res)=>{
    Produto.findAll({raw:true}).then(produtos=>{
        res.render('./produtos/cadastroProduto',{
            produtos:produtos
        })
    })  
})


//CADASTRO NO BANCO
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


//LISTAR PRODUTOS NA TELA

module.exports = produtoController