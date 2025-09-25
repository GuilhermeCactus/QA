export const elements = {
    // ELEMENTOS SIDEBAR
    sideBarConfiguracao : '#kt_app_sidebar_menu_wrapper',
    sideBarParametro: '//span[text()="Parâmetros"]/parent::a',
    // ELEMENTOS SELECT
    selecIntervaloSaque : '.input-group > .form-select',
    selectIntervalo : '[name="time_between_withdrawals"]',
    inputQtdSaqueBonus : '[name="qtd_withdrawal_bonus"]',

    // ELEMENTOS DROPDOWN

    // RETORNO TABELA

    // ELEMENTOS BTNS
    btnAdicionar : 'a[href="/settings/parameters/add"]',

    // ELEMENTOS INPUT
    nome : '#settings_basic_infos > .card-body > :nth-child(1)  .form-control',
    email : '#settings_basic_infos > .card-body > :nth-child(2) .form-control',

    vlrMinDeposito : ':nth-child(2) > .col-lg-9 > [aria-label="Mínimo depósito"] > .form-control',
    vlrMaxDeposito : '[name="max_deposit_value"] > .form-control',
    vlrDepositoMinIndicacao : '[name="min_deposit_amount_to_get_ref_bonus"] > .form-control',
    vlrMaxBonus : '[name="max_deposit_bonus"] > .form-control',
    vlrMinSaque : '[name="min_withdraw_value"]',
    vlrMaxSaque : '[name="max_withdraw_value"]',
    vlrMaxDiario : '[name="withdraw_daily_max_amount"]',

    bonusDeposito : ':nth-child(2) > .col-lg-9 > .input-group > .form-control',
    bonusReferifo : '[name="referral_bonus_amount"] > .form-control',

    msgDeposito : '#settings_deposits_bonus > .card-body > .mb-7 > .col-lg-9 > .form-control',
    msgPersonalizada : '[name="message_bonus_indication"]',
    msgBtnBonus : '[name="text_button_indication"]',

    saqueDiario : '[name="max_auto_withdraw_value"]',
    saqueAcumuloDiario : '[name="max_auto_withdraw_value_accumulated"]',
    // ELEMENTO MODAL
    spanValidacaoSaqueAutomatico : '//*[@id="settings_withdraws"]//div[4]/span',

    // OUTROS
    urlParametro : 'https://stage19-backoffice.bs2bet.com/settings/parameters',
    checkDeposito : '#allowDeposit',
    checkBonusDeposito : '#allowBonus',
    checkBonusIndicacao : '[name="referral_bonus_active"]',
    checkMsgBonusIndicacao : '#activeMessageBonusIndication',
    checkMsgBonus : '#activeTextButtonIndication',
    checkSaqueAutomatico : '#auto_withdraw_is_active'
}