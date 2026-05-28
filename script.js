let tipoAtual = "basica";

const precos = {

basica: 11.99,
media: 15.99,
premium: 19.99

};

const limites = {

basica:{
misturas:1,
extras:3
},

media:{
misturas:1,
extras:6
},

premium:{
misturas:2,
extras:6
}

};

// CARDS DA QUENTINHA
document.querySelectorAll(".tipo-card")
.forEach(card=>{

card.addEventListener("click",function(){

document.querySelectorAll(".tipo-card")
.forEach(c=>c.classList.remove("ativo"));

this.classList.add("ativo");

tipoAtual = this.dataset.tipo;

// LIMPAR ESCOLHAS
document.querySelectorAll(".mistura")
.forEach(el=>{

el.checked = false;
el.disabled = false;

});

document.querySelectorAll(".extra")
.forEach(el=>{

el.checked = false;
el.disabled = false;

});

calcular();

});

});

// TODOS INPUTS
document.querySelectorAll("input, select")
.forEach(el=>{

el.addEventListener("change",calcular);

});

// LIMPAR ERRO
document.getElementById("nome")
.addEventListener("input",limparErro);

document.getElementById("endereco")
.addEventListener("input",limparErro);

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

function calcular(){

let total = precos[tipoAtual];

// PORÇÕES
document.querySelectorAll(".porcao:checked")
.forEach(el=>{

total += parseFloat(el.dataset.preco);

});

// COMBOS
document.querySelectorAll(".combo:checked")
.forEach(el=>{

total += parseFloat(el.dataset.preco);

});

// REFRIS
document.querySelectorAll(".refri:checked")
.forEach(el=>{

total += parseFloat(el.dataset.preco);

});

// LIMITES
const limiteMisturas =
limites[tipoAtual].misturas;

const limiteExtras =
limites[tipoAtual].extras;

// CONTAGEM
const misturasMarcadas =
document.querySelectorAll(".mistura:checked");

const extrasMarcados =
document.querySelectorAll(".extra:checked");

// TITULOS
document.getElementById("tituloMistura")
.innerText =
`Escolha até ${limiteMisturas} mistura(s)`;

if(limiteExtras >= 6){

document.getElementById("tituloExtra")
.innerText =
"Escolha seus adicionais";

}else{

document.getElementById("tituloExtra")
.innerText =
`Escolha até ${limiteExtras} adicionais`;

}

// TRAVAR MISTURAS
document.querySelectorAll(".mistura")
.forEach(el=>{

if(
misturasMarcadas.length >= limiteMisturas
&& !el.checked
){

el.disabled = true;

}else{

el.disabled = false;

}

});

// TRAVAR ADICIONAIS
document.querySelectorAll(".extra")
.forEach(el=>{

if(
extrasMarcados.length >= limiteExtras
&& !el.checked
){

el.disabled = true;

}else{

el.disabled = false;

}

});

// TOTAL
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

let misturas =
[...document.querySelectorAll(".mistura:checked")]
.map(e=>e.value);

let extras =
[...document.querySelectorAll(".extra:checked")]
.map(e=>e.value);

let combos =
[...document.querySelectorAll(".combo:checked")]
.map(e=>e.value);

let refris =
[...document.querySelectorAll(".refri:checked")]
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

// LIMPAR
document.querySelectorAll(".erro")
.forEach(e=>e.innerText="");

document.querySelectorAll("input")
.forEach(i=>i.classList.remove("input-erro"));

// NOME
if(nome===""){

mostrarErro(
nomeInput,
"Informe seu nome",
"erro-nome"
);

nomeInput.focus();

valido = false;

}

// ENDEREÇO
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

// MISTURA
if(misturas.length===0){

document.getElementById("erro-mistura")
.innerText =
"Escolha pelo menos 1 mistura";

vibrar();

valido = false;

}

if(!valido) return;

// MENSAGEM
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
