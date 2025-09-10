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

        cy.wait(750)
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

    validandoFuncWhatsApp(){

        cy.wait(750)

        cy.get(el.retornoNomeUser)
        .invoke('val')
        .then((nomeUsuario) => {

          cy.get(el.retornoTel)
            .invoke('val')
            .then((telefoneUsuario) => {

                cy.log('Nome:', nomeUsuario);
                cy.log('Telefone:', telefoneUsuario);

                // Bloquear window.open para links whatsapp
                cy.window().then((win) => {
                    const originalOpen = win.open.bind(win);
                    cy.stub(win, 'open').callsFake((url, ...args) => {
                    if (url && url.startsWith('whatsapp://')) {
                        cy.log('🔒 Bloqueado window.open para:', url);
                    return null; // bloqueia abertura
                    }
                    return originalOpen(url, ...args);
                });
            });

            // Btn enviar msg whats
            cy.get(el.btnEnviarWhats)
                .should('be.visible')
                .click();

            cy.wait(1000);

            cy.xpath(el.divValidacaoModalWhats)
                .should('be.visible')
                .should('contain', nomeUsuario);

            cy.wait(750);

            // Normalizando espaços e hífens para evitar erro de formatação
            const limpar = (texto) => texto.replace(/\D/g, '');

            cy.xpath(el.divValidacaoModalWhatsGeral)
                .should('be.visible')
                .invoke('text')
                .then((textoSpan) => {
                    const telEsperado = limpar(telefoneUsuario);
                    const telExibido = limpar(textoSpan);
                    expect(telExibido).to.include(telEsperado);
                });

            cy.wait(750);

            //cy.get('.swal2-confirm')
            //  .should('be.visible')
            //  .click()
            //  .then(() => {
            //    cy.log('✅ Clique executado, redirecionamento whatsapp bloqueado.');
            //    Cypress.stop(); // encerra o teste após clique
            //});
            });
        });
    }

    validarBtnAnalise(){
        cy.wait(750);

        cy.xpath(el.btnAnalise)
          .should('be.visible')
          .click()
    }

    validarBtnEditar(){
        // Elemento 'Editar usuario'
        cy.xpath(el.inputID)
            .should('be.visible')
            .click()

        // Modal esta presente
        cy.xpath(el.modalEditar)
            .should('be.visible')

        cy.wait(1000)
    }

    validarBtnObservacao(){
        cy.get(el.btnObservacao)
            .should('be.visible')
            .click()

        cy.wait(750)

        cy.xpath(el.modalObservacao)
            .should('be.visible')

        cy.wait(750)
    }

    clickSim(){
        cy.get(el.btnSim)
            .should('be.visible')
            .click()
    }

    validarFuncBloqueio(){
        cy.get(el.btnBloqueiar)
            .should('be.visible')
            .click()

        cy.wait(750);

        this.clickSim()

        cy.wait(4000);

        cy.get('.swal2-popup')
            .invoke('text')
            .should('be.visible')
            .then((text_pop) => {
                expect(text_pop).to.include('Usuário bloqueado com sucesso!');
            })

        
        this.clickSim()

        cy.wait(2000);
    }

    validarFuncBloquearSaque(){
        cy.get(el.btnBloqueioSaque)
            .should('be.visible')
            .click()

        cy.wait(750);

        this.clickSim()

        cy.wait(4000);

        cy.get('.swal2-popup')
            .invoke('text')
            .should('be.visible')
            .then((text_pop) => {
                expect(text_pop).to.include('Usuário bloqueado com sucesso!');
        })

        this.clickSim()

        cy.wait(2000);
    }

    validarFuncAutoExclusao(){
        cy.get(el.btnAutoExclusao)
            .should('be.visible')
            .click()

        cy.wait(1000);

        cy.xpath(el.modalNotas)
            .eq(0)
            .should('be.visible')
            .type('Teste - QA ')

        cy.wait(4000);

        cy.contains('Salvar')
            .click()

        cy.wait(2000);

        // Espera o botão de desbloquear aparecer (só se for necessário validar)
        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
            expect(text).to.include('Tem certeza que deseja aplicar a auto exclusão para este usuário?')
            })

        cy.wait(2000)

        this.clickSim()

        cy.wait(2000)

        this.clickSim()

        cy.wait(1000)
    }

    validarAutoExclusao(){
        cy.contains('Retirar Auto exclusão')
            .should('be.visible')
            .click()

        cy.wait(1000)

        this.clickSim()

        cy.wait(1000)

        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((text_pop) => {
            expect(text_pop).to.include('Auto exclusão retirada com sucesso!')
            })
        
        cy.wait(1000)

        this.clickSim()
    }

    validarRetirarAutoExclusao(){
        cy.wait(1000)

        cy.contains('Retirar Auto exclusão')
            .should('be.visible')
            .click()

        cy.wait(1000)

        this.clickSim()

        cy.wait(1000)

        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((text_pop) => {
            expect(text_pop).to.include('Auto exclusão retirada com sucesso!')
            })
        
        cy.wait(1000)

        this.clickSim()
    }

    validarBloqueado(){
        // Espera o botão de desbloquear aparecer (só se for necessário validar)
        cy.get('[title="Desbloquear usuário"]')
            .should('be.visible')
            .click();

        cy.wait(2000)

        this.clickSim()

        cy.wait(2000)

        this.clickSim()
    }

    validarBloqueadoSaque(){
        // Espera o botão de desbloquear aparecer (só se for necessário validar)
        cy.get('[title="Desbloquear saque"]')
            .should('be.visible')
            .click();

        cy.wait(2000)

        this.clickSim()

        cy.wait(2000)

        this.clickSim()
    }

    editarDadosUsuarios(){
        // Editando nome do usuario
        cy.get(el.inputNomeUsuario)
          .clear()
          .type('Apostador da Silva 1 - QA')

        cy.wait(1000)

        // Editando email do usuario
        cy.get(el.inputEmail)
          .clear()
          .type('player@email.com')

        cy.wait(1000)

        this.validandoModalSucesso()
    }

    editarObservacao(){
        cy.xpath('//div/div/div[2]/form/div/textarea')
            .clear()
            .type("[QA-01]TPB-1099 - Observação do usuário - Fluxo de sucesso.[QA-02]TPB-1099 - Observação do usuário - Recuperar a Observação do usuário.[QA-03]TPB-1099 - Observação do usuário - Teste automatizado.")

        cy.wait(750)

        this.clickBtnConfirmar()

        cy.wait(1000)

        this.confirmandoClick()

        cy.wait(750)
    }

    validarDadosEditado(){
        // Editando nome do usuário
        cy.get(el.inputNomeUsuario)
          .should('have.value', 'Apostador da Silva 1 - QA') // Confirma que o valor atual é o esperado
          .clear()
          .type('Apostador da Silva 1')
          .should('have.value', 'Apostador da Silva 1'); // Valida que o novo valor foi inserido

        cy.wait(1000)
    }

    clickBtnEdicao(){
        cy.get(el.btnEdicao)
          .click()

        cy.wait(1000)
    }

    modalConfirmacao(){
        cy.get('.swal2-popup')
          .invoke('text')
          .then((text) => {
            expect(text).to.contain('Tem certeza que deseja enviar?')
          })

        cy.get('.swal2-confirm')
          .click()
    }
    
}

export default new Perfil