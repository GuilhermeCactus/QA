export const elements = {
    // ELEMENTOS SIDEBAR

    // ELEMENTOS SELECT
    selectFiltraPor : '.select-trigger > .el-input > .el-input__wrapper',

    // ELEMENTOS DROPDOWN
    dropdownTodos : '//div/div/div[1]/ul/li[1]/span',
    dropdownFiltraPor : '//div[contains(@class, "el-select-dropdown__wrap")]//ul/li/span',

    // RETORNO TABELA
    retornoID : '.card-body > .d-flex > .fs-5',
    retornoNomeUser : '.card-body [name="user_name"]',
    retornoTel : '.card-body [name="user_phone"]',

    // ELEMENTOS BTNS
    btnBuscar : '//*[@id="filter_form"]/div/div[3]/button',
    btnConfirmar : '.modal-content > .modal-footer > .btn-primary',
    btnbuscarOutro : 'Buscar outro',
    btnEnviarWhats : '[title="Enviar mensagem"]',
    btnAnalise : '//*[@id="kt_app_content_container"]//a[@title="Análise"]',
    btnEditar : '//*[@id="kt_app_content_container"]//button[@title="Editar usuário"]',
    btnObservacao : '[title="Observação do usuário"]',
    btnEdicao : '#kt_account_profile_details_submit',
    btnBloqueiar : '[title="Bloquear usuário"]',
    btnSim : '.swal2-confirm',
    btnBloqueioSaque : '[title="Bloquear saque"]',
    btnAutoExclusao : '.mt-4 > :nth-child(1) > .btn',

    // ELEMENTOS INPUT
    inputID : '//*[@id="filter_form"]/div/div[2]//div/input[@placeholder="Digite o valor"]',
    inputNomeUsuario : ':nth-child(1) > .col-12 > .form-control',
    inputEmail : ':nth-child(2) > .col-12 > .form-control',


    // ELEMENTO MODAL
    modalObservacao : '//div[@class="modal-content"]/div[@class="modal-header flex"]',
    modalContainer : '//*[@id="swal2-html-container"]',
    divValidacaoModal : 'textarea[name="operator_observation"]',
    divValidacaoModalWhats : '//*[@id="swal2-html-container"]/strong',
    divValidacaoModalWhatsGeral : '//*[@id="swal2-html-container"]/span',
    modalEditar : '//*[@id="modal_add_user_player"]/div/div',
    modalNotas : '//*[@id="notes"]',
    

    // OUTROS
    textArea : '//div/div/div[2]/form/div/textarea'
}