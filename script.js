const base = 14.99;

function calcular(){

let total = base;

let misturas =
document.querySelectorAll(".mistura:checked");

if(misturas.length > 2){

total += (misturas.length - 2) * 3.99;

}

document.getElementById("total").innerText =
"R$ " + total.toFixed(2).replace(".",",");

}

document.querySelectorAll(".mistura")
.forEach(el=>{

el.addEventListener("change",calcular);

});

function finalizar(){

let nome =
document.getElementById("nome").value;

let endereco =
document.getElementById("endereco").value;

let misturas =
[...document.querySelectorAll(".mistura:checked")]
.map(e=>e.value);

if(nome == ""){

alert("Digite seu nome");

return;

}

if(endereco == ""){

alert("Digite seu endereço");

return;

}

if(misturas.length == 0){

alert("Escolha ao menos 1 mistura");

return;

}

let mensagem =
`🍛 MEU PRATINHO

👤 Nome:
${nome}

📍 Endereço:
${endereco}

🥩 Misturas:
${misturas.join(", ")}

💰 Total:
${document.getElementById("total").innerText}`;

let url =
`https://wa.me/5588996444527?text=${encodeURIComponent(mensagem)}`;

window.open(url,"_blank");

}
