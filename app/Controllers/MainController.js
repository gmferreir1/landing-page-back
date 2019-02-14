"use strict";
const Mail = use("Mail");
const Promise = use("bluebird");

class MainController {
  /**
   * Pega os dados do form
   * @param {*} param0
   */
  async sendFormData({ request, response }) {
    const requestData = request.all();

    requestData.type_contact = (!requestData.type_contact || !requestData.type_contact.length) ? "nenhuma informação selecionada" : requestData.type_contact.toString();
    requestData.interest = requestData.interest === "comprar_morar" ? "comprar e morar" : "investir";

    await Mail.send("emails.welcome", requestData, message => {
      message
        .to("vendas@masterimoveis.com.br")
        .from("sigem@masterimoveis.com.br", "Contato Landing Page")
        .cc("robertojunior@masterimoveis.com.br")
        .subject("Contato landingpage Alphaville");
    });

    return response.status(200).json("email send");
  }
}

module.exports = MainController;
