import instapago from 'instapago';

const i = instapago(process.env.INSTA_PAGO_KEY1,process.env.INSTA_PAGO_KEY2);

const procesarPago = ({ name, id, number, cvc, expiry, monto}) => {
    return i.pay({
        amount: 60000,
        description: 'Probando el módulo Instapago',
        cardholder: name,
        cardholderid: id,
        cardnumber: number,
        cvc: cvc,
        expirationdate: '12/2020',
        statusid: 1,
        ip: '127.0.0.1'
    }).then(respuesta => (respuesta.data)).catch(error => {
        console.error(error);
        return error;
    });
}

export default procesarPago;