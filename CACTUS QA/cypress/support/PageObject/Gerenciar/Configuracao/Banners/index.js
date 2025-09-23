import {elements as el} from "./elements";

class Banner {

    navegarBanner(){
        cy.wait(1000);

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.get(el.sideBarConfiguracao)
        .scrollTo('bottom', { ensureScrollable: false, duration: 300 });

        // Clica no link pai do span "Performance"
        cy.xpath(el.sideBarBanners)
        .scrollIntoView()
        .should('be.visible')
        .click()
    }

    navegaOpcBannersValidacao(){
        cy.wait(750)
        cy.url().should('contain', el.urlBanners);
        cy.wait(750)
    }

    validarCriacaoBanners(){
        cy.xpath(el.btnAdicionar)
        .should('be.visible')
        .click()

        cy.wait(500)

        cy.xpath(el.modalBanner)
        .should('be.visible')

        cy.wait(500)
    }

    criacaoBanner() {
        // Seleciona o input file que o componente usa internamente
        cy.xpath(el.inputIMG)
        .attachFile('imagens/banner-teste.png', { force: true });


        cy.wait(500)

        cy.get(el.validacaoBanner)
        .should('have.length', 1)
        .and('contain.text', 'banner-teste.png');

        this.checklinks()
        this.inserindoLink('/testQA')
        this.inserindoAgendaBanner()
        this.clickBtnAdicionar()
        this.validandoCriacao()
        this.confirmaCriacao()
    }

    inserindoLink(input){
        cy.get(el.inputLink)
        .should('be.visible')
        .click()
        .clear()
        .type(input) // <- aqui vai a variável
        .should('have.value', input) // valida que digitou certo
    
        cy.wait(500)
    }

    inserindoAgendaBanner(){
        // Periodo especifico
        cy.get(el.periodoData)
        .should('not.be.checked')
        .click()

        cy.wait(2500)

        cy.get(el.inputDataInicio)
        .scrollIntoView()
        .should('be.visible');

        cy.get(el.inputDataFim)
        .scrollIntoView()
        .should('be.visible');
    }

    setandoInputLink(inputText){
        cy.get(el.inputLinkBusca)
        .eq(0)
        .should('be.visible')
        .type(inputText)

        cy.wait(500)
    }

    validandoCriacao() {
        cy.get(el.modalPopUp)
        .should('be.visible')
        .invoke('text')
        .then((msg) => {
            msg = msg.replace(/×\?|Não|No|Sim/g, '').trim();
            expect(msg).to.eq('Tem certeza que deseja enviar?');
        });

        cy.wait(500)
    }

    validandoDeletar(){
        cy.get(el.modalPopUp)
        .should('be.visible')
        .invoke('text')
        .then((msg) => {
            msg = msg.replace(/×|\n |OKNoCancel|/g, '').trim();
            expect(msg).to.eq('Deletado com sucesso...'); // ×\n   \n   \n  \nDeletado com sucesso... OKCancel
        });

        cy.wait(500)
    }

    validandoModalCriacao(text){
        cy.get(el.modalBannerHeader)
        .should('be.visible')
        .invoke('text')
        .then((msg) => {
            expect(msg).contain(text)
        })
    }
    
    confirmaCriacao(){
        cy.get(el.btnConfirma)
        .should('be.visible')
        .click()

        cy.wait(5000)
    }

    confirmandoDeleteBanner(){
        cy.get(el.modalPopUp)
        .should('be.visible')
        .invoke('text')
        .then((msg) => {
            msg = msg.replace(/×\?|Não|No|Sim/g, '').trim();
            expect(msg).to.eq('Tem certeza que deseja excluir?');
        });

        cy.wait(500)

        cy.get(el.btnConfirma)
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    confirmandoCancelamentoBanner(){
        cy.get(el.modalPopUp)
        .should('be.visible')
        .invoke('text')
        .then((msg) => {
            msg = msg.replace(/×\n|\n|No|Não|Sim/g, '').trim();
            expect(msg).equal('Tem certeza que deseja cancelar?')
        })
    }

    clickAdicionarBanner(){
        cy.xpath(el.btnAdicionar)
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    clickEditarBanner(){
        cy.xpath(el.btnEditar)
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    clickBtnFiltrar(){
        cy.get('.el-button')
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    clickBtnAdicionar(){
        cy.wait(500)

        cy.get('#kt_account_profile_details_submit')
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    clickSelectPais(){
        cy.log('--> Click select pais realizado.')

        cy.get(el.selcPais)
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    clickBtnDeleteBanner(){
        cy.get(el.btnDeletar)
        .eq(0)
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    clickBtnCancelar(){
        cy.contains('Cancelar')
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    selecionandoPais(){
        cy.contains('Brasil')
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    checklinks() {
        // Clica no label 2
        cy.xpath(el.checkTwo)
        .check({ force: true }) // força caso esteja escondido
        .should('be.checked');

        // Valida que o label 1 não está checado
        cy.xpath(el.checkOne)
        .should('not.be.checked');

        // Agora volta a clicar no label 1
        cy.xpath(el.checkOne)
        .check({ force: true })
        .should('be.checked');

        // E valida que o label 2 não está mais checado
        cy.xpath(el.checkTwo)
        .should('not.be.checked');
    }

    editarBanner(input){
        this.inserindoLink(input)
        
        cy.wait(500)

        // Periodo especifico - Permanente
        cy.get('.el-switch__core')
        .click()

        cy.wait(500)

        cy.get('#kt_account_profile_details_submit')
        .should('be.visible')
        .click()

        cy.wait(500)

        // confirmando edição
        cy.get(el.btnConfirma)
        .should('be.visible')
        .click()

        cy.wait(3500)
    }

    BannerCancelar(opc){
        cy.get(el.modalPopUp)
        .should('be.visible')
        .invoke('text')
        .then((msg) => {
            if(opc == "editacao"){
                msg = msg.replace(/×\n|\n|No|Não|Sim/g, '').trim();
                expect(msg).equal('Tem certeza que deseja cancelar?')
            } else {
                msg = msg.replace(/×\?|NãoNoSim|/g, '').trim();
                expect(msg).equal('Tem certeza que deseja excluir?')   
            }
        })
    }
}

export default new Banner()