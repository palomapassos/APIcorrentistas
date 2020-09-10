const correntistas = require("./correntistas");

const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const { identificaCorrentista, listarCorrentistas, atualizarCorrentista } = require("./correntistas");
const server = new Koa();

server.use(bodyparser());

server.use(async ctx => {
    ctx.body = "Hello World!"; //imprimindo para qualquer requisição
    const caminho = ctx.url;
    const metodo = ctx.method;
   if(caminho === '/correntistas'){
        if(metodo === 'GET'){         //listando todos os correntistas
          //  ctx.body = correntistas.listarCorrentistas();
           ctx.body = listarCorrentistas();
        }else if(metodo === 'POST'){         //adicionando todos um correntista
           const correntista = correntistas.adicionarCorrentista(ctx.request.body);
           ctx.body = correntista;
       }else{
          ctx.status = 404;
          ctx.body = "Não encontrado";
        }
   }else if(caminho.includes('/correntistas/')){
     const cpf = caminho.split('/')[2];
     if(!cpf){
          ctx.status = 400;
          ctx.body = "Você precisa passar um cpf";
     }else{
          if(metodo ==='PUT'){      //atualizando todos um correntista
               const propriedade = (ctx.request.body.propriedade);
               const valor = (ctx.request.body.valor);
               const atualizar = correntistas.atualizarCorrentista(cpf, propriedade, valor);
               ctx.body = atualizar === false ? "Impossível atualizar usuário, usuário não encontrado ou deletado" : "Usuário atualizado";            
          }else if(metodo === 'DELETE'){
               const deletar = correntistas.removerCorrentista(cpf);
               ctx.body = deletar === false ? "Usuário não encontrado ou deletado" : "Usuário deletado";
          }else if(metodo === 'GET'){
               const procurar = correntistas.identificaCorrentista(cpf);
               ctx.body = procurar === false ? 
                    "Usuário não encontrado ou deletado" : correntistas.imprimirInformacoes(cpf);
          }else{
               ctx.status = 404;
               ctx.body = "Não encontrado";
          }
     }

   }else{
       ctx.status = 404;
       ctx.body = "Não encontrado";
   }
   

       
});

server.listen(8081, () => console.log("Requisição Recebida!"))