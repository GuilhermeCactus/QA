export const elements = {

    // ELEMENTOS SIDEBAR
    sideBarDeposito : '//*[@id="reports"]/div[1]/a/span[2]',
    sideBarSaque : '//*[@id="reports"]/div[2]/a/span[2]',
    sideBarCreditacao : '//*[@id="reports"]/div[3]/a/span[2]',

    // ELEMENTOS SELECT
    selectStatus : '.el-select > .select-trigger > .el-input',
    selectFiltro : '//*[@id="kt_app_content_container"]//div[2]/div[3]/div/div/div[1]/div/div',

    // ELEMENTOS DROPDOWN
    dropdownStatus : '.el-select-dropdown__item',
    dropdownFiltro : '//*[@id="kt_app_content_container"]//div[2]/div[3]//div[1]/ul/li',

    retornoTabelaLinha : '//*[@id="kt_app_content_container"]//table//tr',

    // ELEMENTOS BTNS
    btnBuscar : ':nth-child(6) > .btn',
    btnBuscarTodos : '//*[@id="kt_app_content_container"]/div[1]/div[1]//div[4]/button[1]',
    btnbuscarCreditacoes : '//*[@id="kt_app_content_container"]//div[2]/div[3]/button',
    btnLimpar : '//*[@id="kt_app_content_container"]//div[2]/div[4]/button',
    btnDownload : '//*[@id="kt_app_content_container"]//div[1]/div/button',
    btnNao : '//*[@id="kt_app_body"]/div[4]/div/div[6]/button[1]',
    btnSim : '//*[@id="kt_app_body"]/div[4]/div/div[6]/button[3]',

    operadorIgualdade : '//div[@class="el-scrollbar"]//ul[@class="el-scrollbar__view el-select-dropdown__list"]/li/span[text() = "igual"]',

    inputFiltro : '.d-flex > .el-input > .el-input__wrapper',

    modalDownload : '//*[@id="swal2-html-container"]'

};