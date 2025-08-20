import { limparMovimentos } from "./movimento.js";
import { verificarCell } from "./verificarCell.js";
import { colocarPecasNew } from "./colocarPecasNew.js";
import { criarTabuleiro8x8, colocarPecas } from "./colocarPecas.js";
import { setNumeroJogadas } from "./turno.js";
import { setModoJogo } from "./colocarPecas.js";
import { resetarPecaSpawned } from "./spawnPecaEspecial.js";
import { resetarAbertura } from "./engine.js";



let isDragging = false;
let offsetX, offsetY;
let dificuldade;
let imgAtiva = null;
document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
  const celula = evento.target.closest('.cell');
 
  if (celula.dataset.turno === 'false') return;

  if (celula) {
    if (!celula.classList.contains('vazia')) {
      imgAtiva = celula.querySelector('img');
      const style = window.getComputedStyle(imgAtiva);
      imgAtiva.style.width = style.width;
      imgAtiva.style.height = style.height;
      imgAtiva.style.position = 'absolute';
      evento.preventDefault();
      isDragging = true;
      offsetX = evento.clientX - imgAtiva.offsetLeft;
      offsetY = evento.clientY - imgAtiva.offsetTop;
      imgAtiva.style.cursor = "grabbing";
    }

    if (!celula.classList.contains('posicao-cell')) {
      limparMovimentos();

      const pecaAtiva = document.querySelector('[data-posicao="true"]');
      if (pecaAtiva) {
        pecaAtiva.setAttribute('data-posicao', 'false');
      }
    }

    const classes = Array.from(celula.classList);
    verificarCell(classes, celula.id);
  }
});



document.querySelector('.tabuleiro').addEventListener('pointermove', (evento) => {
  const cell = evento.target.closest('.cell');
  if (cell.dataset.turno === 'false') return;
  if (isDragging && imgAtiva) {
    imgAtiva.style.left = (evento.clientX - offsetX) + 'px';
    imgAtiva.style.top = (evento.clientY - offsetY) + 'px';
  }
});


document.querySelector('.tabuleiro').addEventListener('pointerup', (e) => {
  const cell = e.target.closest('.cell');
  if (cell.dataset.turno === 'false') return;
  isDragging = false;
  const eventoArtificial = new PointerEvent('pointerdown', {
    bubbles: true,
    cancelable: true,
    clientX: e.clientX,
    clientY: e.clientY
  });

  if (imgAtiva) {
    imgAtiva.style.cursor = "grab";
    imgAtiva.style.position = 'static';
    imgAtiva.style.left = '';
    imgAtiva.style.top = '';
    const elementoAbaixo = document.elementFromPoint(e.clientX, e.clientY).closest(".cell");
    const imgPosicao = elementoAbaixo.querySelector('img')
    const cell = e.target.closest(".cell");

    

    if (imgPosicao) {
      if (cell !== elementoAbaixo) {
        elementoAbaixo.dispatchEvent(eventoArtificial);
      }


    }

    imgAtiva = null;
  }
});

