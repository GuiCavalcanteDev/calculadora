const resultado = document.querySelector(".resultado");
const botoes = document.querySelectorAll(".botoes button");

let numeroAtual = "";
let primeiroOperando = null;
let operador = null;
let reiniciar = false;

function atualizarResultado(origemLimpar = false) {
  resultado.innerText = origemLimpar ? 0 : numeroAtual.replace(".", ",");
}

function adicionarDigito(digito) {
  if (digito === "," && (numeroAtual.includes(",") || !numeroAtual)) return;

  if (reiniciar) {
    numeroAtual = digito;
    reiniciar = false;
  } else {
    numeroAtual += digito;
  }

  atualizarResultado();
}

function definirOperador(novoOperador) {
  if (numeroAtual) {
    calcular();

    primeiroOperando = parseFloat(numeroAtual.replace(",", "."));
    numeroAtual = "";
  }

  operador = novoOperador;
}

function calcular() {
  if (operador === null || primeiroOperando === null) return;
  let segundoOperando = parseFloat(numeroAtual.replace(",", "."));
  let valorResultado;

  switch (operador) {
    case "+":
      valorResultado = primeiroOperando + segundoOperando;
      break;
    case "-":
      valorResultado = primeiroOperando - segundoOperando;
      break;
    case "×":
      valorResultado = primeiroOperando * segundoOperando;
      break;
    case "÷":
      valorResultado = primeiroOperando / segundoOperando;
      break;
    default:
      return;
  }

  if (valorResultado.toString().split(".")[1]?.length > 5) {
    numeroAtual = parseFloat(valorResultado.toFixed(5)).toString();
  } else {
    numeroAtual = valorResultado.toString();
  }

  operador = null;
  primeiroOperando = null;
  reiniciar = true;
  valorPorcentagem = null;
  atualizarResultado();
}

function limparCalculadora() {
  numeroAtual = "";
  primeiroOperando = null;
  operador = null;
  atualizarResultado(true);
}

function definirPorcentagem() {
  let resultado = parseFloat(numeroAtual) / 100;

  if (["+", "-"].includes(operador)) {
    resultado = resultado * (primeiroOperando || 1);
  }

  if (resultado.toString().split(".")[1]?.length > 5) {
    resultado = resultado.toFixed(5).toString();
  }

  numeroAtual = resultado.toString();
  atualizarResultado();
}

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    const textoBotao = botao.innerText;
    if (/^[0-9,]+$/.test(textoBotao)) {
      adicionarDigito(textoBotao);
    } else if (["+", "-", "×", "÷"].includes(textoBotao)) {
      definirOperador(textoBotao);
    } else if (textoBotao === "=") {
      calcular();
    } else if (textoBotao === "C") {
      limparCalculadora();
    } else if (textoBotao === "±") {
      numeroAtual = (
        parseFloat(numeroAtual || primeiroOperando) * -1
      ).toString();
      atualizarResultado();
    } else if (textoBotao === "%") {
      definirPorcentagem();
    }
  });
});