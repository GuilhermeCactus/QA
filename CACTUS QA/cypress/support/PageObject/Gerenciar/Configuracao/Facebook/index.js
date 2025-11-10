import {elements as el} from "./elements";

class Facebook {

    navFacebookLink(){
        cy.wait(1000);

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.get('#kt_app_sidebar_menu_wrapper')
        .scrollTo('bottom', { ensureScrollable: false, duration: 300 });

        // Clica no link pai do span "Performance"
        cy.xpath(el.sideBarFcebook)
        .scrollIntoView()
        .should('be.visible')
        .click();
    }

    validandoURL(){
        cy.wait(750)
        cy.url().should('contain', el.urlValidacao);
        cy.wait(750)
    }

    validandoColunasTabela(){
        const colunar_validador = ['ID','Nome do afiliado','E-mail do afiliado','ID do pixel','Observação','Ações']

        cy.wait(1000)

        cy.get('.card-body')
        .should('be.visible')
        .then(() => {
            cy.xpath('//*[@id="kt_app_content_container"]//table/thead/tr/th')
            .each(($coluna, index) => {
                cy.wrap($coluna)
                .invoke('text')
                .then((textoColuna) => {
                    const textoFormatado = textoColuna.trim();
                    expect(textoFormatado).to.equal(colunar_validador[index]);
                });
            });
        });

        cy.wait(750)

    }

    validandoBtnAdicionar(){
        cy.xpath(el.btnAdicionar)
        .should('be.visible')
        .invoke('text')
        .then((btnAdicionarText) => {
            expect(btnAdicionarText).to.contain('Adicionar');
            cy.wait(500)
        })

        cy.xpath(el.btnAdicionar)
        .click();

        cy.wait(500)

        cy.get('.modal-body')
        .should('be.visible')
    }

    validandoCadastro(){
        // Validando nome do modal
        cy.xpath(el.modalModal)
        .should('be.visible')
        .invoke('text')
        .then((textModal) => {
            expect(textModal).contain('Cadastrar Pixel')
        })

        // Validando Primeiro input
        cy.xpath(el.inputIDfiliado)
        .should('be.visible')
        .invoke('text')
        .then((primeiroInput) => {
            expect(primeiroInput).contain('ID do afiliado')
        })

        // Validando segundo input
        cy.xpath(el.inputNome)
        .should('be.visible')
        .invoke('text')
        .then((segundoInput) => {
            expect(segundoInput).contain('Nome do afiliado')
        })

        // Validando terceiro input
        cy.xpath(el.inputEmail)
        .should('be.visible')
        .invoke('text')
        .then((teceiroInput) => {
            expect(teceiroInput).contain('E-mail do afiliado')
        })

        // Validando quarto input
        cy.xpath(el.inputObservacao)
        .should('be.visible')
        .invoke('text')
        .then((quartoInput) => {
            expect(quartoInput).contain('Observação')
        })

        // Validando quinto input
        cy.xpath(el.inputID)
        .should('be.visible')
        .invoke('text')
        .then((quintoInput) => {
            expect(quintoInput).contain('ID do pixel')
        })
    }
}

export default new Facebook()