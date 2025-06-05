function colocarPecas(cor){
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
            cell.classList.remove('vazia');
            cell.appendChild(img);
        }
    }
    if(cor === 'branco'){
        const pecas = [["pecas/branco/rook-w.svg"],['pecas/branco/knight-w.svg'],['pecas/branco/bishop-w.svg'],['pecas/branco/king-w.svg'],['pecas/branco/queen-w.svg'],['pecas/branco/bishop-w.svg'],['pecas/branco/knight-w.svg'],["pecas/branco/rook-w.svg"]];

        const classes = [['torreBranca'],['cavaloBranco'],['bispoBranco'],['reiBranco'],['rainhaBranca'],['bispoBranco'],['cavaloBranco'],['torreBranca']];
        for(let i = 0; i <8; i++){
            const img = document.createElement('img');
            img.src = pecas[i];
            img.classList.add('peca', classes[i]);
           
            const cell = document.getElementById(`cell-${56+i}`);
            cell.classList.remove('vazia');
            cell.setAttribute('data-posicao', false);
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
            cell.classList.remove('vazia');
            cell.classList.add('peao', 'peaoBranco');
            cell.appendChild(img);
        }
    }
}
colocarPecas('branco');
colocarPecas('preto');
