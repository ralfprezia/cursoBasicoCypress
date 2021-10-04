describe("Tickets", () => {
    beforeEach(() => cy.visit("https://bit.ly/2XSuwCW"));

    it("prencher todos os campos de texto", ()=> {
        const firstName = "Ralf";
        const lastName = "Carneiro";
        //   (elemento por id)  (oque será escrito)
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("ralfprezia@outlook.com");
        cy.get("#requests").type("QA");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });

    it("selecione dois tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });
    //radio buttons
    it("selecione 'vip' ticket type", () => {
        cy.get("#vip").check();
    });
    //checkbox
    it("selecione 'social media checkbox", () => {
        cy.get("#social-media").check();
    });

    it("selecione 'friend' e 'publication', quando desmarcar 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });
    //verificar se o texto 'TICKETBOX' existe no header
    it("existe 'TICKETBOX' no heading", () => {
        cy.get("h1").should("contain", "TICKETBOX");
    });

    it("alerte quando for um email inválildo", () => {
        //escreva no elemento email um email inválido
        cy.get("#email")
            .as("email")//apelido para reaproveitar o elemento (aliass) salvando o estado do elemento
            .type("ralfprezia2outlook.com");

        //existe em email a opção invalid no DOM?
        cy.get("#email.invalid").should("exist");

        cy.get("@email")
            .clear()//limpa o campo
            .type("ralfprezia@outlook.com");
        //não existe invalid email no DOM?
        cy.get("#email.invalid").should("not.exist");
    });

    //preencher o formulário e depois resetar (e2e) injterage na aplicação como um usuário real faria(onde navega até uma URL, preenche os formulários e faz a verificação)
    it("preencher formulário , e depois resetar formulário", () => {
        const firstName = "Ralf";
        const lastName = "Carneiro";
        const fullName = `${firstName} ${lastName}`;
      
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("ralfprezia@outlook.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("Aviação");
        //testar se o texto corresponde ao selecionar 2 tickets
        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        //ao clicar em agree, somente com o nome completo digitado, pode ser utilizado chek ou click para chekbox.
        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        //Assertions = conferir
        //campos preenchidos, por tanto deve o botão submit deve ficar abilitado
        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        //clicando no botão reset 
        cy.get("button[type='reset']").click();
        //= botão desabilitado e resetado o form
        cy.get("@submitButton").should("be.disabled");
    });
    //comandos customizados = deixa o test mais limpo, economia de espaço, mais objetivo e da responsabilidade certa para as funcionalidades corretas

    //preenche os campos obrigatorios e checa se o botão está abilitado ou desabilitado
   
    it("fills mandatory fields using support command", () => {
        //função customizada
        const customer = {
            firstName:"Marcelo",
            lastName:"Soares",
            email:"marcelosoares@example.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");
        

    });
});