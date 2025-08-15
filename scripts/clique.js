import { limparMovimentos } from "./movimento.js";
import { verificarCell } from "./verificarCell.js";
import { colocarPecasNew } from "./colocarPecasNew.js";
import { criarTabuleiro8x8,colocarPecas } from "./colocarPecas.js";
import { setNumeroJogadas,getNumeroJogadas } from "./turno.js";
import {setModoJogo } from "./colocarPecas.js";
import { resetarPecaSpawned } from "./spawnPecaEspecial.js";
import { resetarAbertura } from "./engine.js";






document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
  const celula = evento.target.closest('.cell');
 
  if (celula) {
    if(!celula.classList.contains('posicao-cell')){
      limparMovimentos();
      
      const pecaAtiva = document.querySelector('[data-posicao="true"]');
      if (pecaAtiva) {
        pecaAtiva.setAttribute('data-posicao', 'false');
      }
    }
    
    const classes = Array.from(celula.classList);
    
    verificarCell(classes,celula.id);
  
  }


});

document.getElementById('container-menu').addEventListener('pointerdown',(evento) => {
   const botao = evento.target.closest('.btn');
   if(!botao) return;
   if(botao.id === 'modo-xadrez2'){
    resetarPecaSpawned();
    setNumeroJogadas(1);
    const  tabuleiro = document.querySelectorAll('.cell');
    tabuleiro.forEach(peca => {
      peca.remove()
    });
    document.querySelector('.tabuleiro').style.gridTemplateColumns = 'repeat(10, 1fr)';
    for (let i = 0; i < 100; i++) {
    const tabuleiro = document.querySelector('.tabuleiro');
    const img = document.createElement('img')
    const cell = document.createElement('div');

    const letrasCasas = ['a','b','c','d','e','f','g','h','i','j'];
    const numeroCasas = ['10','9','8','7','6','5','4','3','2','1'];
 
    const linha = Math.floor(i / 10); 
    const coluna = i % 10;

    cell.classList.add(`cell`, 'vazia', `${letrasCasas[coluna] + numeroCasas[linha]}`);

    cell.id = `cell-${i}`;
    
    
    if ((linha + coluna) % 2 === 0) {
        cell.classList.add('branca');
    } else {
        cell.classList.add('marcada');
    }

    tabuleiro.appendChild(cell);

    botao.classList.add('d-none')
    const botao2P = document.getElementById('modo-local');
    botao2P.classList.remove('d-none');

    const botaoIA = document.getElementById("modo-bot");
    botaoIA.classList.add("d-none");

    
    const turno = document.getElementById('turno');
    turno.innerHTML = 'Turno: Brancas';

    const modoJogo  = document.getElementById('modo-jogo-atual');
    modoJogo.innerHTML= 'Modo Atual: Xadrez 2'
    
    
}

  colocarPecasNew()



   }
   if(botao.id === 'modo-local'){
    resetarAbertura();
    criarTabuleiro8x8();
    setNumeroJogadas(1);
    colocarPecas('branco');
    colocarPecas('preto');
    setModoJogo('local')
    botao.classList.add('d-none')
    const botaoXadrez2 = document.getElementById('modo-xadrez2')
    botaoXadrez2.classList.remove('d-none');

    const turno = document.getElementById('turno');
    turno.innerHTML = 'Turno: Brancas';

    const botaoIA = document.getElementById("modo-bot");
    botaoIA.classList.remove("d-none");


    const modoJogo  = document.getElementById('modo-jogo-atual');
    modoJogo.innerHTML= 'Modo Atual: Xadrez'
   }
   if(botao.id === 'modo-bot'){
    setNumeroJogadas(1);
    botao.classList.add('d-none')
    const botao2P = document.getElementById('modo-local')
    botao2P.classList.remove('d-none');

    const xadrez2 = document.getElementById("modo-xadrez2");
    xadrez2.classList.add('d-none');


    const turno = document.getElementById('turno');
    turno.innerHTML = 'Turno: Brancas';

    const modoJogo  = document.getElementById('modo-jogo-atual');
    modoJogo.innerHTML= 'Modo Atual: Contra IA'
    
    setModoJogo('IA')
    criarTabuleiro8x8();
    colocarPecas('branco');
    colocarPecas('preto');
   }
   if(botao.id=== 'stockfish'){
     setNumeroJogadas(1);
     
      const turno = document.getElementById('turno');
      turno.innerHTML = 'Turno: Brancas';

      setModoJogo('stockfish');
      criarTabuleiro8x8();
      colocarPecas('branco');
      colocarPecas('preto');


   }
     

})
