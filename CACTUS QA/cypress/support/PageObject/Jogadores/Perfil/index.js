import {elements as el} from "./elements";

class Perfil {

    validarURL(){
        cy.wait(500)
        cy.url().should('contain','profile/Player')
    }

    inputBuscaID(){
        cy.wait(500)

        cy.xpath(el.inputID)
            .should('be.visible')
            .type('4')

    }

    clickBtnBuscar(){
        cy.wait(500)

        cy.xpath(el.btnBuscar)
            .should('be.visible')
            .click()
    }

    validarObservacaoUsuario(){
        cy.wait(500)

        cy.get('[title="Observação do usuário"]')
            .should('be.visible')
            .click()

        cy.wait(500)

        cy.xpath(el.modalObservacao)
            .should('be.visible')
    }

    inserindoObservacao(){
        cy.wait(500) 

        cy.xpath(el.textArea)
            .clear()
            .type("[QA-01]TPB-1099 - Observação do usuário - Fluxo de sucesso.[QA-02]TPB-1099 - Observação do usuário - Recuperar a Observação do usuário.[QA-03]TPB-1099 - Observação do usuário - Teste automatizado.")

    }

    clickBtnConfirmar(){
        cy.wait(500)

        cy.get(el.btnConfirmar)
            .should('be.visible')
            .click()

        cy.wait(1000)
    }

    confirmandoClick(){
        cy.wait(500)

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click()
    }

    validandoModalSucesso(){
        cy.wait(500)

        cy.xpath(el.modalContainer)
            .invoke('text')
            .then((text_card) => {
                expect(text_card).to.include('Observações do usuário salvas com sucesso!');
            })

        cy.wait(1000)

        this.confirmandoClick()
    }

    validandoObservacaoInserida(){
        cy.xpath(el.modalObservacao)
            .should('be.visible')

        cy.wait(750)

        cy.get(el.divValidacaoModal)
            .invoke('val')
            .then((text) => {
                cy.log('Texto do textarea:', text);

                // Você pode fazer asserções aqui, por exemplo:
                expect(text).to.equal('[QA-01]TPB-1099 - Observação do usuário - Fluxo de sucesso.[QA-02]TPB-1099 - Observação do usuário - Recuperar a Observação do usuário.[QA-03]TPB-1099 - Observação do usuário - Teste automatizado.');
            });
    }
    
}

export default new Perfil