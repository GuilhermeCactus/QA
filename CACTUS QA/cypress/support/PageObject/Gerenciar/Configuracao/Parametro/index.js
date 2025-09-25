import {elements as el} from "./elements";

class Parametro {

    navegarParametro(){
        cy.wait(1000);

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.get(el.sideBarConfiguracao)
        .scrollTo('bottom', { ensureScrollable: false, duration: 300 });

        // Clica no link pai do span "Performance"
        cy.xpath(el.sideBarParametro)
        .scrollIntoView()
        .should('be.visible')
        .click()
    }

    validaURLNavegacao(){
        cy.wait(750)
        cy.url().should('contain', el.urlParametro);
        cy.wait(750)
    }

    clickBtnAdicionar() {
        cy.get(el.btnAdicionar)
        .should('be.visible')
        .invoke('removeAttr', 'target') // remove _blank
        .click();                       // abre na mesma aba

        //cy.url().should('include', '/settings/parameters/add');
    }

    inserindoInfoBasica(){
        // Nome
        cy.get(el.nome)
        .should('be.visible')
        .type('Teste QA Automatizado')

        cy.wait(500)

        // Email
        cy.get(el.email)
        .should('be.visible')
        .type('admin@gmail.com')

        cy.wait(500)
    }

    inserindoDepositos(){
        // Ativando depositos
        cy.get(el.checkDeposito)
        .should('be.visible').should('not.be.checked')
        .click()
        .should('be.checked')

        cy.wait(500)

        cy.get(el.vlrMinDeposito)
        .should('be.visible')
        .type(1)

        cy.wait(500)

        cy.get(el.vlrMaxDeposito)
        .should('be.visible')
        .type(10000)

        cy.wait(500)
    }

    inserindoBonusDepositos(){
        cy.get(el.checkBonusDeposito)
        .should('be.visible')
        .click()
        .should('be.checked')

        cy.wait(500)

        cy.get(el.bonusDeposito)
        .should('be.visible')
        .type(10)

        cy.wait(500)

        cy.get(el.vlrMaxBonus)
        .should('be.visible')
        .type(10000)

        cy.wait(500)

        cy.get(el.msgDeposito)
        .type('Texto mensagem de deposito - Teste Automatizado !')

    }

    inserindoBonusIndicacao(){
        // Check Bonus de indicacao
        cy.get(el.checkBonusIndicacao)
        .should('be.visible')
        .click()
        .should('be.checked')

        cy.wait(500)
    
        // Deposito minimo indicaco
        cy.get(el.vlrDepositoMinIndicacao)
        .should('be.visible')
        .type(10000)

        cy.wait(500)

        // Bonus referido
        cy.get(el.bonusReferifo)
        .should('be.visible')
        .type(10)

        cy.wait(500)

        // Ativando mensagem personalizada do cabecalho
        cy.get(el.checkMsgBonusIndicacao)
        .should('be.visible')
        .click()
        .should('be.checked')

        cy.wait(500)

        // Mensagem personalidada 
        cy.get(el.msgPersonalizada)
        .should('be.visible')
        .type('QA - Teste automatizado')

        cy.wait(500)

        // Ativando texto personalizado do botao
        cy.get(el.checkMsgBonus)
        .should('be.visible')
        .click()
        .should('be.checked')

        cy.wait(500)

        // Texto personalisado no botao
        cy.get(el.msgBtnBonus)
        .should('be.visible')
        .type('QA - BTN TESTE')
    }

    inserindoSaques(){
        // Informacoes de saque automatico
        this.saqueAutomatico()
        this.validandoSaqueAutomatico()
        this.validandoSaque()
    }

