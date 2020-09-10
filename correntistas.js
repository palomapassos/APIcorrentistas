const helpers = require("./helpers");
const { formataCpf, apenasNumeros } = require("./helpers");

//lista de correntistas
const correntistas = [
    {
    nome: `Alfredo Augusto Bezerra`,
    cpf:  helpers.apenasNumeros("19001284035"),
    codBanco: helpers.apenasNumeros(`652`),
    agencia: helpers.apenasNumeros("12345"),
    conta: helpers.apenasNumeros("1234563"),
    deletado: false,
    saldo: 251232
    },
    {
        nome: `Augusta Fernanda Bezerra`,
        cpf:  helpers.apenasNumeros("19014528435"),
        codBanco: helpers.apenasNumeros(`652`),
        agencia: helpers.apenasNumeros("12345"),
        conta: helpers.apenasNumeros("1231463"),
        deletado: false,
        saldo: 51561
    },
    {
        nome: `Amélia Sampaio dos Santos`,
        cpf:  helpers.apenasNumeros("11471284075"),
        codBanco: helpers.apenasNumeros(`453`),
        agencia: helpers.apenasNumeros("12345"),
        conta: helpers.apenasNumeros("1298763"),
        deletado: false,
        saldo: 51561
     },
]

//conferindo se o cpf existe
const confereCpf = (cpf) => {
    let posCpf = -1;
    correntistas.forEach((item, i) => {
        if(item.cpf.indexOf(cpf)!==-1){
           posCpf = i;
        }
    })
    return posCpf;
}


//procurando pelo cpf
const identificaCorrentista = (cpf) => {
    const posCpf = confereCpf(cpf);
    const status = posCpf !== -1 ? correntistas[posCpf].deletado : null;
    if(posCpf===-1 || status){
        return false;
    }else{
        return correntistas[posCpf];
    } 
}


//listar correntistas no sistema
const listarCorrentistas = () => {
    return correntistas;
}


//imprimindo informações formatadas
const imprimirInformacoes = (cpf) => {
    const posCpf = confereCpf(cpf);
    const status = posCpf !== -1 ? correntistas[posCpf].deletado : null;
    if(posCpf !== -1 && !status){
        return {
            nome: correntistas[posCpf].nome,
            cpf: helpers.formataCpf(correntistas[posCpf].cpf),
            codBanco: helpers.formataAg(correntistas[posCpf].agencia),
            agencia: helpers.formataAg(correntistas[posCpf].agencia),
            conta: helpers.formataConta(correntistas[posCpf].conta),
            deletado: correntistas[posCpf].deletado,
            saldo: 'R$ ' + correntistas[posCpf].saldo/100
            }

    }else{
        return "Usuário não encontrado" + cpf;
    } 
};


//Adicionando um novo correntista
const adicionarCorrentista = (correntista) => {
    const posCpf = confereCpf(correntista.cpf);
    const status = posCpf !== -1 ? correntistas[posCpf].deletado : null;
    if(posCpf!==-1 || status){
        return "Impossível cadastrar usuário. CPF já cadastrado ou deletado nesse banco.";
    }else{
        correntistas.push({
            nome: correntista.nome,
            cpf: helpers.apenasNumeros(correntista.cpf),
            codBanco: helpers.apenasNumeros(correntista.codBanco),
            agencia: helpers.apenasNumeros(correntista.agencia),
            conta: helpers.apenasNumeros(correntista.conta),
            deletado: false,
            saldo: 0
        })
        return imprimirInformacoes(correntistas[correntistas.length-1].cpf);
    }
}


//Atualizando um correntista
const atualizarCorrentista = (cpf, propriedade, valor) => {
    const posCpf = confereCpf(cpf);
    const status = posCpf !== -1 ? correntistas[posCpf].deletado : null;
    if(posCpf!==-1 && !status
        && propriedade!=='saldo' && propriedade!=='codBanco'){
        correntistas[posCpf][propriedade] = valor;
        return imprimirInformacoes(correntistas[posCpf].cpf);
    }else{
        return false;
    }
}


//Removendo Correntista
const removerCorrentista = (cpf) => {
    const posCpf = confereCpf(cpf);
    const status = posCpf !== -1 ? correntistas[posCpf].deletado : null;
    if(posCpf !== -1 && !status){ 
            correntistas[posCpf].deletado = true;
            return true;
    } else{
            return false;
    };
}


//exportando o módulo
module.exports = {
    identificaCorrentista: identificaCorrentista,
    listarCorrentistas: listarCorrentistas,
    removerCorrentista: removerCorrentista,
    adicionarCorrentista: adicionarCorrentista,
    atualizarCorrentista: atualizarCorrentista,
    imprimirInformacoes: imprimirInformacoes
}
