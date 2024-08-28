const express = require('express')

// Define uma classe para organizar a lógica da aplicação
class AppController{
    constructor(){

        // Cria uma nova instância do Express dentro da classe
        this.express = express();
        // Chama o método middlewares para configurar os middlewares
        this.middlewares();
        // Chama o método routes para definir as rotas da Api
        this.routes();
    }
    middlewares(){
        // Permitir que a aplicação receba dados em formato JSON nas requisições
        this.express.use(express.json());
    }

    // Define as rotas da nossa API
    routes(){
        const users = [];

        this.express.post("/users",(req,res)=>{
            const {id,nome,email,senha} = req.body
            users.push({ id,nome,email,senha });
            res.status(200).send({ message:"Usuário Cadastrado com Sucesso" })
        });

        this.express.post("/auth",(req,res)=>{
            const {email,senha} = req.body

            const user_email = users.find((user_email) => user_email.email == email);

            if(user_email){
                const user_senha = users.find((user_senha) => user_senha.senha == senha);
                if(user_senha){
                    res.status(200).send({ message: "Usuário Autenticado"})
                }
                else{
                    res.status(400).send({ message: "Usuário Não Encontrado"})
                }
            }
            else{
                res.status(400).send({ message: "Usuário Não Encontrado" })
            }

            //res.status(200).send({ message:"Usuário Cadastrado com Sucesso" })
        });
        

        this.express.get("/users/:id",(req,res)=>{
            const{id} = req.params;
            const user = users.find((user) => user.id == id);
            if(user){
                res.status(200).send(user)
            }
            else{
                res.status(400).send({ message: "Usuário Não Encontrado" })
            }
        })






        // Define uma rota GET para o caminho health
        this.express.get('/health/',(req, res)=>{
            res.send({ nome: "Pedro Lemos Bonini", idade: "16", cpf: "45990449895" });
        }); // Essa rota é usada para verificar se a Api está OK
    }
}

// Exportando a instância de Express configurada, para que seja acessada em outros arquivos
module.exports = new AppController().express;