 let modoDeJogo = 'local';

export function  getModoDeJogo(){
    
  return modoDeJogo;
}

export function setModoJogo(valor){
  modoDeJogo = valor;
  
}
 
 
 
 
 
 export function criarTabuleiro8x8(){
    const  tabuleiro = document.querySelectorAll('.cell');
    tabuleiro.forEach(peca => {
      peca.remove()
    });
    document.querySelector('.tabuleiro').style.gridTemplateColumns = 'repeat(8, 1fr)';
    for (let i = 0; i < 64; i++) {
    const tabuleiro = document.querySelector('.tabuleiro');
    const img = document.createElement('img')
    const cell = document.createElement('div');
    
     const letrasCasas = ['a','b','c','d','e','f','g','h'];
     const numeroCasas = ['8','7','6','5','4','3','2','1']

    const linha = Math.floor(i / 8); 
    const coluna = i % 8;
     cell.classList.add('cell','vazia',`${letrasCasas[coluna]+numeroCasas[linha]}`);
    
    cell.id = `cell-${i}`;
    
    
    if ((linha + coluna) % 2 === 0) {
        cell.classList.add('branca');
    } else {
        cell.classList.add('marcada');
    }


    tabuleiro.appendChild(cell);
}
}
criarTabuleiro8x8();

export function colocarPecas(cor){
    if(cor === 'preto'){
        const pecas = [["pecas/preto/rook-b.svg"],['pecas/preto/knight-b.svg'],['pecas/preto/bishop-b.svg'],['pecas/preto/queen-b.svg'],
        ['pecas/preto/king-b.svg'],['pecas/preto/bishop-b.svg'],['pecas/preto/knight-b.svg'],["pecas/preto/rook-b.svg"]];

        const classes = [['torre'],['cavalo'],['bispo'],['rainha'],['rei'],['bispo'],['cavalo'],['torre']];
        for(let i = 0; i <8; i++){
            const img = document.createElement('img');
            img.src = pecas[i];
            img.classList.add('peca', classes[i]);
           
            const cell = document.getElementById(`cell-${i}`);
            cell.classList.remove('vazia');
            cell.setAttribute('data-posicao', false);


            cell.setAttribute('data-turno','false');
            if(classes[i][0] === 'rei' || classes[i][0] === 'torre'){
                cell.setAttribute('data-movimentoRoque','false')
            }
            cell.classList.add(classes[i]);
            cell.appendChild(img);
        }
        for(let i = 8; i < 16;i++){
            
            const img = document.createElement('img');
            img.src = "pecas/preto/pawn-b.svg";
            img.classList.add('peca','peaoImg');
           
            const cell = document.getElementById(`cell-${i}`);
            cell.classList.add('peao');
            cell.setAttribute('data-movimento', true);
            cell.setAttribute('data-posicao', false);
            cell.setAttribute('data-turno','false');
            cell.classList.remove('vazia');
            cell.appendChild(img);
        }
    }
    if(cor === 'branco'){
        const pecas = [["pecas/branco/rook-w.svg"],['pecas/branco/knight-w.svg'],['pecas/branco/bishop-w.svg'],['pecas/branco/queen-w.svg'],['pecas/branco/king-w.svg'],['pecas/branco/bishop-w.svg'],['pecas/branco/knight-w.svg'],["pecas/branco/rook-w.svg"]];

        const classes = [['torreBranca'],['cavaloBranco'],['bispoBranco'],['rainhaBranca'],['reiBranco'],['bispoBranco'],['cavaloBranco'],['torreBranca']];
        for(let i = 0; i <8; i++){
            const img = document.createElement('img');
            img.src = pecas[i];
            img.classList.add('peca', classes[i]);
           
            const cell = document.getElementById(`cell-${56+i}`);
            cell.classList.remove('vazia');
            cell.setAttribute('data-posicao', false);
            cell.setAttribute('data-turno','true');
            if(classes[i][0] === 'reiBranco' || classes[i][0] === 'torreBranca'){
                cell.setAttribute('data-movimentoRoque','false')
            }
            cell.classList.add(classes[i]);
            cell.appendChild(img);
        }
        for(let i = 48; i < 56;i++){
            const img = document.createElement('img');
            img.src = "pecas/branco/pawn-w.svg";
            img.classList.add('peca','peaoImg',);
           
            const cell = document.getElementById(`cell-${i}`);
            cell.setAttribute('data-movimento', true);
            cell.setAttribute('data-posicao', false);
            cell.setAttribute('data-turno','true');
            
            cell.classList.remove('vazia');
            cell.classList.add('peao', 'peaoBranco');
            
            cell.appendChild(img);
        }
    }
    
}
colocarPecas('branco');
colocarPecas('preto');
