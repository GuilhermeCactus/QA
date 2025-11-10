import {elements as el} from "./elements";

class Jogos {

    Navegacao_Configuracao(){
        cy.wait(1000);

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.get('#kt_app_sidebar_menu_wrapper')
        .scrollTo('bottom', { ensureScrollable: false, duration: 300 });

        // Clica no link pai do span "Jogos"
        cy.xpath(el.sideBar)
        .scrollIntoView()
        .should('be.visible')
        .click();

        // Verifica a URL
        cy.url().should('include',el.urlValidacao);

    }

    clickBtnAdicinar(){
        cy.get(el.btnAdicionar)
        .should('be.visible')
        .contains('button','Adicionar')
        .click();

        cy.wait(500)

        // Esperando modal
        cy.get('.modal-content')
        .should('be.visible')

        cy.wait(500)
    }

    validandoSelectImagens(){
        cy.wait(500)

        // Selecionando img
        cy.xpath(el.selectIMG)
        .attachFile('Teste-img.jpg');

        cy.wait(500)

    }

    validaCriacaoProposta(){
        cy.wait(500)

        // Btn para criar nova solicitação
        cy.xpath(el.criarSolicitacao)
            .should('be.visible')
            .click()

        cy.wait(500)

        // Esperando aparecer modal
        cy.get('.modal-body')
            .should('be.visible')

        cy.wait(500)

        // Selecionando 1 anos ------------------------------------
        //cy.get('.el-date-editor')
        //    .click()

        //cy.wait(500)

        // Clicandk no painel na lateral para 1 ano
        //cy.get('.el-picker-panel__sidebar > :nth-child(7)')
        //   .click()

        //cy.wait(500)
    }

    inserindoJogo(){
        cy.xpath(el.inputNomeJogo)
        .should('be.visible')
        .type('QA Teste - Jogo')

        cy.wait(500)
    }

    inserindoReferencia(){
        cy.xpath(el.inputReferencia)
        .should('be.visible')
        .type('QaTeste')
        
        cy.wait(500)
    }

    inserindoCategoria(){
        cy.xpath(el.inputCategoria)
        .should('be.visible')
        .click()

        cy.wait(500)

        // Selecionando todos
        cy.xpath(el.selectTodos)
        .should('be.visible')
        .click()

        
        cy.xpath('//*[@id="modal_form_banner_scroll"]/div[4]//div[1]/div[1]/input')
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    inserindoProvedor(){
        cy.xpath(el.inputProvedor)
        .click()

        // Selecionando o primeiro
        cy.xpath(el.selectTodosProvedor)
        .should('be.visible')
        .click()
        
        cy.xpath(el.inputProvedor)
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    inserindoTipoJogo(){
        cy.xpath(el.inputTipoJogo)
        .should('be.visible')
        .click()

        // Selecionando roleta
        cy.xpath(el.selectTodosTipoJogo)
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    inserindoPlataforma(){
        cy.xpath(el.inputPlataforma)
        .should('be.visible')
        .click()

        // Selecionando desktop
        cy.xpath(el.selectDesktop)
        .should('be.visible')
        .click()

        cy.xpath('//*[@id="modal_form_banner_scroll"]/div[7]/div[1]/div/div')
        .should('be.visible')
        .click()

        cy.wait(500)
    }

    inserindoDescricao(){
        cy.get(el.inputDescricao)
        .should('be.visible')    
        .type('(QA Automação) - Descrição teste')
    
        cy.wait(500)
    }

    inserindoTags(){
        cy.get(el.inputTags)
        .should('be.visible')
        .type('QA')
    
        cy.wait(500)
    }

    validandoCriacao(){
        // Clickando no Btn -> Adicionar
        cy.get('#kt_account_profile_details_submit')
        .should('be.visible')
        .click()

        cy.wait(500)

        cy.get('.swal2-popup').should('be.visible');

        cy.xpath('//*[@id="swal2-html-container"]')
        .should('be.visible')
        .invoke('text')
        .then((text_card) => {
            expect(text_card).to.include('Tem certeza que deseja enviar?');

            cy.get('.swal2-confirm').click()
        })

        cy.wait(5000)
    }

    validacaoTabela(){
        cy.get('td.dataTables_empty').should('not.exist');
        cy.wait(500)

        const nome_jogo = 'QA Teste - Jogo'
        // Nome do jogo
        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[1]/div/div[3]/div/div/div')
        .type(nome_jogo)

        cy.get('#kt_app_content_container')
        .contains('button','Filtrar')
        .click()

        cy.wait(1500)

        const dados_tabela = [];

        cy.xpath('//*[@id="kt_app_content_container"]//div[1]/div[2]//div[1]/table/tr').each(($linha) => {
            const linha_dados = [];

            cy.wrap($linha).find('td').each(($celula) => {
                const texto = $celula.text().trim();
                linha_dados.push(texto);
            }).then(() => {
                dados_tabela.push(linha_dados);
            });
        }).then(() => {
            dados_tabela.forEach((dado_linha) => {

                cy.log(dados_tabela)

                if (dado_linha[3] === nome_jogo) {
                        cy.log(`Processo criado com sucesso! -> ${dado_linha[1]}`);
                }
            });
        });
    }
}

export default new Jogos()