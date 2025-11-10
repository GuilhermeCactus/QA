export const elements = {
    // ELEMENTOS NAVEGAÇÃO
    navJogadores : '//*[@id="users"]/div[2]/a/span[text() = "Jogadores"]',
    navAdministrador : '//*[@id="users"]//a/span[text() = "Administradores"]',

    // ELEMENTOS INPUTS E SELECTS
    inputFiltro : 'input[placeholder="Digite o valor"]',

    btnBuscar : '.position-relative > .btn',
    
    // ELEMENTOS TABELA
    divID : '//*[@id="kt_app_content_container"]//table/tbody/tr[1]/td[1]',
    divNome : '//*[@id="kt_app_content_container"]//div[1]/table/tbody/tr[1]/td[2]',
    divEmail : '//*[@id="kt_app_content_container"]//div[1]/table/tbody/tr[1]/td[3]',
    divPais : '//*[@id="kt_app_content_container"]//div[1]/table/tbody/tr[1]/td[4]',
    divStatus : '//*[@id="kt_app_content_container"]//div[1]/table/tbody/tr[1]/td[5]/div/span',
}