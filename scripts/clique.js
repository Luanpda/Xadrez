import { verificarCell } from "./verificarCell.js";
document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
  const celula = evento.target.closest('.cell');
  
  if (celula) {
    const classes = Array.from(celula.classList);
    verificarCell(classes,celula.id);

  }
});