document.getElementById('container-menu').addEventListener('pointerdown', (evento) => {
  const botao = evento.target.closest('.btn');
  if (!botao) return;
  if (botao.id === 'modo-xadrez2') {
    resetarPecaSpawned();
    setNumeroJogadas(1);
    const tabuleiro = document.querySelectorAll('.cell');
    tabuleiro.forEach(peca => {
      peca.remove()
    });
    document.querySelector('.tabuleiro').style.gridTemplateColumns = 'repeat(10, 1fr)';
    for (let i = 0; i < 100; i++) {
      const tabuleiro = document.querySelector('.tabuleiro');

      const cell = document.createElement('div');

      const letrasCasas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      const numeroCasas = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];

      const linha = Math.floor(i / 10);
      const coluna = i % 10;

      cell.classList.add(`cell`, 'vazia', `${letrasCasas[coluna] + numeroCasas[linha]}`);

      cell.id = `cell-${i}`;


      if ((linha + coluna) % 2 === 0) {
        cell.classList.add('branca');
      } else {
        cell.classList.add('marcada');
      }
      dificuldade = undefined;
      tabuleiro.appendChild(cell);

      botao.classList.add('d-none')
      const botao2P = document.getElementById('modo-local');
      botao2P.classList.remove('d-none');

      const botaoIA = document.getElementById("modo-bot");
      botaoIA.classList.add("d-none");
      const dificuldadeTexto = document.querySelector('.dificuldade');
      dificuldadeTexto.classList.add('d-none');

      const turno = document.getElementById('turno');
      turno.innerHTML = 'Turno: Brancas';

      const modoJogo = document.getElementById('modo-jogo-atual');
      modoJogo.innerHTML = 'Modo Atual: 10x10';

      const textoOU = document.getElementById('texto-outras-opcoes');
      textoOU.classList.add('d-none');
      const textoComputador = document.getElementById('texto-contra-computador');
      textoComputador.innerHTML = 'Xadrez normal:';
      const stockfish = document.getElementById('stockfish');
      stockfish.classList.add('d-none')
      const inputStockfish = document.getElementById('input-stockfish');
      inputStockfish.classList.add('d-none');


    }

    colocarPecasNew()



  }
  if (botao.id === 'modo-local') {
    resetarAbertura();
    criarTabuleiro8x8();
    setNumeroJogadas(1);
    colocarPecas('branco');
    colocarPecas('preto');
    setModoJogo('local')
    botao.classList.add('d-none')
    dificuldade = undefined;
    const botaoXadrez2 = document.getElementById('modo-xadrez2')
    botaoXadrez2.classList.remove('d-none');

    const turno = document.getElementById('turno');
    turno.innerHTML = 'Turno: Brancas';

    const dificuldadeTexto = document.querySelector('.dificuldade');
    dificuldadeTexto.classList.add('d-none');

    const botaoIA = document.getElementById("modo-bot");
    botaoIA.classList.remove("d-none");

    const inputStockfish = document.getElementById('input-stockfish');
    inputStockfish.classList.add('d-none');


    const modoJogo = document.getElementById('modo-jogo-atual');
    modoJogo.innerHTML = 'Modo Atual: Xadrez'

    const textoComputador = document.getElementById('texto-contra-computador');
    textoComputador.innerHTML = 'Contra o computador:';

    const stockfish = document.getElementById('stockfish');
    stockfish.classList.remove('d-none');

    const textoOU = document.getElementById('texto-outras-opcoes');
    textoOU.classList.remove('d-none');
  }
  if (botao.id === 'modo-bot') {
    setNumeroJogadas(1);
    botao.classList.add('d-none')
    dificuldade = undefined;
    const botao2P = document.getElementById('modo-local')
    botao2P.classList.remove('d-none');

    const xadrez2 = document.getElementById("modo-xadrez2");
    xadrez2.classList.add('d-none');

    const dificuldadeTexto = document.querySelector('.dificuldade');
    dificuldadeTexto.classList.add('d-none');

    const textoOU = document.getElementById('texto-outras-opcoes');
    textoOU.classList.add('d-none');

    const turno = document.getElementById('turno');
    turno.innerHTML = 'Turno: Brancas';

    const stockfish = document.getElementById('stockfish');
    stockfish.classList.add('d-none');


    const botaoXadrez2 = document.getElementById('modo-xadrez2')
    botaoXadrez2.classList.add('d-none');

    const textoComputador = document.getElementById('texto-contra-computador');
    textoComputador.innerHTML = 'Xadrez normal:';

    const modoJogo = document.getElementById('modo-jogo-atual');
    modoJogo.innerHTML = 'Modo Atual: Contra IA'

    setModoJogo('IA')
    criarTabuleiro8x8();
    colocarPecas('branco');
    colocarPecas('preto');
  }
  if (botao.id === 'stockfish') {
    setNumeroJogadas(1);
    

    const turno = document.getElementById('turno');
    turno.innerHTML = 'Turno: Brancas';

    const modoJogo = document.getElementById('modo-jogo-atual');
    modoJogo.innerHTML = 'Modo Atual: Stockfish'

    const botao2P = document.getElementById('modo-local');
    const divOpcoes = document.getElementById('outras-opcoes');

    const botaoIA = document.getElementById("modo-bot");
    const inputStockfish = document.getElementById('input-stockfish');
    const textoComputador = document.getElementById('texto-contra-computador');

    textoComputador.innerHTML = 'Stockfish nível 1-20:'
    botao.classList.toggle('d-none')
    inputStockfish.classList.toggle('d-none')
    botaoIA.classList.add("d-none");

    divOpcoes.appendChild(botao2P);
    botao2P.classList.remove('d-none')





    setModoJogo('stockfish');
    criarTabuleiro8x8();
    colocarPecas('branco');
    colocarPecas('preto');
    
   

  }


})
const input = document.getElementById('name');

export function getDificuldade() {
  return dificuldade;
}

input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    
    if (input.value >= 0 && input.value <= 20) {
     
      dificuldade = input.value;
      const dificuldadeTexto = document.querySelector('.dificuldade');
      dificuldadeTexto.innerHTML = `Dificuldade: ${dificuldade}`;
      dificuldadeTexto.classList.remove('d-none');

      const textoComputador = document.getElementById('texto-contra-computador');
      textoComputador.innerHTML = 'Xadrez normal:'

      const textoOU = document.getElementById('texto-outras-opcoes');
      textoOU.classList.add('d-none');

      const inputStockfish = document.getElementById('input-stockfish');
      inputStockfish.classList.add('d-none');

      const xadrez2 = document.getElementById("modo-xadrez2");
      xadrez2.classList.add('d-none');
    } else {
      alert("DIGITE UM NUMERO VÁLIDO");
      input.value = '';
    }

  }
});
