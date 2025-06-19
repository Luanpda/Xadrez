import { limparMovimentos } from "./movimento.js";
import { verificarCell } from "./verificarCell.js";
import { colocarPecasNew } from "./colocarPecasNew.js";
import { gerarFenDoTabuleiro } from "./gerarFen.js";
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

document.querySelector('.titulo').addEventListener('pointerdown',(evento) => {
   const botao = evento.target.closest('.btn');
   if(botao ){
    const  tabuleiro = document.querySelectorAll('.cell');
    tabuleiro.forEach(peca => {
      peca.remove()
    });
    document.querySelector('.tabuleiro').style.gridTemplateColumns = 'repeat(10, 1fr)';
    for (let i = 0; i < 100; i++) {
    const tabuleiro = document.querySelector('.tabuleiro');
    const img = document.createElement('img')
    const cell = document.createElement('div');
    cell.classList.add('cell','vazia');

    const linha = Math.floor(i / 10); 
    const coluna = i % 10;

    cell.id = `cell-${i}`;
    
    
    if ((linha + coluna) % 2 === 0) {
        cell.classList.add('branca');
    } else {
        cell.classList.add('marcada');
    }

    tabuleiro.appendChild(cell);
}

  colocarPecasNew()



   }
})
