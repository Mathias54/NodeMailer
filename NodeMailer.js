/**
 * Created by mathias on 07/06/17.
 */

const ejs = require('ejs');
const fs = require('fs');

/**
 *
 * @constructor
 */
function NodeMailer(optionsTransporter, optionsMailer) {

    /**
     * configurações da Transporter
     */
    host = optionsTransporter.host ? optionsTransporter.host : '';
    port = optionsTransporter.port ? optionsTransporter.port : '';
    secure = optionsTransporter.secure ? optionsTransporter.secure : '';
    auth = {
        user: optionsTransporter.auth.user ? optionsTransporter.auth.user : '',
        pass: optionsTransporter.auth.pass ? optionsTransporter.auth.pass : ''
    };

    /**
     * configurações da Options de envio do e-mail
     */
    from = optionsMailer.from ? optionsMailer.from : '';
    to = optionsMailer.to ? optionsMailer.to : '';
    subject = optionsMailer.subject ? optionsMailer.subject : '';

    template = optionsMailer.template ? optionsMailer.template : '';
    codificacao = optionsMailer.codificacao ? optionsMailer.codificacao : '';
    mensagens = optionsMailer.mensagens ? optionsMailer.mensagens : optionsMailer.mensagens ='';

    html = optionsMailer.html ? optionsMailer.html : optionsMailer.html ='';

    let geraHTML = function () {
        html = ejs.render(
            fs.readFileSync(template, codificacao) ,
            mensagens
        );
    };

    /**
     * Retorna um objeto literal com as configurações necessárias para o funcionamento do Transporter
     * @returns {Object}
     */
    this.geraObjetoTransporter = function () {
        return {
            host: host,
            port: port,
            secure: secure,
            auth: {
                user: auth.user,
                pass: auth.pass
            }
        }
    };

    /**
     * Retorna um objeto literal com as configurações necessárias para o funcionamento do envio do e-mail
     * @returns {Object}
     */
    this.geraObjetoOptions = function () {
        return{
            from: from,
            to: to,
            subject: subject,
            html: html
        }
    };

    this.retornaHtmlGerado = function () {
        geraHTML();
        return html;
    };

    /**
     * TODO
     * 1) separar as configurações de template dos optionsMailer
     * 2) gerar gets e sets
     * 3) fazer o envio de e-mail funcionar
     * 4) adicionar arquivos json de configuração padrão, caso nada seja passado por parametro
     *
     */

}



// const nodemailer = new NodeMailer();
//
// nodemailer.setTemplate('recuperar-senha', {
//     mensagem: '*URL PARA RECUPERAR SENHA*'
// });
//
// nodemailer.sendEmail((erro, info)=>{
//     console.log('e-mail enviado' + info);
// });


const nodemailer = new NodeMailer({
    host: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'aplicativoliberep@gmail.com',
        pass: 'mgrossagrossa'
    }
}, {
    from: '"Aplicativo Liberep" <aplicativoliberep@gmail.com>',
    to: 'mathiasgheno@gmail.com',
    subject: 'Teste Templete ✔',
    template: 'e-mail.ejs',
    codificacao: 'utf-8',
    mensagens: {
        mensagem: 'olá, funciona'
    },
    html: '<html>oi</html>'
});

const objeto = nodemailer.geraObjetoOptions();
console.log(objeto);
console.log(nodemailer.retornaHtmlGerado());

