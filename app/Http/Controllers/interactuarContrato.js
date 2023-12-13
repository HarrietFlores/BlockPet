const Web3 = require('web3');

const web3 = new Web3('http://127.0.0.1:7545');
const contractAddress = '';
const pathContrato = 'C:/Users/harri/OneDrive/Escritorio/Proyecto_PetChain/Contrato/build/contracts/Mascota.json';

const contratoAbi = require(pathContrato).abi;
const contrato = new web3.eth.Contract(contratoAbi, contractAddress);

async function ejecutarFuncion(contrato, functionName, valores) {
    try {
        const cuentas = await web3.eth.getAccounts();

        const cuenta = cuentas[0];

        const gasPrice = await web3.eth.getGasPrice();
        console.log('Gas Price:', gasPrice);

        const nonce = await web3.eth.getTransactionCount(cuenta);
        console.log('Nonce:', nonce);

        const transaccion = await contrato.methods[functionName](...valores).send({
            from: cuenta,
            gasPrice: gasPrice,
            nonce: nonce,
        });

        console.log('Transacción realizada con éxito:', transaccion);
    } catch (error) {
        console.error('Error al ejecutar la función:', error);
    }
}

const params = process.argv.slice(2);

const functionName = 'addpet';
ejecutarFuncion(contrato, functionName, params);
