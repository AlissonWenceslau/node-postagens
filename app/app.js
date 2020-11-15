const bodyParser = require('body-parser')
const { Console } = require('console')
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const Post = require('./models/Posts')

//Config
    //template engine
    app.engine('handlebars', handlebars({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }
    }))
    app.set('view engine', 'handlebars')
    
    //Body-parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    
    //Rotas
    app.get('/', function(req,res){
        res.render('home')
    })

    app.get("/cadastro", (req, res)=>{
        res.render('formulario')
    })

    app.post("/cadastrado", (req, res)=>{
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            res.send('Post cadastrado com sucesso!')
        }).catch(function(erro){
            console.log('Oh não, falha ao inserir post, tente novamente mais tarde!')
        })
    })

    app.get('/lista', function(req,res){
        Post.findAll().then(function(posts){
            res.render('lista-de-posts', {posts: posts})
        })
    })

    app.get('/deletar/:id', function(req,res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.send('Postagem deletada com  sucesso!')
        }).catch(function(err){
            res.send('Postagem não existe!')
        })
    })

    app.use(function(req,res,next){
        res.status(404).send('<h1> Página não foi encontrada</h1>')
    })

app.listen(3000,(req, res)=>{
    console.log("Servidor rodando na porta 3000")
})