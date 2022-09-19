const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const moment = require('moment')
const Pagamento = require('./models/Payment');



//config
const jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(jsonParser)

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    },
    runtimeOptions: { 
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
}))

app.set('view engine', 'handlebars')


//List all Payments

app.get('/payment-list', (req, res) =>{
    Pagamento.findAll({order: [['id', 'DESC']] }).then((pagamentos) => {
        res.render('payment-list', {pagamentos: pagamentos});
        return console.log(Pagamento)
    })
    
});



//Form registration Payment

app.get('/registration-payment', (req, res) =>{
    res.render("registration-payment");
});




//Add Payment

app.post('/add-payment',(req, res) =>{
    Pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }).then(() => {
        res.redirect('/payment-list')

        
    }).catch((err) => {
        res.send('Erro ao cadastrar pagamento')
        console.log(err)
    })
});



//Delete Payment

app.get('/delete-payment/:id', (req, res)=>{
    Pagamento.destroy({
        where: {'id': req.params.id}

    }).then(() => {
        res.redirect('/payment-list')

    }).catch((err) => {
        res.send('Erro ao Deletar Cliente ')
        console.log(err)

    })

})


//Form Update

app.get('/update/:id', (req, res) =>{
    Pagamento.findByPk(req.params.id).then((resp) =>{
        res.render('update',{
            id: req.params.id,
            nome: req.body.nome,
            valor: req.body.valor        
        })

    })
    
})


//Send Update

app.post('/send-update/:id', (req, res) => {
    Pagamento.update({
       nome: req.body.nome,
       valor: req.body.valor
       
    },
    { where: {id: req.params.id }}
    ).then(()=> {
        res.redirect('/payment-list')
    }).catch((err) => {
        res.send('Erro ao Editar Cliente ')
        console.log(err) 
    })
})



app.listen(3000, () => console.log('Server is Running'));