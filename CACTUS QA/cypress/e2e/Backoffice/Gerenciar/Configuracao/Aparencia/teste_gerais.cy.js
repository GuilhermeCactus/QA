import Aparencia from '../../../../../support/PageObject/Gerenciar/Configuracao/Aparencia';

describe('Teste Gerais - Configuração de Aparência', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });

        cy.Navegacao_Configuracao();

        Aparencia.navegarAparencia()

        cy.wait(2000);
    });

    // Opções disponíveis no filtro
    const opcoesFiltro = ['Aparência','E-mails','Termos legais'];


    opcoesFiltro.forEach((opcaoSelecionada) => {
        it(`[CASE - 01] Validando pagina : ${opcaoSelecionada}`, () => {

            cy.xpath(`//*[@id="kt_app_content_container"]/div//ul/li//a[text() = "${opcaoSelecionada}"]`)
                .should('be.visible')
                .click();

            cy.wait(1000);

            if (opcaoSelecionada === 'Aparência') {

                cy.get('[name="facebook"]')
                    .should('be.visible')
                    .clear()
                    .type('facebook.com/testQA');

                cy.wait(500);

                cy.get('[name="twitter"]')
                    .should('be.visible')
                    .clear()
                    .type('twitter.com/testQA');

                cy.wait(500);
                
                cy.get('[name="instagram"]')
                    .should('be.visible')
                    .clear()
                    .type('instagram.com/testQA');

                cy.wait(500);

                cy.get('[name="youtube"]')
                    .should('be.visible')
                    .clear()
                    .type('youtube.com/testQA');
                    
                cy.wait(500);

                cy.get('[name="tiktok"]')
                    .should('be.visible')
                    .clear()
                    .type('tiktok.com/testQA');

                cy.wait(500);

                cy.get('[name="telegram"]')
                    .should('be.visible')
                    .clear()
                    .type('telegram.com/testQA');

                cy.wait(500);

                // Codigo CSS
                cy.get('[name="css_code"]')
                    .should('be.visible')
                    .clear()
                    .type('TesteQA ');

                cy.wait(500);

                cy.get('#kt_account_profile_details_submit')
                    .should('be.visible')
                    .click();

                cy.wait(2000);

                cy.get('.swal2-popup')
                    .should('be.visible')
                    .invoke('text')
                    .then((msg) => {
                        msg = msg.replace(/×\n|\n|OK/g, '').trim();
                        expect(msg).to.contains('Tem certeza que deseja salvar?');
                    });

            } else if (opcaoSelecionada === 'E-mails') {

                // Validando pagina 
                cy.get('.page-heading')
                    .should('be.visible')
                    .invoke('text')
                    .then((titulo) => {
                        expect(titulo.trim()).to.eq('Aparência');
                    });

                cy.get('[name="SUPPORT_EMAIL"]')
                    .should('be.visible')
                    .clear()
                    .type('suporte@testeqa.com');
                    
                cy.wait(500);   

                cy.get('[name="LEGAL_EMAIL"]')
                    .should('be.visible')
                    .clear()
                    .type('suporte2@qateste.com')

                cy.wait(500);

                cy.get('[name="PARTNER_EMAIL"]')
                    .should('be.visible')
                    .clear()
                    .type('parceiros@qateste.com');

                cy.wait(500);

                cy.xpath('//*[@id="tab_emails"]//form/div[2]/button')
                    .should('be.visible')
                    .click();

                cy.wait(2000);
                
                cy.get('.swal2-popup')
                    .should('be.visible')
                    .invoke('text')
                    .then((msg) => {
                        msg = msg.replace(/×\n|\n|OK/g, '').trim();
                        expect(msg).to.contains('Aparência atualizada com sucesso!');
                    });

                cy.get('.swal2-confirm')
                    .should('be.visible')
                    .click();

            } else if (opcaoSelecionada === 'Termos legais') {

                cy.contains('Adicionar')
                    .should('be.visible')
                    .click();
                    
                cy.wait(1000);  

                cy.get('#modal_legal_term_header')
                    .should('be.visible')
                    .invoke('text')
                    .then((tituloModal) => {
                        expect(tituloModal.trim()).to.contains('Cadastro de termos legais');
                    });

                cy.wait(500);

                cy.get('[name="title"]')
                    .should('be.visible')
                    .type('Termos de teste QA');

                cy.wait(500);

                cy.get('.el-select__wrapper')
                    .should('be.visible')
                    .click();

                cy.wait(500);

                cy.contains('Termos & Condições')
                    .should('be.visible')
                    .click();

                cy.wait(500);

                cy.get('.ql-editor')
                    .should('be.visible')
                    .type('Estes são os termos de teste QA.');

                cy.wait(500);

                cy.get('.modal-footer > .btn-primary')
                    .should('be.visible')
                    .click();
                    
                cy.wait(2000);  

                cy.get('.swal2-popup')
                .should('be.visible')
                .invoke('text')
                .then((msg) => {
                    msg = msg.replace(/×\n|\n|OK/g, '').trim();
                    expect(msg).to.contain('Termo legal inserido com sucesso!');
                });

                cy.get('.swal2-confirm')
                    .should('be.visible')
                    .click();
            }

            cy.wait(1000);
        });
    });

    it(`[CASE - 02] Validando acoes no Termo de Uso`, () => {

        cy.xpath(`//*[@id="kt_app_content_container"]/div//ul/li//a[text() = "Termos legais"]`)
            .should('be.visible')
            .click();

        cy.wait(1000);

        // Editar o termo de uso criado
        cy.get('.btn-light-success')
            .should('be.visible')
            .click();

        cy.wait(1000);

        cy.get('#modal_legal_term_header')
            .should('be.visible')
            .invoke('text')
            .then((tituloModal) => {
                expect(tituloModal.trim()).to.contains('Edição de termos legais');
            });

        cy.wait(500);

        cy.get('.modal-footer > .btn-primary')
            .should('be.visible')
            .click();
            
        cy.wait(2000);

        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((msg) => {
                msg = msg.replace(/×\n|\n|OK/g, '').trim();
                expect(msg).to.contains('Termo legal atualizado com sucesso!');
            });

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();

        cy.wait(1000);

        // Deletar o termo de uso criado
        cy.get('.btn-light-danger')
            .should('be.visible')
            .click();

        cy.wait(500);

        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((msg) => {
                msg = msg.replace(/×\?|Não|No|Sim/g, '').trim();
                expect(msg).to.contains('Tem certeza que deseja cancelar?');
            });

        cy.wait(500);

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();
            
        cy.wait(1000);

        cy.get('.swal2-popup')
            .should('be.visible')
            .invoke('text')
            .then((msg) => {
                msg = msg.replace(/×\n|\n|OK/g, '').trim();
                expect(msg).to.contains('Termo legal apagado com sucesso!');
            });

        cy.get('.swal2-confirm')
            .should('be.visible')
            .click();

        cy.wait(1000);


    });

});