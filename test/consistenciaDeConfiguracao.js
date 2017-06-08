/**
 * Created by mathias on 08/06/17.
 */

const assert = require('assert');
const NodeMailer = require('../NodeMailer');


Object.prototype.equals = function(x){
    for (var p in this) {
        if(typeof(this[p]) !== typeof(x[p])) return false;
        if((this[p]===null) !== (x[p]===null)) return false;
        switch (typeof(this[p])) {
            case 'undefined':
                if (typeof(x[p]) != 'undefined') return false;
                break;
            case 'object':
                if(this[p]!==null && x[p]!==null && (this[p].constructor.toString() !== x[p].constructor.toString() || !this[p].equals(x[p]))) return false;
                break;
            case 'function':
                if (p != 'equals' && this[p].toString() != x[p].toString()) return false;
                break;
            default:
                if (this[p] !== x[p]) return false;
        }
    }
    return true;
};


describe('Teste de consistência de configurações', function() {

    describe('Criação do Objeto', function() {

        it('Criar objeto sem parâmetros', function(done) {
            let mailer = new NodeMailer();
            done();
        });

        it('Criar objetos com três parâmetros vazios', function(done) {
            let mailer = new NodeMailer({auth:{}}, {}, {});
            done();
        });

        it('Criar objetos com configurações do Transporter', function(done) {

            let optionsTransporter = {
                host: 'gmail',
                port: 465,
                secure: true,
                auth: {
                    user: 'aplicativoliberep@gmail.com',
                    pass: 'mgrossagrossa'
                }
            };

            let mailer = new NodeMailer(optionsTransporter, {}, {});
            done();
        });

        it('Criar objetos com configurações do Transporter e Mailer', function(done) {

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

            let mailer = new NodeMailer(optionsTransporter, optionsMail);
            done();
        });

        it('Passando todos os parâmetros', function(done) {

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
            done();
        });

    });

    describe('Verificação dos parâmetros', function() {

        it('Verifica valores padrões para objeto criado sem parâmetros', function(done) {

            const mailer = new NodeMailer();

            objeto01 = mailer.geraObjetoComValoresPadroes();
            objeto02 = mailer.geraTodasAsConfiguracoes();

            if(objeto01.equals(objeto02))
                done();
            else {
                done(new Error());
            }
        });


    });
});