    saqueAutomatico(){
        // Ativando saque automatico
        cy.get(el.checkSaqueAutomatico)
        .should('be.visible')
        .should('not.be.checked')
        .click()
        .should('be.checked')

        cy.wait(500)

        // Diario - por saque
        cy.get(el.saqueDiario)
        .should('be.visible')
        .type(10000)

        cy.wait(500)

        // Diario - Acumulado total
        cy.get(el.saqueAcumuloDiario)
        .should('be.visible')
        .type(100000)

        cy.wait(500)

        // ------------------------ Valor minimo por saque
        cy.get(el.vlrMinSaque)
        .should('be.visible')
        .type('100')

        cy.wait(500)

        // Valor minimo por saque
        cy.get(el.vlrMaxSaque)
        .should('be.visible')
        .type('100000')

        cy.wait(500)

        // Valor maximo diario
        cy.get(el.vlrMaxDiario)
        .should('be.visible')
        .type('100000')

        cy.wait(500)

        // Select intervalo de saque
        cy.get(el.selecIntervaloSaque)
        .should('be.visible')
        .select('by_hour')

        cy.wait(500)

        // Intervalo
        cy.get(el.selectIntervalo)
        .should('be.visible')
        .clear()
        .type('1')

        cy.wait(500)

        // qtd bonus
        cy.get(el.inputQtdSaqueBonus)
        .should('be.visible')
        .clear()
        .type('1')

    }

    validandoSaqueAutomatico() {
    cy.xpath(el.spanValidacaoSaqueAutomatico)
        .should('be.visible')
        .invoke('text') // pega o conteúdo renderizado (sem <strong>)
        .then((msg) => {
        const normalizado = msg.replace(/\s+/g, ' ').trim(); 
        expect(normalizado).to.include(
            'R$ 100,00 será aprovado automaticamente até atingir o valor acumulado de R$ 1.000,00'
        );
        });
    }

    validandoSaque(){
        cy.xpath('//*[@id="settings_withdraws"]//div[10]/span')
                .should('be.visible')
        .invoke('text') // pega o conteúdo renderizado (sem <strong>)
        .then((msg) => {
        const normalizado = msg.replace(/\s+/g, ' ').trim(); 
        expect(normalizado).to.include(
            '1 (um) saque a cada 1 hora(s) de valor entre R$ 1,00 e R$ 1.000,00 até o máximo diário de R$ 1.000,00.'
        );
        });
    }

    inserindoRollOver(){
        // - Valor minimo cassino
        cy.get('[name="rollOverMultiplier"]')
        .should('be.visible')
        .clear()
        .type(1000)
        cy.wait(500)

        // - Valor minimo esportes
        cy.get('[name="multiplier_to_allow_first_withdraw"]')
        .should('be.visible')
        .clear()
        .type(1000)
        cy.wait(500)

        // - Valor minimo Saldo real
        cy.get('[name="rollover_multiplier_real_value"]')
        .should('be.visible')
        .clear()
        .type(1000)
        cy.wait(500)

        // - Tempo expiração cassino
        cy.get('#settings_rollover > .card-body > :nth-child(4) .form-control')
        .should('be.visible')
        .type(24)
        cy.wait(500)

        // - Tempo expiração esporte
        cy.get(':nth-child(5) > .col-lg-9 > .form-control')
        .should('be.visible')
        .type(24)
        cy.wait(500)
    }

    inserindoRodape(){
        cy.get('.ql-editor')
        .should('be.visible')
        .type('Texto teste automatizado')

        cy.wait(500)

        // ----- SEO 
        cy.xpath('//*[@id="settings_regulament"]/div/div/div[1]/input')
        .should('be.visible')
        .type('TesteQA')

        cy.wait(500)

        // - Texto tag H1
        cy.xpath('//*[@id="settings_regulament"]/div/div/div[2]/div/input')
        .should('be.visible')
        .type('QA TEST')

        cy.wait(500)

        cy.xpath('//*[@id="settings_regulament"]/div/div/div[3]/div/textarea')
        .should('be.visible')
        .type('Descrição teste automatizado!')
    }
}

export default new Parametro()