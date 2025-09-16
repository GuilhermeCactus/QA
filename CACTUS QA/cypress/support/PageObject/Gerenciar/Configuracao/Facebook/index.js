import {elements as el} from "./elements";

class Facebook {

    navFacebookLink(){
        cy.wait(1000);

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.get('#kt_app_sidebar_menu_wrapper')
        .scrollTo('bottom', { ensureScrollable: false, duration: 300 });

        // Clica no link pai do span "Performance"
        cy.xpath('//span[text()="Facebook Pixel"]/parent::a')
        .scrollIntoView()
        .should('be.visible')
        .click();
    }

    validandoURL(){
        cy.wait(750)
        cy.url().should('contain', 'settings/facebook');
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
        cy.xpath('//*[@id="kt_app_content_container"]/div/div[1]/button')
        .should('be.visible')
        .invoke('text')
        .then((btnAdicionarText) => {
            expect(btnAdicionarText).to.contain('Adicionar');
            cy.wait(500)
        })

        cy.xpath('//*[@id="kt_app_content_container"]/div/div[1]/button')
        .click();

        cy.wait(500)

        cy.get('.modal-body')
        .should('be.visible')
    }

    validandoCadastro(){
        
        // Validando nome do modal
        cy.xpath("//div[@class = 'modal-header flex']")
        .should('be.visible')
        .invoke('text')
        .then((textModal) => {
            expect(textModal).contain('Cadastrar Pixel')
        })

        // Validando Primeiro input
        cy.xpath('//form/div[1]/label')
        .should('be.visible')
        .invoke('text')
        .then((primeiroInput) => {
            expect(primeiroInput).contain('ID do afiliado')
        })

        // Validando segundo input
        cy.xpath('//form/div[2]/label')
        .should('be.visible')
        .invoke('text')
        .then((segundoInput) => {
            expect(segundoInput).contain('Nome do afiliado')
        })

        // Validando terceiro input
        cy.xpath('//form/div[3]/label')
        .should('be.visible')
        .invoke('text')
        .then((teceiroInput) => {
            expect(teceiroInput).contain('E-mail do afiliado')
        })

        // Validando quarto input
        cy.xpath('//form/div[4]/label')
        .should('be.visible')
        .invoke('text')
        .then((quartoInput) => {
            expect(quartoInput).contain('Observação')
        })

        // Validando quinto input
        cy.xpath('//form/div[5]/label')
        .should('be.visible')
        .invoke('text')
        .then((quintoInput) => {
            expect(quintoInput).contain('ID do pixel')
        })
    }
}

export default new Facebook()