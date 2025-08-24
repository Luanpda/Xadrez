import { limparMovimentos, limparMovimento } from "./movimento.js";
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

document.querySelector('#img-inverter').addEventListener('pointerdown', (evento) => {
  const brancEmBaixo = document.getElementById('cell-56')
  const todasPecas = document.querySelectorAll('[data-posicao]');
  const todasCells = document.querySelectorAll('.cell');
  const classesPecas = ['peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei',
    'peaoBranco', 'torreBranca', 'bispoBranco', 'cavaloBranco', 'rainhaBranca', 'reiBranco', 'vazia', 'cell', 'branca', 'marcada', 'cell-marcada', 'posicao-cell'];
  const letrasCasas = brancEmBaixo.classList.contains('a1') ? ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'] : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const numeroCasas = brancEmBaixo.classList.contains('a1') ? ['1', '2', '3', '4', '5', '6', '7', '8'] : ['8', '7', '6', '5', '4', '3', '2', '1'];
  limparMovimento()
  limparMovimentos();
  Array.from(todasCells).forEach((cell) => {
    const cellClass = cell.classList;
    cellClass.forEach((c) => {
      if (!classesPecas.includes(c)) {
        cellClass.remove(c);
      }
      if (cell.querySelector('span')) {
        cell.removeChild(cell.querySelector('span'));
      }
    })

    const idCell = Number(cell.id.split('-')[1]);

    const linha = Math.floor(idCell / 8);
    const coluna = idCell % 8;
    const nomeCasa = letrasCasas[coluna] + numeroCasas[linha];
    cell.classList.add(nomeCasa);

    if (idCell >= 56 && idCell <= 63) {
      const spanCasa = document.createElement('span');
      spanCasa.textContent = letrasCasas[coluna];
      spanCasa.classList.add('nome-casa');
      cell.appendChild(spanCasa);
    }
    if (coluna === 0) {
      const spanCasa = document.createElement('span');
      spanCasa.textContent = numeroCasas[linha];
      spanCasa.classList.add('nome-casa-num');
      cell.appendChild(spanCasa);
    }
  })
Array.from(todasPecas).forEach((pecaDiv) => {
  // acha a posição antiga da peça (tipo 'a1', 'h7' etc)
  const posicaoAntiga = Array.from(pecaDiv.classList).find(c => 
    !classesPecas.includes(c)
  );
  if (!posicaoAntiga) return;

  // procura a célula que ficou com essa posição após inverter
  const novaCell = Array.from(todasCells).find(cell => 
    cell.classList.contains(posicaoAntiga)
  );
  if (!novaCell) return;

  // pega a posição atualizada da célula (já invertida, tipo 'h8')
  const novaPosicao = Array.from(novaCell.classList).find(c => 
    !classesPecas.includes(c)
  );

  // remove a posição antiga da peça e adiciona a nova
  pecaDiv.classList.remove(posicaoAntiga);
  pecaDiv.classList.add(novaPosicao);

  // só move se ainda não estiver na célula certa
  if (pecaDiv.parentElement !== novaCell) {
    novaCell.appendChild(pecaDiv);
  }
});



});






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
      imgAtiva.classList.add('dragging');
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
    imgAtiva.classList.remove('dragging');



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
