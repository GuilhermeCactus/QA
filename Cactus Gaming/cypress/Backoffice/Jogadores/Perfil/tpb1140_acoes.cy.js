describe('TEST 01 - Jogadores - Perfil', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
      });
    });

    it('Validar - Whatsapp', () => {
      cy.Navegacao_Jogadores_Perfil();

      cy.url().should('contain', 'profile/Player');

      cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
      .should('be.visible')
      .type('4');

      cy.wait(750);

      cy.xpath('//*[@id="filter_form"]/div/div[3]/button')
      .should('be.visible')
      .click();

      cy.wait(750);

      cy.get('.card-body [name="user_name"]')
        .invoke('val')
        .then((nomeUsuario) => {

          cy.get('.card-body [name="user_phone"]')
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
            cy.get('[title="Enviar mensagem"]')
              .should('be.visible')
              .click();

            cy.wait(1000);

            cy.xpath('//*[@id="swal2-html-container"]/strong')
              .should('be.visible')
              .should('contain', nomeUsuario);

            cy.wait(750);

            // Normalizando espaços e hífens para evitar erro de formatação
            const limpar = (texto) => texto.replace(/\D/g, '');

            cy.xpath('//*[@id="swal2-html-container"]/span')
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
    });
});


describe('TEST 02 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Analise', () => {
      cy.Navegacao_Jogadores_Perfil();

      cy.url().should('contain', 'profile/Player');

      cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
        .should('be.visible')
        .type('4');

      cy.wait(750);

      cy.xpath('//*[@id="filter_form"]/div/div[3]/button')
        .should('be.visible')
        .click();

      cy.wait(750);

      cy.xpath('//*[@id="kt_app_content_container"]//a[@title="Análise"]')
        .should('be.visible')
        .click()

    });
});

describe('TEST 03 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Editar usuario', () => {
        cy.Navegacao_Jogadores_Perfil();

        cy.url().should('contain', 'profile/Player');

        // Selecionando por ID 
        cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
          .should('be.visible')
          .type('4');

        cy.wait(750);

        // Btn buscar
        cy.xpath('//*[@id="filter_form"]/div/div[3]/button')
          .should('be.visible')
          .click();

        // Elemento 'Editar usuario'
        cy.xpath('//*[@id="kt_app_content_container"]//button[@title="Editar usuário"]')
            .should('be.visible')
            .click()

        // Modal esta presente
        cy.xpath('//*[@id="modal_add_user_player"]/div/div')
            .should('be.visible')

        cy.wait(1000)

        // Editando nome do usuario
        cy.get(':nth-child(1) > .col-12 > .form-control')
          .clear()
          .type('Apostador da Silva 1 - QA')

        cy.wait(1000)

        // Editando email do usuario
        cy.get(':nth-child(2) > .col-12 > .form-control')
          .clear()
          .type('player@email.com')

        cy.wait(1000)

        // Btn 'Editar'
        cy.get('#kt_account_profile_details_submit')
          .click()

        cy.wait(1000)

        cy.get('.swal2-popup')
          .invoke('text')
          .then((text) => {
            expect(text).to.contain('Tem certeza que deseja enviar?')
          })

        cy.get('.swal2-confirm')
          .click()

        // ----------------------------------------------------------------------
        cy.wait(4000)

        // Elemento 'Editar usuario'
        cy.xpath('//*[@id="kt_app_content_container"]//button[@title="Editar usuário"]')
            .should('be.visible')
            .click()

        // Modal esta presente
        cy.xpath('//*[@id="modal_add_user_player"]/div/div')
            .should('be.visible')

        cy.wait(1000)

        // Editando nome do usuário
        cy.get(':nth-child(1) > .col-12 > .form-control')
          .should('have.value', 'Apostador da Silva 1 - QA') // Confirma que o valor atual é o esperado
          .clear()
          .type('Apostador da Silva 1')
          .should('have.value', 'Apostador da Silva 1'); // Valida que o novo valor foi inserido

        cy.wait(1000)

        // Btn 'Editar'
        cy.get('#kt_account_profile_details_submit')
          .click()

        cy.wait(1000)

        cy.get('.swal2-popup')
          .invoke('text')
          .then((text) => {
            expect(text).to.contain('Tem certeza que deseja enviar?')
          })

        cy.get('.swal2-confirm')
          .click()
    });
});

