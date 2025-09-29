import {elements as el} from "./elements";

class Performance {

    navegandoPerformance(){
        cy.wait(1000);

        // Rola o wrapper com overflow, mesmo que esteja oculto por CSS no hover
        cy.get('#kt_app_sidebar_menu_wrapper')
        .scrollTo('bottom', { ensureScrollable: false, duration: 300 });

        // Clica no link pai do span "Performance"
        cy.xpath(el.sideBar)
        .scrollIntoView()
        .should('be.visible')
        .click();

        // Verifica a URL
        cy.url().should('include',el.urlValidacao);

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

    clickBtnAdicinar(){
        cy.get(el.btnAdicionar)
        .should('be.visible')
        .click();
    }

    validandoModal(){
        cy.get('.swal2-popup').should('be.visible');
        cy.xpath('//*[@id="swal2-html-container"]')
        .invoke('text')
        .then((text_card) => {
            expect(text_card).to.include('Tem certeza que deseja enviar?');

            //cy.screenshot('deseja_enviar')
            // Confirmando
            cy.wait(500);
            cy.xpath('//*[@id="kt_app_body"]//div[@class="swal2-actions"]/button[3]').click();
        });
    }

    validandoTabela(){
        const dados_tabela = [];
        const dataAtual = new Date();
        const data_formatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;

        cy.wait(3000);

        cy.xpath('//*[@id="kt_app_content_container"]//div[2]//div[1]/table/tbody/tr').each(($linha) => {
            const linha_dados = [];

            cy.wrap($linha).find('td').each(($celula) => {
                const texto = $celula.text().trim();
                linha_dados.push(texto);
            }).then(() => {
                dados_tabela.push(linha_dados);
            });
        }).then(() => {
            dados_tabela.forEach((dado_linha) => {
                if (dado_linha[1] === descricao) {
                    cy.log(`Processo criado com sucesso! -> ${dado_linha[1]}`);
                }
            });
            cy.wait(1000);
        });
    }

    validandoPerformance(validador,count){
        if (validador) {
            cy.wait(500);
            cy.xpath('//*[@id="swal2-html-container"]')
            .invoke('text')
            .then((text_card) => {
                expect(text_card).to.include('Já existe um registro ativo com os dados informados!');
            });

            cy.wait(500);
            //cy.screenshot('ja_existe_registro')
            cy.get('.swal2-confirm').click();

            cy.get('.el-date-editor').should('be.visible').click();
            cy.get(`.el-picker-panel__sidebar > :nth-child(${count})`).click();
            cy.wait(500);
            cy.get('.modal-footer > .btn-primary').click();
            cy.wait(1500);
            cy.get('.swal2-confirm').click();
        }

    }
}

export default new Performance()