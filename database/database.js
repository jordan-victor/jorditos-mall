const Sequelize = require('sequelize')
const connection = new Sequelize('node_estudo', 'root', 'jordan18', {
    host:'localhost',
    dialect:'mysql'
})

//TABELA USUÁRIOS
const User = connection.define('usuarios',{
    usuario:{type:Sequelize.STRING,allowNull:false},
    senha:{type:Sequelize.STRING,allowNull:false},
    email:{type:Sequelize.STRING, allowNull:false}
})
User.sync({force:false})

//TABELA CLIENTES
const Cliente = connection.define('clientes',{
    nome:{type:Sequelize.STRING, allowNull:false},
    cpf:{type:Sequelize.STRING, allowNull:false},
    email:{type:Sequelize.STRING, allowNull:false},
    localizacao:{type:Sequelize.STRING, allowNull:false},
    sexo:{type:Sequelize.STRING, allowNull:false},
    ncompra:{type:Sequelize.INTEGER, allowNull:false}
})
Cliente.sync({force:false})

//TABELA PRODUTOS
const Produto = connection.define('produtos',{
    nomeProd:{type:Sequelize.STRING, allowNull:false},
    preco:{type:Sequelize.FLOAT, allowNull:false},
    fornecedor:{type:Sequelize.STRING, allowNull:false},
    quantidade:{type:Sequelize.INTEGER, allowNull:false},
    categoria:{type:Sequelize.STRING, allowNull:false},
    descricao:{type:Sequelize.TEXT, allowNull:false}
})
Produto.sync({force:false})

module.exports = {User, connection, Cliente, Produto}