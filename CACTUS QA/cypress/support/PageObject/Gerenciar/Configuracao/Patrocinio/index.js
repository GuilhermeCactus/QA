import { elements as el } from "./elements";

class Patrocinio {

    navegarPatrocinio() {
        cy.wait(1000);

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.get('#kt_app_sidebar_menu_wrapper')
            .scrollTo('bottom', { ensureScrollable: false, duration: 300 });

        // Clica no link pai do span "Performance"
        cy.xpath(el.sideBar)
            .scrollIntoView()
            .should('be.visible')
            .click();

        // Verifica a URL
        cy.url().should('include', el.urlValidacao);
    }

    validandoBtnAdicionarPatrocinio() {
        // Validação de criação de patrocinio
        cy.xpath('//*[@id="kt_app_content_container"]/div/div/div[1]/button ')
            .should('be.visible')
            .click();

        cy.wait(1000);

        cy.xpath('//*[@id="modal_form_sponsor_header"]/h2')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contains('Adicionar Patrocínio');
            });
    }

    inserindoDadosPatrocinio() {
        cy.xpath('//*[@id="modal_form_sponsor_scroll"]/div[1]//input')
            .should('be.visible')
            .type('Teste QA - Patrocínio');

        // Seleciona o input file que o componente usa internamente
        cy.xpath(el.inputIMG)
            .attachFile('imagens/banner-teste.png', { force: true });

        cy.xpath('//*[@id="modal_form_sponsor_scroll"]/div[3]//input')
            .should('be.visible')
            .type('/TesteQA');

        cy.xpath('//*[@id="modal_form_sponsor_scroll"]/div[4]//input')
            .attachFile('imagens/banner-teste.png', { force: true });

        cy.xpath('//*[@id="richText"]/div[2]/div[1]')
            .should('be.visible')
            .click()
            .type('Descrição teste QA - Patrocínio');

        cy.xpath('//*[@id="kt_account_profile_details_submit"]')
            .should('be.visible')
            .click();

        cy.wait(2000);

        // validando modal de crianção
        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contains('Tem certeza que deseja enviar?');
            });

        this.confirmandoPatrocinio()

    }

    confirmandoPatrocinio(){
        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();

        cy.wait(3000)
    }

    validandoFiltro(){
        cy.get('.el-input__wrapper')
            .should('be.visible')
            .type('Teste QA')
    }

    validandoBtnFiltrar(){
        cy.contains('Filtrar')
            .should('be.visible')
            .click()

        cy.wait(500)

        cy.get('.el-button')
            .should('be.visible')
            .click()
    }

    validandoTabela(){
        cy.xpath('//*[@id="kt_app_content_container"]//table/tbody/tr/td[4]/div/span')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contains('Teste QA - Patrocínio');
            });
    }

    validandoAcoesEditar(){
        // Editar
        cy.get('.btn-light-success')
            .should('be.visible')
            .click()
            
        cy.wait(1000)

        // Modal editar
        cy.get('#modal_form_sponsor_header')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contains('Editar Patrocínios');
            });

        cy.get('#kt_account_profile_details_submit')
            .should('be.visible')
            .click()
    }

    validandoAcoesPrincipal(){
        // Editar
        cy.get('.btn-light-warning')
            .should('be.visible')
            .click()
            
        cy.wait(1000)

        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contains('Tem certeza que deseja tornar principal?');
            });

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click()
    }

    validandoAcoesEditar(){
        // Editar
        cy.get('.btn-light-success')
            .should('be.visible')
            .click()
            
        cy.wait(1000)

        // Modal editar
        cy.get('#modal_form_sponsor_header')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contains('Editar Patrocínios');
            });

        cy.get('#kt_account_profile_details_submit')
            .should('be.visible')
            .click()

        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contains('Tem certeza que deseja enviar?');
            });

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click()

        cy.wait(1000)

        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contains('Alterado com sucesso...');
            });
    }

    validandoAcao(){
        cy.get('.badge')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contains('Principal');
            });
    }

    validandoAcaoDeletar(){
        cy.get('.btn-light-danger')
            .should('be.visible')
            .eq(0)
            .click()
            
        cy.wait(1000)

        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contains('Tem certeza que deseja excluir?');
            });

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();

        cy.wait(1000)

        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contains('Deletado com sucesso...');
            }); 
    }
}

export default new Patrocinio()