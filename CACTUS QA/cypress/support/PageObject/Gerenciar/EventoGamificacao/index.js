import { elements as el } from "./elements";

class EventoGamificacao {

    navegarEventos() {
        cy.wait(1000);

        // Navegação para Webhook
        cy.xpath(el.sideBarEventoGamificacao)
            .should('be.visible')
            .click()
    }

    validacaoheaderEventoGamificacao() {
        cy.get(el.cabecalhoPrincipal)
            .should('be.visible')
            .and('contain.text', 'Eventos de Gamificação');
    }

    validandoInputs() {
        cy.get(el.inputPrincipal)
            .should('be.visible');

        cy.wait(500);

        cy.xpath(el.inputSecundario)
            .should('be.visible');

        cy.wait(500);

        cy.xpath(el.inputTerciario)
            .should('be.visible');

        cy.wait(500);
    }

    validandoBtns() {
        cy.contains(el.btnAdicionar)
            .should('be.visible');

        cy.wait(500);

        cy.contains(el.btnFiltrar)
            .should('be.visible');

        cy.wait(500);
    }

    clickbtnAdicionar() {
        cy.contains(el.btnAdicionar)
            .should('be.visible')
            .click();

        cy.wait(500);
    }

    validarModalAdicionarEventos() {
        // Validando Modal Adicionar Evento de Gamificação
        cy.get(el.modalEventos)
            .should('be.visible')
            .and('contain.text', 'Adicionar Evento de Gamificação');

        cy.wait(200)

        cy.xpath(el.primeiroSelect)
            .should('be.visible')

        cy.wait(200)

        cy.xpath(el.primeiroInputModal)
            .should('be.visible')

        cy.wait(200)

        cy.xpath(el.segundoInputModal)
            .should('be.visible');

        cy.wait(200)

        cy.xpath(el.terceitoInputModal)
            .should('be.visible');

        cy.wait(200)

        cy.xpath(el.quartoInputModal)
            .should('be.visible');

        cy.wait(200)

        cy.xpath('//*[@id="player_desc"]')
            .should('be.visible');

        cy.wait(200)
    }

    selectEventoGamificacao(opcao) {
        cy.xpath(el.primeiroSelect)
            .should('be.visible')
            .click();

        cy.wait(500);

        cy.xpath(`//div/div/div[1]/ul/li/span[text() = '${opcao}']`)
            .should('be.visible')
            .click();

        cy.wait(500);
    }

    inserirDados(opcao) {

        if (opcao === 'Saldo Real' || opcao === 'Saldo Bônus' || opcao === 'Remoção de Saldo Real' ) {
            cy.xpath(el.primeiroInputModal)
                .type('1000');

            cy.wait(500);

            cy.xpath('//*[@id="player_desc"]')
                .type('Teste Automatizado(Evento de Gamificação)');

            cy.wait(500);

        } else if(opcao === 'Saldo Cashback') {

            cy.xpath(el.primeiroInputModal)
                .type('500');

            cy.wait(500);

            cy.xpath(el.segundoInputModal)
                .click();

            cy.wait(500);

            cy.xpath('//*[@id="player_desc"]')
                .type('Teste Automatizado(Evento de Gamificação)');

        } else if(opcao === 'Freespins '|| opcao === 'Freechips') {
    
            cy.xpath(el.primeiroInputModal)
                .type('50');

            cy.wait(500);

            cy.xpath(el.segundoInputModal)
                .click();

            cy.wait(500);

            cy.xpath(el.terceitoInputModal)
                .click();

            cy.wait(500);

            cy.xpath(el.quartoInputModal)
                .click()
                .type('100');

            cy.wait(500);

            cy.xpath('//*[@id="player_desc"]')
                .click()
                .type('Teste Automatizado(Evento de Gamificação)');

        } else if(opcao === 'Freebets'){
            cy.xpath(el.primeiroInputModal)
                .should('be.visible')
                .type(1000)

            cy.wait(500)

            cy.xpath(el.segundoInputModal)
                .should('be.visible')
                
            cy.wait(500)

            cy.xpath('//*[@id="modal_add_google_scroll"]/div/div[4]/div[2]/input')
                .should('be.visible')
                .type(100)

            cy.wait(500)

            cy.xpath(el.quartoInputModal)
                .should('be.visible')
                .type('15')

            cy.wait(500)

            cy.xpath('//*[@id="player_desc"]')
                .click()
                .type('Teste Automatizado(Evento de Gamificação)');

        }

        cy.xpath('//*[@id="kt_account_profile_details_submit"]')
            .should('be.visible')
            .click();

        cy.get('.swal2-popup')
            .should('be.visible')

        cy.wait(500)

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click()

    }

    validandoEditar(){
        cy.wait(500);

        // Clica no botão de editar o primeiro registro
        cy.xpath('//*[@id="kt_app_content_container"]//table/tbody/tr[1]/td[9]//div/button[1]')
            .should('be.visible')
            .click();

        cy.wait(500);

        // Verifica se abriu o modal de edição
        cy.get('#modal_add_google_header')
            .should('be.visible')
            .and('contain.text', 'Editar');

        cy.wait(500);

        // Edita a descrição do player
        cy.get('[name="player_desc"]')
            .should('be.visible')
            .clear()
            .type('Teste Editar - Automação');

        cy.wait(500);

        // Clica em salvar
        cy.get('#kt_account_profile_details_submit')
            .should('be.visible')
            .click();

        // Confirma o swal de confirmação
        cy.get('.swal2-popup')
            .should('be.visible')
            .and('contain.text', 'Tem certeza que deseja enviar?');

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();

        // Aguarda atualização (ajuste conforme performance do sistema)
        cy.wait(3000);
    }

    validandoEdicao(){
        // Reabre o mesmo registro para verificar se o texto foi salvo
        cy.xpath('//*[@id="kt_app_content_container"]//table/tbody/tr[1]/td[9]//div/button[1]')
            .should('be.visible')
            .click();

        cy.wait(500)

        // Valida se o campo foi realmente atualizado
        cy.get('#player_desc')
            .should('be.visible')
            .invoke('val')
            .then((valor) => {
                expect(valor).to.contain('Teste Editar - Automação');
            });

        cy.wait(500)

        cy.get('.btn-light')
            .should('be.visible')
            .click()

        cy.wait(500)

        cy.get('.swal2-popup')
            .should('be.visible')
            .and('contain.text','Tem certeza que deseja cancelar?')

        cy.wait(500)

        cy.get('.swal2-confirm')
            .should('be.visible')
    }

}
export default new EventoGamificacao(); 