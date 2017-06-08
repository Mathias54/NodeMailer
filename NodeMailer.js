/**
 * Created by mathias on 07/06/17.
 */

const ejs = require('ejs');
const fs = require('fs');
const _padraoTransporter = require('./config/transporter');
const _padraoMailer = require('./config/mailer');
const _padraoTemplate = require('./config/template');

/**
 *
 * @param {Object} optionsTransporter padrão vazio
 * @param {Object} optionsTemplate padrão vazio
 * @param {Object} optionsMailer padrão vazio
 * @constructor
 */
function NodeMailer(optionsTransporter = _padraoTransporter, optionsMailer = _padraoMailer, optionsTemplate = _padraoTemplate) {

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
    html = optionsMailer.html ? optionsMailer.html : optionsMailer.html ='';

    /**
     * configurações para geracao do template
     */
    template = optionsTemplate.template ? optionsTemplate.template : '';
    codificacao = optionsTemplate.codificacao ? optionsTemplate.codificacao : '';
    mensagens = optionsTemplate.mensagens ? optionsTemplate.mensagens : optionsTemplate.mensagens ='';

    /**
     * função interna que gera o html do template
     * @function
     * @return {String}
     */
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

    /**
     * Retorna um objeto literal com as configurações necessárias para a geração dos templates
     * @returns {Object}
     */
    this.geraObjetoOptionsTemplate = function () {
        return {
            template: template,
            codificacao: codificacao,
            mensagens: mensagens
        }
    };

    /**
     * Retorna o html gerado para o template
     * @return {String}
     */
    this.geraHtmlTemplate = function () {
        geraHTML();
        return html;
    };

    /**
     * Retorna os valores de todas as propriedades
     * @return {Object}
     */
    this.geraTodasAsConfiguracoes = function () {
        return {
            host: host,
            port: port,
            secure: secure,
            auth: {
                user: auth.user,
                pass: auth.pass
            },
            from: from,
            to: to,
            subject: subject,
            html: html,
            template: template,
            codificacao: codificacao,
            mensagens: mensagens,
        }
    };

    /**
     * Retorna um objeto único com todas as configurações padrões
     * @method
     * @return {Object}
     */
    this.geraObjetoComValoresPadroes = function () {

        let padraoTransporter = _padraoTransporter;
        let padraoMailer = Object.keys(_padraoMailer);
        let padraoTemplate = Object.keys(_padraoTemplate);

        for(let i=0; i<padraoMailer.length; i++){
            padraoTransporter[padraoMailer[i]] = _padraoMailer[padraoMailer[i]];
        }
        for (let j=0; j<padraoTemplate.length; j++){
            padraoTransporter[padraoTemplate[j]] = _padraoTemplate[padraoTemplate[j]];
        }

        return padraoTransporter;
    };

    /**
     * TODO
     * 2) gerar gets e sets
     * 3) fazer o envio de e-mail funcionar
     * 4) verificar valores com utilziando gets e sets;
     */

}
module.exports = NodeMailer;


// const nodemailer = new NodeMailer();
//
// nodemailer.setTemplate('recuperar-senha', {
//     mensagem: '*URL PARA RECUPERAR SENHA*'
// });
//
// nodemailer.sendEmail((erro, info)=>{
//     console.log('e-mail enviado' + info);
// });


const optionsTransporter = {
    host: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'aplicativoliberep@gmail.com',
        pass: 'mgrossagrossa'
    }
};

const optionsMail = {
    from: '"Aplicativo Liberep" <aplicativoliberep@gmail.com>',
    to: 'mathiasgheno@gmail.com',
    subject: 'Teste Templete ✔',
    html: '<html>oi</html>'
};

const optionTamplate = {
    template: 'e-mail.ejs',
    codificacao: 'utf-8',
    mensagens: {
        mensagem: 'olá, funciona'
    },
};

let mailer = new NodeMailer(optionsTransporter, optionsMail, optionTamplate);
console.log(mailer.geraObjetoComValoresPadroes());
console.log(mailer.geraTodasAsConfiguracoes());