const base = 14.99;

// EVENTOS
document.querySelectorAll("input").forEach(el => {

  el.addEventListener("change", calcular);

});

// LIMPAR ERROS SOMENTE NOS CAMPOS
document.getElementById("nome")
.addEventListener("input", limparErro);

document.getElementById("endereco")
.addEventListener("input", limparErro);

// CALCULAR AO ABRIR
calcular();

function vibrar() {

  if (navigator.vibrate) {

    navigator.vibrate(200);

  }

}

function mostrarErro(input, mensagem, erroId) {

  input.classList.add("input-erro");

  document.getElementById(erroId).innerText =
  mensagem;

  vibrar();

}

function limparErro(e) {

  e.target.classList.remove("input-erro");

  if (e.target.id === "nome") {

    document.getElementById("erro-nome").innerText =
    "";

  }

  if (e.target.id === "endereco") {

    document.getElementById("erro-endereco").innerText =
    "";

  }

}

function calcular() {

  let total = base;

  let misturasSelecionadas =
  document.querySelectorAll(".mistura:checked");

  let refrisSelecionados =
  document.querySelectorAll(".refri:checked");

  // SOMA MISTURAS EXTRAS
  if (misturasSelecionadas.length > 2) {

    let extras = misturasSelecionadas.length - 2;

    total += extras * 3.99;

  }

  // SOMA REFRIGERANTES
  refrisSelecionados.forEach(refri => {

    total += parseFloat(refri.dataset.preco);

  });

  // ATUALIZA TOTAL
  document.getElementById("total").innerText =
  "R$ " + total.toFixed(2).replace(".", ",");

}

function finalizar() {

  let nomeInput =
  document.getElementById("nome");

  let enderecoInput =
  document.getElementById("endereco");

  let nome =
  nomeInput.value.trim();

  let endereco =
  enderecoInput.value.trim();

  let guarnicao =
  document.getElementById("guarnicao").value;

  let pagamento =
  document.getElementById("pagamento").value;

  let misturasSelecionadas =
  document.querySelectorAll(".mistura:checked");

  let extrasSelecionados =
  document.querySelectorAll(".extra:checked");

  let refrisSelecionados =
  document.querySelectorAll(".refri:checked");

  let misturas =
  [...misturasSelecionadas].map(e => e.value);

  let extras =
  [...extrasSelecionados].map(e => e.value);

  let refris =
  [...refrisSelecionados].map(e => e.value);

  let total =
  document.getElementById("total").innerText;

  let valido = true;

  // LIMPAR ERROS
  document.querySelectorAll(".erro")
  .forEach(e => e.innerText = "");

  document.querySelectorAll("input")
  .forEach(i => i.classList.remove("input-erro"));

  // VALIDAR NOME
  if (nome === "") {

    mostrarErro(
      nomeInput,
      "Informe seu nome",
      "erro-nome"
    );

    nomeInput.focus();

    valido = false;

  }

  // VALIDAR ENDEREÇO
  if (endereco === "") {

    mostrarErro(
      enderecoInput,
      "Informe seu endereço",
      "erro-endereco"
    );

    if (valido) {

      enderecoInput.focus();

    }

    valido = false;

  }

  // VALIDAR MISTURA
  if (misturasSelecionadas.length === 0) {

    document.getElementById("erro-mistura").innerText =
    "Escolha pelo menos 1 mistura";

    vibrar();

    valido = false;

  }

  if (!valido) return;

  // MENSAGEM WHATSAPP
  let mensagem =
`🍛 *MEU PRATINHO - NOVO PEDIDO*

👤 Nome: ${nome}

📍 Endereço:
${endereco}

🍚 Guarnição:
${guarnicao}

🥩 Misturas:
${misturas.join(", ")}

➕ Adicionais:
${extras.length ? extras.join(", ") : "Nenhum"}

🥤 Refrigerantes:
${refris.length ? refris.join(", ") : "Nenhum"}

💳 Pagamento:
${pagamento}

💰 TOTAL:
${total}`;

  let url =
`https://wa.me/5588996444527?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");

}