describe('TEST 04 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    // Erro
    Cypress.on('uncaught:exception', (err) => {
        if (err.message === 'undefined' || err.message.includes('An unknown error has occurred')) {Cl
            return false; // ignora esse erro específico
        }
    });

    it('Validar - Observações usuario', () => {
      cy.Navegacao_Jogadores_Perfil();

      cy.url().should('contain', 'profile/Player');

      cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
        .should('be.visible')
        .type('4');

      cy.wait(750);

      cy.xpath('//*[@id="filter_form"]/div/div[3]/button')
        .should('be.visible')
        .click();

      cy.wait(750);

              cy.get('[title="Observação do usuário"]')
            .should('be.visible')
            .click()

      cy.wait(750)

      cy.xpath('//div[@class="modal-content"]/div[@class="modal-header flex"]')
          .should('be.visible')

      cy.wait(750)

      cy.xpath('//div/div/div[2]/form/div/textarea')
          .clear()
          .type("[QA-01]TPB-1099 - Observação do usuário - Fluxo de sucesso.[QA-02]TPB-1099 - Observação do usuário - Recuperar a Observação do usuário.[QA-03]TPB-1099 - Observação do usuário - Teste automatizado.")

      cy.wait(750)

      cy.get('.modal-content > .modal-footer > .btn-primary')
          .click()

      cy.wait(1000)

      cy.get('.swal2-confirm')
          .should('be.visible')
          .click()

      cy.wait(750)

      cy.xpath('//*[@id="swal2-html-container"]')
      .invoke('text')
      .then((text_card) => {
          expect(text_card).to.include('Observações do usuário salvas com sucesso!');
      })

      cy.wait(1000)

      cy.get('.swal2-confirm')
          .should('be.visible')
          .click()

      cy.wait(1000) 

      cy.get('[title="Observação do usuário"]')
          .should('be.visible')
          .click()

      cy.wait(750)

      cy.xpath('//div[@class="modal-content"]/div[@class="modal-header flex"]')
          .should('be.visible')

      cy.wait(750)

      cy.get('textarea[name="operator_observation"]')
          .invoke('val')
          .then((text) => {
              cy.log('Texto do textarea:', text);

              // Você pode fazer asserções aqui, por exemplo:
              expect(text).to.equal('[QA-01]TPB-1099 - Observação do usuário - Fluxo de sucesso.[QA-02]TPB-1099 - Observação do usuário - Recuperar a Observação do usuário.[QA-03]TPB-1099 - Observação do usuário - Teste automatizado.');
          });


    });
});

describe('TEST 05 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Bloquear', () => {
      cy.Navegacao_Jogadores_Perfil();

      cy.url().should('contain', 'profile/Player');

      cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
        .should('be.visible')
        .type('4');

      cy.wait(750);

      cy.xpath('//*[@id="filter_form"]/div/div[3]/button')
        .should('be.visible')
        .click();

      cy.wait(750);

      cy.get('[title="Bloquear usuário"]')
        .should('be.visible')
        .click()

      cy.wait(750);

      cy.get('.swal2-confirm')
        .should('be.visible')
        .click()

      cy.wait(4000);

      cy.get('.swal2-popup')
        //.invoke('text')
        .should('be.visible')
        //.then((text_pop) => {
        //    expect(text_pop).to.include('Usuário bloqueado com sucesso!');
        //})

      cy.get('.swal2-confirm')
        .click()

      cy.wait(2000);

      // Espera o botão de desbloquear aparecer (só se for necessário validar)
      cy.get('[title="Desbloquear usuário"]')
        .should('be.visible')
        .click();

      cy.wait(2000)

      cy.get('.swal2-confirm')
        .click()

      cy.wait(2000)

      cy.get('.swal2-confirm')
        .click()
    });
});

