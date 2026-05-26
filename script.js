let tipoAtual = "basica";

const precos = {

basica: 11.99,
media: 15.99,
premium: 18.99

};

const limites = {

basica: {
misturas:1,
extras:3
},

media: {
misturas:1,
extras:999
},

premium: {
misturas:2,
extras:999
}

};

document.querySelectorAll("input").forEach(el=>{

el.addEventListener("change",calcular);

});

document.querySelectorAll(".tipo-card").forEach(card=>{

card.addEventListener("click",()=>{

document.querySelectorAll(".tipo-card")
.forEach(c=>c.classList.remove("ativo"));

card.classList.add("ativo");

tipoAtual = card.dataset.tipo;

atualizarTela();

calcular();

});

});

function vibrar(){

if(navigator.vibrate){

navigator.vibrate(200);

}

}

function mostrarErro(input,mensagem,erroId){

input.classList.add("input-erro");

document.getElementById(erroId)
.innerText = mensagem;

vibrar();

}

function limparErro(e){

e.target.classList.remove("input-erro");

if(e.target.id==="nome"){

document.getElementById("erro-nome")
.innerText = "";

}

if(e.target.id==="endereco"){

document.getElementById("erro-endereco")
.innerText = "";

}

}

document.getElementById("nome")
.addEventListener("input",limparErro);

document.getElementById("endereco")
.addEventListener("input",limparErro);

function atualizarTela(){

const limiteMistura =
limites[tipoAtual].misturas;

const limiteExtra =
limites[tipoAtual].extras;

document.getElementById("tituloMistura")
.innerText =
`Escolha até ${limiteMistura} mistura(s)`;

if(limiteExtra >= 999){

document.getElementById("tituloExtra")
.innerText =
"Escolha todos os adicionais";

}else{

document.getElementById("tituloExtra")
.innerText =
`Escolha até ${limiteExtra} adicionais`;

}

document.querySelectorAll(".mistura")
.forEach(el=>el.checked=false);

document.querySelectorAll(".extra")
.forEach(el=>el.checked=false);

}

function calcular(){

let total = precos[tipoAtual];

const porcao =
document.querySelector(".porcao:checked");

if(porcao){

total += parseFloat(
porcao.dataset.preco
);

}

const combos =
document.querySelectorAll(".combo:checked");

combos.forEach(combo=>{

total += parseFloat(
combo.dataset.preco
);

});

const refris =
document.querySelectorAll(".refri:checked");

refris.forEach(refri=>{

total += parseFloat(
refri.dataset.preco
);

});

const misturas =
document.querySelectorAll(".mistura");

const misturasMarcadas =
document.querySelectorAll(".mistura:checked");

const extras =
document.querySelectorAll(".extra");

const extrasMarcados =
document.querySelectorAll(".extra:checked");

const limiteMistura =
limites[tipoAtual].misturas;

const limiteExtra =
limites[tipoAtual].extras;

misturas.forEach(el=>{

if(
misturasMarcadas.length >= limiteMistura
&& !el.checked
){

el.disabled = true;

}else{

el.disabled = false;

}

});

extras.forEach(el=>{

if(
extrasMarcados.length >= limiteExtra
&& !el.checked
){

el.disabled = true;

}else{

el.disabled = false;

}

});

document.getElementById("total")
.innerText =
"R$ " +
total.toFixed(2)
.replace(".",",");

}

function finalizar(){

let nomeInput =
document.getElementById("nome");

let enderecoInput =
document.getElementById("endereco");

let nome =
nomeInput.value.trim();

let endereco =
enderecoInput.value.trim();

let guarnicao =
document.getElementById("guarnicao")
.value;

let pagamento =
document.getElementById("pagamento")
.value;

let misturasSelecionadas =
document.querySelectorAll(".mistura:checked");

let extrasSelecionados =
document.querySelectorAll(".extra:checked");

let refrisSelecionados =
document.querySelectorAll(".refri:checked");

let combosSelecionados =
document.querySelectorAll(".combo:checked");

let misturas =
[...misturasSelecionadas]
.map(e=>e.value);

let extras =
[...extrasSelecionados]
.map(e=>e.value);

let refris =
[...refrisSelecionados]
.map(e=>e.value);

let combos =
[...combosSelecionados]
.map(e=>e.value);

let porcaoSelecionada =
document.querySelector(".porcao:checked");

let porcao =
porcaoSelecionada
? porcaoSelecionada.value
: "Nenhuma";

let total =
document.getElementById("total")
.innerText;

let valido = true;

document.querySelectorAll(".erro")
.forEach(e=>e.innerText="");

document.querySelectorAll("input")
.forEach(i=>i.classList.remove("input-erro"));

if(nome===""){

mostrarErro(
nomeInput,
"Informe seu nome",
"erro-nome"
);

nomeInput.focus();

valido = false;

}

if(endereco===""){

mostrarErro(
enderecoInput,
"Informe seu endereço",
"erro-endereco"
);

if(valido){

enderecoInput.focus();

}

valido = false;

}

if(misturasSelecionadas.length===0){

document.getElementById("erro-mistura")
.innerText =
"Escolha pelo menos 1 mistura";

vibrar();

valido = false;

}

if(!valido) return;

let mensagem =

`🍛 *MEU PRATINHO - NOVO PEDIDO*

👤 Nome:
${nome}

📍 Endereço:
${endereco}

🍱 Tipo:
${tipoAtual.toUpperCase()}

🍚 Guarnição:
${guarnicao}

🥩 Misturas:
${misturas.join(", ")}

➕ Adicionais:
${extras.length ? extras.join(", ") : "Nenhum"}

🍟 Combos:
${combos.length ? combos.join(", ") : "Nenhum"}

🍟 Porção:
${porcao}

🥤 Refrigerantes:
${refris.length ? refris.join(", ") : "Nenhum"}

💳 Pagamento:
${pagamento}

💰 TOTAL:
${total}`;

let url =
`https://wa.me/5588996444527?text=${encodeURIComponent(mensagem)}`;

window.open(url,"_blank");

}

calcular();
