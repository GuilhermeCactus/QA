describe('Login Stage5 direto (sem Commands)', () => {

    it('Fluxo completo: Cloudflare + Login', () => {

        // 1) PASSA PELO CLOUDFLARE
        //cy.request({
        //    url: 'https://backoffice-stage4.gli-cactus.com/',
        //    method: 'GET',
        //    headers: {
        //        "CF-Access-Client-Id": Cypress.env("CF_ACCESS_ID"),
        //        "CF-Access-Client-Secret": Cypress.env("CF_ACCESS_SECRET")
        //    }
        //}).then((res) => {

        //    const cookies = res.headers['set-cookie'];

        //    if (cookies) {
        //        cookies.forEach(cookieString => {
        //            const [cookie] = cookieString.split(';');
        //            const [name, value] = cookie.split('=');

        //            cy.setCookie(name.trim(), value.trim(), {
        //                domain: 'backoffice-stage4.gli-cactus.com'
        //            });
        //        });
        //    }
        //});

        // 2) AGORA VISITA O SISTEMA (liberado pelo Cloudflare)
        cy.visit('https://backoffice-stage5.gli-cactus.com/');

        // 3) LOGIN NORMAL
        cy.get('[placeholder=E-mail]', { timeout: 10000 })
            .should('be.visible')
            .type('admin@email.com');

        cy.get('[placeholder=Senha]').type('secret');
        cy.get('#kt_sign_in_submit').click();

        // 4) VALIDAR
        //cy.url({ timeout: 10000 }).should('include', '/Dashboard');

        //cy.get('.card-body', { timeout: 10000 }).should('be.visible');

    });

});
