import { elements as el } from "./elements";

class Webhook {

    navegarWebhook() {
        cy.wait(1000);

        // Navegação para Webhook
        cy.contains(el.sideBarWebhook)
            .should('be.visible')
            .click()
    }

    validacaoheaderWebhook() {
        cy.get('.page-heading')
            .should('be.visible')
            .and('contain.text', 'Webhooks');
    }
    
    clickbtnAdicionar() {
        cy.contains('Adicionar')
            .should('be.visible')
            .click();

        cy.wait(500);
    }

    validarModalAdicionarWebhook() {
        cy.get('#modal_add_webhook_header')
            .should('be.visible')
            .and('contain.text', 'Adicionar Webhook');

        cy.wait(500);
    }

    inserindoMetodoGET() {
        cy.get('.me-5 > [name="webhookMethod[]"]')
            .should('be.visible')
            .click();

        cy.wait(500);
    }

    inserindoDelay(delay) {
        cy.get('[name="webhook_delay"]')
            .should('be.visible')
            .type(delay)

        cy.wait(500);
    }

    inserindoURL(url) {
        cy.get('[name="webhook_url"]')
            .should('be.visible')
            .type(url);

        cy.wait(500);
    }

    selecionandoEvento() {
        cy.get(':nth-child(1) > [name="events[]"]')
            .should('be.visible')
            .click();

        cy.wait(500);
    }

    clicarBtnSalvar() {
        cy.get('#kt_account_profile_details_submit')
            .should('be.visible')
            .click();
    }

    validacaoSucessoCriacao() {
        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contains('Tem certeza que deseja enviar?');
            });
    }

    validandoElementosFiltro(){
        // Validando nome do filtro
        cy.xpath('//*[@id="kt_app_content_container"]/div/div/div[1]/div[1]/div/div[1]/label')
            .should('be.visible')
            .and('contain.text', 'Busque pelo webhook:');

        cy.wait(500);

        cy.get('.el-input__wrapper')
            .should('be.visible')
            .type('https://www.exemplo.com');

        cy.wait(500);

        // Clicar em filtrar
        cy.get('.position-relative > .btn')
            .should('be.visible')
            .click();

        // validando btn limpar
        cy.get('.el-button')
            .should('be.visible')
    }

    validandoRetornoTabela(){
                // Validando retorno do METODO
        cy.xpath('//*[@id="kt_app_content_container"]//table/tbody/tr/td[1]/div')
            .should('be.visible')
            .and('contain.text', 'GET');

        cy.wait(500);

        cy.xpath('//*[@id="kt_app_content_container"]//table/tbody/tr/td[2]/div')
            .should('be.visible')
            .and('contain.text', 'https://www.exemplo.com');

        cy.wait(500);

        // Eventos
        cy.xpath('//*[@id="kt_app_content_container"]//table/tbody/tr/td[3]/div')
            .should('be.visible')
            .and('contain.text', 'Registro');

        cy.wait(500);

        // Delay 
        cy.xpath('//*[@id="kt_app_content_container"]//table/tbody/tr/td[4]/div')
            .should('be.visible')
            .and('contain.text', '1 Minutos');

        cy.wait(500);

        // Status
        cy.get('.badge')
            .should('be.visible')
            .and('contain.text', 'Ativo');
    }

    validandoEnviarWebhook(){
                // Btn envia webhook
        cy.get('.d-inline-flex > div')
            .should('be.visible')
            .click();

        cy.wait(500);

        cy.get('.swal2-popup')
            .should('be.visible')
            .and('contain.text','Webhook enviado com sucesso');

        // Confirmar
        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();
    }

    validandoEditarWebhook(){
                // Editar Webhook
        cy.get('.btn-light-success')
            .should('be.visible')
            .click();

        cy.wait(500);

        cy.get('#modal_add_webhook_header')
            .should('be.visible')
            .and('contain.text', 'Editar Webhook');

        cy.wait(500);

        cy.get('#kt_account_profile_details_submit')
            .should('be.visible')
            .click();

        cy.wait(500);

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();

        cy.get('.swal2-popup')
            .should('be.visible')
            .and('contain.text','Alterado com sucesso');

        cy.wait(2000);
    }

    validandoExcluirWebhook(){
                cy.get('.btn-light-danger')
            .should('be.visible')
            .click();

        cy.wait(500);

        cy.get('.swal2-popup')
            .should('be.visible')
            .and('contain.text','Tem certeza que deseja excluir?');

        cy.wait(500);

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();   

        cy.wait(500);

        cy.get('.swal2-popup')
            .should('be.visible')
            .and('contain.text','Webhook deletado com sucesso!');

        cy.wait(500);

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();   

        cy.wait(500);
    }

}
export default new Webhook(); 