/**
 * Created by mathias on 07/06/17.
 */
'use strict';
/**
 *
 * Implementar como fosse uma classe, algo mais ou menos assim:
 * const sendEmail = new NodeMailer();
 * sendEmail.setFrom = 'mathiasgheno@gmail.com';
 * sendEmail.setTemplate('sejaBemVindo');
 * sendEmail.enviar( (erro, info) =>{
 *  console.log('email enviado');
 * };
 *
 *
 */


const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');

let transporter = nodemailer.createTransport({
    host: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'aplicativoliberep@gmail.com',
        pass: 'mgrossagrossa'
    }
});

let mailOptions = {
    from: '"Aplicativo Liberep" <aplicativoliberep@gmail.com>',
    to: 'mathiasgheno@gmail.com',
    subject: 'Teste Templete ✔',
    html: ejs.render( fs.readFileSync('e-mail.ejs', 'utf-8') , {mensagem: 'olá, funciona'})
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
