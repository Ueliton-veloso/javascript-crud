const db = require('./db')

const Pagamento = db.sequelize.define('TableName', {
    nome: {
        type: db.Sequelize.STRING
    },

    valor: {
        type: db.Sequelize.DOUBLE
    },
});

//Pagamento.sync({force: true});

module.exports= Pagamento
