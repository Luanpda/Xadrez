import { limparMovimentos } from "./movimento.js";
import { verificarCell } from "./verificarCell.js";
document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
  const celula = evento.target.closest('.cell');
  
  if (celula) {
    if(!celula.classList.contains('posicao-cell')){
      limparMovimentos();
    }
    const classes = Array.from(celula.classList);
    
    verificarCell(classes,celula.id);

  }
});

