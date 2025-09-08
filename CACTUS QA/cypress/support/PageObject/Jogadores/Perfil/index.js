import { expect } from "chai";
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

    selecionandoPesquisaPor($opc){
        // Abrir o dropdown
        cy.get(el.selectFiltraPor)
            .should('be.visible')
            .click();

        cy.wait(500);

        // Garantir que a lista apareceu e clicar na opção correta dentro do dropdown
        cy.xpath(el.dropdownFiltraPor)
            .contains($opc)
            .should('be.visible')
            .click();

        cy.wait(500);
    }

    inserindoInput($opc){
        
            let $var 

            if ($opc == 'ID'){
                $var = 4
            } else if ($opc == 'email') {
                $var = 'player@email.com'
            } else {
                $var = '035.285.570-36'
            }

            cy.xpath(el.inputID)
                .should('be.visible')
                .type(`${$var}`)

            cy.wait(500);

            cy.xpath(el.inputID)
                .invoke('text')
                .then(($text) => {
                    expect($text).eq('4')
                })

            cy.xpath(el.btnBuscar)
                .should('be.visible')
                .click()

            cy.wait(500);
    }

    validandoBuscarOutro(){
        cy.contains(el.btnbuscarOutro)
            .should('be.visible')
            .click()

        cy.wait(750)

        cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
            .should('be.visible')
    }

    validandoIDTable(){
        cy.get(el.retornoID)
            .should('be.visible')
            .should('contain.text', '4')
    }
    
}

export default new Perfil