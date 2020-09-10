
const banco = (codigo) => {
    switch(codigo){
        case '001': 
            return "Banco do Brasil";
        break;

        case '033':
            return "Banco Santander";
        break;

        case '104':
            return "Caixa Econômica Federal";
        break;

        case '237':
            return "Banco Bradesco";
        break;

        case '341':
            return "Banco Itaú";
        break;

        case '356':
            return "Banco Real";
        break;

        case'389':
            return "Banco Mercantil do Brasil";
        break;

        case '399':
            return "HSBC Bank Brasil";
        break;

        case '422':
            return "Banco Safra";
        break;

        case '453':
            return "Banco Rural";
        break;

        case '633':
            return "Banco Rendimento";
        break;

        case '652':
            return "Itaú Unibanco";
        break;

        case '745':
            return "Banco Citibank";
        break;

        default:
            return "Código inválido";
        break;
    }
}


const apenasNumeros = (entrada) => {
    entrada = entrada.replace(/[\-\.]/g, "");
    return entrada;
}


const formataCpf = (cpf) => {
    const parte1 = cpf.slice(0,3);
    const parte2 = cpf.slice(3,6);
    const parte3 = cpf.slice(6,9);
    const parte4 = cpf.slice(9,11);
    return parte1+"."+parte2+"."+parte3+"-"+parte4;
}


const formataAg = (agencia) => {
    const numero = agencia.slice(0,4);
    const digito = agencia.slice(4,5);
    return numero+"-"+digito;
}


const formataConta = (conta) => {
    const numero = conta.slice(0,6);
    const digito = conta.slice(6,7);
    return numero+"-"+digito;
}



module.exports = {
    banco: banco,
    apenasNumeros: apenasNumeros,
    formataCpf: formataCpf,
    formataAg: formataAg,
    formataConta: formataConta
}