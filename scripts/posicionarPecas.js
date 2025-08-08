
export  function posicionarPeca(celula,src,classe){

    const peca = document.createElement('img');
    const cell = document.querySelector('.'+celula);
    
   
    peca.src = src;
    peca.classList.add('peca',classe);
    cell.classList.add(classe);
    cell.classList.remove('vazia');
    cell.setAttribute("data-posicao", "false");
    cell.setAttribute("data-turno", "true");

    cell.appendChild(peca);
    

}

// posicionarPeca('e7', 'newPecas/branca/commonr-w.svg', 'tpBranco');

