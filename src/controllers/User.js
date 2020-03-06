import { verifyToken } from './auth/Token';
import Ticket from '../models/ticket';
import loginUser from './auth/Login';
import procesarPago from '../helpers/procesarPago';
class User {

  static async checkLogin(req, res) {
    verifyToken(req.token, (err, authData) => {
      if (err) {
        res.status(401).json({
          status: 401,
          message: "Token Invalid"
        });
      } else {
        res.json({
          message: authData,
          status: 200
        }).status(200);
      }
    })
  }

  static async verBoletos(req, res) {
        //* OK!
        const tickets = await Ticket.getTickets([req.params.id]);
        if (tickets.length > 0) {
          res.json({status: 200, message: [...tickets]}).status(200);
        } else {
          res.json({status: 404, message: "No se encontraron Boletos"}).status(404);
        }
        //*
  }

  static async comprarBoleto(req, res) {
    // console.log(req.body);
    verifyToken(req.body.user.token, async (err, authData) => {
      if (err) {
        res.status(401).json({
          status: 401,
          message: "Token Invalid"
        });
      } else {
        const pago = await procesarPago({ ...req.body.pago, ...req.body.user });
        if (pago.success) {
          const { nombre, apellido, correo } = req.body.user;
          /*
          pdf.create(decode(pago.voucher)).toFile(`./facturas/${pago.reference}.pdf`, async function (_err, _res) {
            if (_err) {
              console.log(_err);
              res.json({ status: 500, message: "Error al almacenar Factura en Servidor..." }).status(500);
            } else {

              //* Ida
              let id_factura = await Ticket.crearFactura([authData.id_user, pago.reference, req.body.pago.monto]);
              id_factura = id_factura[0].id_factura;
              let id_boleto = await Ticket.crearTicket([authData.id_user, Number(req.body.vuelo.id_vuelo_salida), Number(req.body.vuelo.id_agencia), id_factura]);
              id_boleto = id_boleto[0].id_boleto;
              console.log(id_boleto);
              //id_user, id_vuelo, id_agencia, id_factura

              if (!req.body.vuelo.ida) {
                //* Vuelta
                let id_factura_vuelta = await Ticket.crearFactura([authData.id_user, pago.reference, req.body.pago.monto]);
                id_factura_vuelta = id_factura_vuelta[0].id_factura_vuelta;
                let id_boleto_llegada = await Ticket.crearTicket([authData.id_user, Number(req.body.vuelo.id_vuelo_salida), Number(req.body.vuelo.id_agencia), id_factura_vuelta]);
                id_boleto_llegada = id_boleto_llegada[0].id_boleto_llegada;
              }

              res.json({ status: 200, message: "Pago Realizado con Exito... Enviando Factura a Correo" }).status(200);
            }
          });
          */
        }
      }
    });
  }

  static async Login(req, res) {
    loginUser({ correo: req.body.correo, clave: req.body.clave }, res);
  }

}

export default User;