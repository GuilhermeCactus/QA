import Banner from '../../../../support/PageObject/Gerenciar/Configuracao/Banners';

describe('Teste Banner > Geral', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('usuarios').then((usuarios) => {
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email, usuario.senha);
        });

        cy.Navegacao_Configuracao();
        
        Banner.navegarBanner()

        cy.wait(2000);
    });

    // Testes de navegação entre os banners -> [QA-001]
    it(`Teste navegação entre opções`, () => {

        Banner.navegaOpcBannersValidacao()

    });

    // Testes de navegação e criação de banner -> [QA-002]
    it(`Teste criação de banner`, () => {

        Banner.navegaOpcBannersValidacao()

        Banner.validarCriacaoBanners()

        Banner.criacaoBanner()

    });

    // Testes de pesquisa link -> testQA -> [QA-003]
    it('Teste pesquisa link : Correto ',() => {

        Banner.navegaOpcBannersValidacao()

        // Elemento input
        Banner.setandoInputLink('testQA');

        // Botão filtrar
        Banner.clickBtnFiltrar()

        const dados_tabela = [];

        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[3]//table/tbody/tr').each(($linha) => {
            const linha_dados = [];

            cy.wrap($linha).xpath('./td[3]/div/a').each(($celula) => {
                const texto = $celula.text().trim();
                linha_dados.push(texto);

                cy.log(`Texto encontrado: ${texto}`);

                linha_dados.forEach((link) => {
                    if (link && link.includes('testQA')) {
                        cy.log(`Processo criado com sucesso! -> ${link}`);
                    }
                });
            });

            if (linha_dados.length > 0) {
                throw new Error('Nenhum dado encontrado na tabela!');
            }
        });
    })

    // Testes de pesquisa link -> testQA & pais -> Brasil -> [QA-004]
    it('Teste pesquisa link e pais : Correto ',() => {

        // Elemento input
        Banner.setandoInputLink('testQA');

        // Select pais 
        Banner.clickSelectPais()

        // Seleciona o pais Brasil
        Banner.selecionandoPais('Brasil');

        // Clicando para fechar o modal de seleção de pais
        Banner.clickSelectPais()

        // Botão filtrar
        Banner.clickBtnFiltrar()

        cy.wait(2500)

        const dados_tabela = [];

        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[3]//table/tbody/tr').each(($linha) => {
            const linha_dados = [];

            cy.wrap($linha).xpath('./td[3]/div/a').each(($celula) => {
                const texto = $celula.text().trim();
                linha_dados.push(texto);

                cy.log(`Texto encontrado: ${texto}`);

                linha_dados.forEach((link) => {
                    if (link && link.includes('testQA')) {
                        cy.log(`Processo criado com sucesso! -> ${link}`);
                    }
                });
            });

            if (linha_dados.length > 0) {
                throw new Error('Nenhum dado encontrado na tabela!');
            }
        });
    })

    // Testes de pesquisa link -> TESTQA -> [QA-005]
    it('Teste pesquisa link : Letra maiuscula ',() => {

        // Elemento input
        Banner.setandoInputLink('TESTQA');

        // Select pais 
        Banner.clickSelectPais()

        // Seleciona o pais Brasil
        Banner.selecionandoPais('Brasil');

        // Clicando para fechar o modal de seleção de pais
        Banner.clickSelectPais()

        // Botão filtrar
        Banner.clickBtnFiltrar()

        cy.wait(2500)

        const dados_tabela = [];

        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[3]//table/tbody/tr').each(($linha) => {
            const linha_dados = [];

            cy.wrap($linha).xpath('./td[3]/div/a').each(($celula) => {
                const texto = $celula.text().trim();
                linha_dados.push(texto);

                cy.log(`Texto encontrado: ${texto}`);

                linha_dados.forEach((link) => {
                    if (link && link.includes('TESTQA')) {
                        cy.log(`Processo criado com sucesso! -> ${link}`);
                    }
                });
            });

            if (linha_dados.length > 0) {
                throw new Error('Nenhum dado encontrado na tabela!');
            }
        });
    })

    // Testes de pesquisa link -> TESTQA & pais -> Brasil -> [QA-006]
    it('Teste pesquisa link e pais: Letra maiuscula ',() => {

        // Elemento input
        Banner.setandoInputLink('TESTQA');

        // Select pais 
        Banner.clickSelectPais()

        // Seleciona o pais Brasil
        Banner.selecionandoPais('Brasil');

        // Clicando para fechar o modal de seleção de pais
        Banner.clickSelectPais()

        // Botão filtrar
        Banner.clickBtnFiltrar()

        cy.wait(2500)

        const dados_tabela = [];

        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[3]//table/tbody/tr').each(($linha) => {
            const linha_dados = [];

            cy.wrap($linha).xpath('./td[3]/div/a').each(($celula) => {
                const texto = $celula.text().trim();
                linha_dados.push(texto);

                cy.log(`Texto encontrado: ${texto}`);

                linha_dados.forEach((link) => {
                    if (link && link.includes('TESTQA')) {
                        cy.log(`Processo criado com sucesso! -> ${link}`);
                    }
                });
            });

            if (linha_dados.length > 0) {
                throw new Error('Nenhum dado encontrado na tabela!');
            }
        });
    })

    // Testes de pesquisa link -> testqa -> [QA-007]
    it('Teste pesquisa link : Letra minuscula ',() => {

        // Elemento input
        Banner.setandoInputLink('testqa');

        // Botão filtrar
        Banner.clickBtnFiltrar()

        cy.wait(2500)

        const dados_tabela = [];

        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[3]//table/tbody/tr').each(($linha) => {
            const linha_dados = [];

            cy.wrap($linha).xpath('./td[3]/div/a').each(($celula) => {
                const texto = $celula.text().trim();
                linha_dados.push(texto);

                cy.log(`Texto encontrado: ${texto}`);

                linha_dados.forEach((link) => {
                    if (link && link.includes('testq')) {
                        cy.log(`Processo criado com sucesso! -> ${link}`);
                    }
                });
            });

            if (linha_dados.length > 0) {
                throw new Error('Nenhum dado encontrado na tabela!');
            }
        });
    })

    // Testes de pesquisa link -> testqa & pais -> Brasil -> [QA-008]
    it('Teste pesquisa link e pais: Letra minuscula ',() => {

        // Elemento input
        Banner.setandoInputLink('testqa');

        // Select pais 
        Banner.clickSelectPais()

        // Seleciona o pais Brasil
        Banner.selecionandoPais('Brasil');

        // Clicando para fechar o modal de seleção de pais
        Banner.clickSelectPais()

        // Botão filtrar
        Banner.clickBtnFiltrar()

        cy.wait(2500)

        const dados_tabela = [];

        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[3]//table/tbody/tr').each(($linha) => {
            const linha_dados = [];

            cy.wrap($linha).xpath('./td[3]/div/a').each(($celula) => {
                const texto = $celula.text().trim();
                linha_dados.push(texto);

                cy.log(`Texto encontrado: ${texto}`);

                linha_dados.forEach((link) => {
                    if (link && link.includes('testq')) {
                        cy.log(`Processo criado com sucesso! -> ${link}`);
                    }
                });
            });

            if (linha_dados.length > 0) {
                throw new Error('Nenhum dado encontrado na tabela!');
            }
        });
    })

    // Testes de pesquisa link -> testq -> [QA-009]
    it('Teste pesquisa link : incompleto ', () => {
        // Elemento input
        Banner.setandoInputLink('testq');

        // Botão filtrar
        Banner.clickBtnFiltrar()

        cy.wait(2500)

        const dados_tabela = [];

        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[3]//table/tbody/tr').each(($linha) => {
            const linha_dados = [];

            cy.wrap($linha).xpath('./td[3]/div/a').each(($celula) => {
                const texto = $celula.text().trim();
                linha_dados.push(texto);

                cy.log(`Texto encontrado: ${texto}`);

                linha_dados.forEach((link) => {
                    if (link && link.includes('testq')) {
                        cy.log(`Processo criado com sucesso! -> ${link}`);
                    }
                });
            });

            if (linha_dados.length > 0) {
                throw new Error('Nenhum dado encontrado na tabela!');
            }
        });
    })

    // Testes de pesquisa link -> testq & pais -> Brasil -> [QA-010]
    it('Teste pesquisa link e pais : incompleto ', () => {
        // Elemento input
        Banner.setandoInputLink('testq');

        // Select pais 
        Banner.clickSelectPais()

        // Seleciona o pais Brasil
        Banner.selecionandoPais('Brasil');

        // Clicando para fechar o modal de seleção de pais
        Banner.clickSelectPais()

        // Botão filtrar
        Banner.clickBtnFiltrar()

        cy.wait(2500)

        const dados_tabela = [];

        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[3]//table/tbody/tr').each(($linha) => {
            const linha_dados = [];

            cy.wrap($linha).xpath('./td[3]/div/a').each(($celula) => {
                const texto = $celula.text().trim();
                linha_dados.push(texto);

                cy.log(`Texto encontrado: ${texto}`);

                linha_dados.forEach((link) => {
                    if (link && link.includes('testq')) {
                        cy.log(`Processo criado com sucesso! -> ${link}`);
                    }
                });
            });

            if (linha_dados.length > 0) {
                throw new Error('Nenhum dado encontrado na tabela!');
            }
        });
    })

    // Testes de pesquisa por pais -> Brasil -> [QA-011]
    it('Teste pesquisa pais : Brasil',() => {
        // Select pais 
        Banner.clickSelectPais()

        // Seleciona o pais Brasil
        Banner.selecionandoPais('Brasil');

        // Clicando para fechar o modal de seleção de pais
        Banner.clickSelectPais()

        // Botão filtrar
        Banner.clickBtnFiltrar()

        cy.wait(2500)

        const dados_tabela = [];

        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[3]//table/tbody/tr').each(($linha) => {
            const linha_dados = [];

            cy.wrap($linha).xpath('./td[3]/div/a').each(($celula) => {
                const texto = $celula.text().trim();
                linha_dados.push(texto);

                cy.log(`Texto encontrado: ${texto}`);

                linha_dados.forEach((link) => {
                    if (link && link.includes('testq')) {
                        cy.log(`Processo criado com sucesso! -> ${link}`);
                    }
                });
            });

            if (linha_dados.length > 0) {
                throw new Error('Nenhum dado encontrado na tabela!');
            }
        });

    })

    // Teste de deletar banner -> [QA-012]
    it('Teste deletar banner', () => {

        Banner.validarCriacaoBanners()

        //Banner.criandoBannerInterno('Banners Home')
        Banner.criacaoBanner()

        // Elemento input
        Banner.setandoInputLink('testqa');

        // Botão filtrar
        Banner.clickBtnFiltrar()

        // Deletando o banner testQa
        Banner.clickBtnDeleteBanner();

        // Validando pop-up de confirmação
        Banner.confirmandoDeleteBanner();

        // Validar modal de delete
        Banner.validandoDeletar();
    })

    // Teste de deletar banner -> [QA-013]-> Alteração de data para permanente.
    it.only('Teste Editar banner', () => {

        Banner.validarCriacaoBanners()

        Banner.criacaoBanner()

        // Elemento input
        Banner.setandoInputLink('testqa');

        // Botão filtrar
        Banner.clickBtnFiltrar()

        // Editando o banner
        Banner.clickEditarBanner()

        // Validando modal de edição
        cy.get('.modal-body')
        .should('be.visible')

        Banner.editarBanner('/BannersHomeEditado')

        cy.get('.btn-secondary')
        .should('be.visible')
        .click()

        // Elemento input
        Banner.setandoInputLink('bannershomeeditado');

        // Botão filtrar
        Banner.clickBtnFiltrar()

        // Deletando o banner testQa
        Banner.clickBtnDeleteBanner();

        // Validando pop-up de confirmação
        Banner.confirmandoDeleteBanner();

        // Validar modal de delete
        Banner.validandoDeletar();
    })

    // Teste btn limpar -> [QA-014]
    it.only('Teste limpar pesquisa', () => {
        // Elemento input
        Banner.setandoInputLink('testqa');

        // Botão filtrar
        Banner.clickBtnFiltrar()

        //Botão limpar
        cy.xpath('//*[@id="kt_app_content_container"]//div[1]//div[2]/button/span[text() = " LIMPAR"]')
            .should('be.visible')
            .click();

        cy.wait(800)

        // Validando se o input foi limpo
        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[2]/div/div[1]//div/input[@placeholder="Pesquise pelo link"]')
            .should('be.visible')
            .should('have.value', '');
    })

    // Teste cancelar criação de banner -> [QA-015]
    it.only('Teste cancelar criação de banner', () => {
        // Click para abrir o modal de criação de banner
        Banner.clickAdicionarBanner();

        // Valida o modal de criação de banner
        Banner.validandoModalCriacao('Banners Home')

        Banner.clickBtnCancelar()

        Banner.confirmandoCancelamentoBanner()
    })

    // Teste cancelar edição de banner -> [QA-016]
    it.only('Teste cancelar edição de banner', () => {

        Banner.validarCriacaoBanners()

        Banner.criacaoBanner()

        // Elemento input
        Banner.setandoInputLink('testqa');

        // Botão filtrar
        Banner.clickBtnFiltrar()

        // Editando o banner
        Banner.clickEditarBanner()

        // Validando modal de edição
        cy.get('.modal-body')
            .should('be.visible')

        cy.xpath('//*[@id="banner_form"]//button[text() = "Cancelar"]')
            .should('be.visible')
            .click();   

        Banner.BannerCancelar('editacao');
    })

    // Teste cancelar exclusão de banner -> [QA-017]
    it.only('Teste cancelar exclusão de banner', () => {

        Banner.validarCriacaoBanners()

        Banner.criacaoBanner()

        // Elemento input
        Banner.setandoInputLink('testqa');

        // Botão filtrar
        Banner.clickBtnFiltrar()

        // Deletando o banner testQa
        Banner.clickBtnDeleteBanner();

        // Validando pop-up de confirmação
        Banner.BannerCancelar('exclusao');

        cy.get('.swal2-confirm')
        .should('be.visible')
        .click()

    })

});