describe('TEST 06 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Bloquear Saque', () => {
      cy.Navegacao_Jogadores_Perfil();

      cy.url().should('contain', 'profile/Player');

      cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
        .should('be.visible')
        .type('4');

      cy.wait(750);

      cy.xpath('//*[@id="filter_form"]/div/div[3]/button')
        .should('be.visible')
        .click();

      cy.wait(750);

      cy.get('[title="Bloquear saque"]')
        .should('be.visible')
        .click()

      cy.wait(750);

      cy.get('.swal2-confirm')
        .should('be.visible')
        .click()

      cy.wait(4000);

      cy.get('.swal2-popup')
        //.invoke('text')
        .should('be.visible')
        //.then((text_pop) => {
        //    expect(text_pop).to.include('Usuário bloqueado com sucesso!');
        //})

      cy.get('.swal2-confirm')
        .click()

      cy.wait(2000);

      // Espera o botão de desbloquear aparecer (só se for necessário validar)
      cy.get('[title="Desbloquear saque"]')
        .should('be.visible')
        .click();

      cy.wait(2000)

      cy.get('.swal2-confirm')
        .click()

      cy.wait(2000)

      cy.get('.swal2-confirm')
        .click()
    });
});


describe('TEST 07 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Auto exclusão', () => {
      cy.Navegacao_Jogadores_Perfil();

      cy.url().should('contain', 'profile/Player');

      cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
        .should('be.visible')
        .type('4');

      cy.wait(750);

      cy.xpath('//*[@id="filter_form"]/div/div[3]/button')
        .should('be.visible')
        .click();

      cy.wait(750);

      cy.get('.mt-4 > :nth-child(1) > .btn')
        .should('be.visible')
        .click()

      cy.wait(1000);

      cy.xpath('//*[@id="notes"]')
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

      cy.get('.swal2-confirm')
        .click()

      cy.wait(2000)

      cy.get('.swal2-confirm')
        .click()

      cy.wait(1000)

      cy.contains('Retirar Auto exclusão')
        .should('be.visible')
        .click()

      cy.wait(1000)

      cy.get('.swal2-confirm')
        .click()

      cy.wait(1000)

      cy.get('.swal2-popup')
        .should('be.visible')
        .invoke('text')
        .then((text_pop) => {
          expect(text_pop).to.include('Auto exclusão retirada com sucesso!')
        })
      
      cy.wait(1000)

      cy.get('.swal2-confirm')
        .click()
    });
});

describe('TEST 08 - Jogadores - Perfil', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
        const usuario = usuarios.usuarioValido;
        cy.login(usuario.email, usuario.senha);
        });
    });

    it('Validar - Exclusão judicial', () => {
      cy.Navegacao_Jogadores_Perfil();

      cy.url().should('contain', 'profile/Player');

      cy.xpath('//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]')
        .should('be.visible')
        .type('4');

      cy.wait(750);

      cy.xpath('//*[@id="filter_form"]/div/div[3]/button')
        .should('be.visible')
        .click();

      cy.wait(750);

      cy.get('.mt-4 > :nth-child(1) > .btn')
        .should('be.visible')
        .click()

      cy.wait(1000);

      cy.xpath('//*[@id="notes"]')
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

      cy.get('.swal2-confirm')
        .click()

      cy.wait(2000)

      cy.get('.swal2-confirm')
        .click()

      cy.wait(1000)

      cy.contains('Retirar Auto exclusão')
        .should('be.visible')
        .click()

      cy.wait(1000)

      cy.get('.swal2-confirm')
        .click()

      cy.wait(1000)

      cy.get('.swal2-popup')
        .should('be.visible')
        .invoke('text')
        .then((text_pop) => {
          expect(text_pop).to.include('Auto exclusão retirada com sucesso!')
        })
      
      cy.wait(1000)

      cy.get('.swal2-confirm')
        .click()
    });
});