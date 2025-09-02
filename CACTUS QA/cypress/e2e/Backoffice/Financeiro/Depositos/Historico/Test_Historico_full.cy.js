describe('Teste Depositos',() => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture('nb934_usuarios').as('usuarios').then((usuarios) => {
            
            const usuario = usuarios.usuarioValido;
            cy.login(usuario.email,usuario.senha);

        })
    })

    const opc_status = ['Aprovado','Negado','Pendente','Todos'];

    opc_status.forEach((opc) => {
        it(`Testando filtro para status: ${opc}`, () => {
            cy.Navegacao_Deposito();

            cy.xpath("//div[@class='menu-item']/a/span[@class='menu-title' and text() = 'Histórico']")
                .first()
                .should('be.visible')
                .click()

            // Validando URL
            cy.url().should('contain','deposits/History')

            cy.wait(1000)

            cy.Selecionando_1_ano_filtro()

            // Clicando no filtro primario
            cy.xpath('//div[2]//div/input[@class="el-input__inner"]')
                .first()
                .should('be.visible')
                .click();

            cy.wait(500)

            // Selecionando opc de teste 
            cy.xpath(`//div[4]//div/div[1]/ul/li//span[text() = "${opc}"]`)
                .should('to.visible')
                .click()

            cy.wait(500)

            // Se for 'Todos' não tem outros filtros
            if (opc === "Todos") {
                cy.get('.mt-9 > .btn').click();
            } else {
                // Clicando no filtro -> Filtrar por 
                cy.xpath('//div[3]//div/input[@class="el-input__inner"]')
                    .should('be.visible')
                    .click();

                // capturando todos elementos do filtrar por (Todos, Id do jogador , Valor , Nome do jogador)
                cy.xpath(`//div[2]/div/div/div[1]/ul/li`).each(($elemento) => {
                    
                    cy.wrap($elemento).click();
                    cy.wait(500);

                    cy.wrap($elemento).invoke('text').then((filtroSelecionado) => {
                        let filtro = filtroSelecionado.trim();

                        if (filtro === 'Todos') {
                            cy.xpath(`//div[1]/div[4]//button[@type="button"]`)
                            .should('be.visible')
                            .click();
                        } else {
                            // clica em filtrar com qual operador
                            cy.xpath('//div[4]//div/input[@class="el-input__inner"]')
                            .should('be.visible')
                            .click()

                            // Loop em todos operadores
                            cy.xpath('//div[4]/div/div/div[2]/div/div/div[1]/ul/li').each(($operador) => {

                                // Clickando no operador
                                cy.wrap($operador).click()
                                cy.wait(500)

                                cy.wrap($operador).invoke('text').then((operadorInserido) => {

                                    let operadortext = operadorInserido.trim()

                                    let valorInput 

                                    // Se for valor vamos colocar o valor de 1 real -> Conforme a base
                                    if (filtro === 'Id do Jogador') {
                                        if (operadortext === 'maior ou igual'){
                                            valorInput = 4
                                        } else if (operadortext === 'menor ou igual'){
                                            valorInput = 4
                                        } else {
                                            valorInput = 4
                                        }
                                    } else if (filtro === 'Nome do jogador'){
                                        valorInput = 'Apostador da Silva'
                                    } else {
                                        valorInput = 1
                                    }

                                    cy.wait(500)

                                    cy.xpath('//div/div[5]//input')
                                        .should('be.visible')
                                        .click()
                                        .clear()
                                        .type(`${valorInput}`)

                                    // Filtrando 
                                    cy.xpath(`//div[1]/div[6]//button[@type="button"]`)
                                        .first()
                                        .should('be.visible')
                                        .click();

                                    cy.wait(1500);

                                    let dados_tabela = [];

                                    // validar se a tabela ta vazia 
                                    cy.get('body').then(($body) => {

                                        if ($body.find('.dataTables_empty > .border-0').length > 0) {
                                            cy.log('A tabela esta vazia')
                                            cy.get('.dataTables_empty > .border-0')
                                                .should('contain', 'Nenhum dado encontrado');
                                        } else {
                                            // Tabela possui dados
                                            cy.log('A tabela possui dados');

                                            // Captura os dados da tabela
                                            for (let i = 1; i <= 6; i++) {
                                                cy.xpath(`//*[@id="kt_app_content_container"]/div/div[2]/div/div[1]/table/tbody/tr/td[${i}]/div`)
                                                .then(($cell) => {
                                                    const texto = $cell.text();
                                                    dados_tabela.push(texto);
                                                    cy.log(`Coluna ${i}: ${texto}`);
                                                });
                                            }

                                            // Validação depois dos dados capturados
                                            cy.wait(500).then(() => {
                                                if (filtro === 'Todos') {
                                                    // Nenhuma validação
                                                } else if (filtro === 'Id do jogador') {
                                                    expect(dados_tabela[0]).to.contain('4');
                                                } else if (filtro === 'Nome do jogador') {
                                                    expect(dados_tabela[1]).to.contain('Apostador da Silva 1');
                                                } else if (filtro === 'Valor') {
                                                    expect(dados_tabela[3]).to.contain('1');
                                                } 
                                            });
                                        }
                                    })
                                    // Reabre o filtro para próxima iteração
                                    cy.xpath('//div[4]//div/input[@class="el-input__inner"]')
                                    .should('be.visible')
                                    .click();
                                })
                            })
                        }
                        // Clicando no filtro -> Filtrar por 
                        cy.xpath('//div[3]//div/input[@class="el-input__inner"]')
                            .should('be.visible')
                            .click();
                    });
                });
            }
        })  
    })
})