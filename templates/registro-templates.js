"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();

exports.enviarMail = (requerimentType) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 25,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "francisco.stht@gmail.com",
      pass: "Ngen1106",
    },
  });
  let mailOption = {
    from: "stackcalm@gmail.com",
    to: "fjsoto@oxxean.cl",
    subject: "Bienvenidos a la aplicacion",
    html: " <h1>hola</h1>",

    /* html: ` 
    
    <table border="0" cellpadding="0" width="600px" background-color="#2d3436">
    <tr height="200px">
    <td bgcolor="" width="600px">
    <h1 style="color:#fff;text-align:center">Bienvenido</h1>
    <p style="color:#fff;text-align:center">
    <span style="color:#e84393">${requerimentType}</span>
    a la aplicacion
    </p>
    </td>
    </tr>
    <tr bgcolor="#fff">
    <td style="text-align:center">
    <p style="color:#000">Un mundo de servicios a su disponicion</p>
    </td>
    </tr>
    </table>
    `,*/
  };
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      //console.log("El correo se envio correctamente" + info.res);

      console.log("Email enviado...", info.message);
    }
  });
};
