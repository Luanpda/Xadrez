

export const tabuleiro = [
  [0, 1, 2, 3, 4, 5, 6, 7],         
  [8, 9, 10, 11, 12, 13, 14, 15],   
  [16, 17, 18, 19, 20, 21, 22, 23], 
  [24, 25, 26, 27, 28, 29, 30, 31], 
  [32, 33, 34, 35, 36, 37, 38, 39], 
  [40, 41, 42, 43, 44, 45, 46, 47], 
  [48, 49, 50, 51, 52, 53, 54, 55], 
  [56, 57, 58, 59, 60, 61, 62, 63]  
];


export function limparMovimentos() {
    const botoes = document.querySelectorAll('img.posicao');
    const posicao = document.querySelectorAll('div.posicao-cell');
    const cellMarcada = document.querySelectorAll('div.cell-marcada');
    cellMarcada.forEach(cell => cell.classList.remove('cell-marcada'));
    botoes.forEach(botao => botao.remove());
    posicao.forEach(posicao => posicao.classList.remove('posicao-cell'));
}

export function limparMovimento(){
    const pecas = document.querySelectorAll('[data-posicao="true"]');
    
    
    pecas.forEach(peca => peca.setAttribute('data-posicao', 'false'));

}

export function resetarPosicao(peca){
     if (peca.dataset.posicao === 'true') {
           limparMovimentos(); 
           peca.setAttribute('data-posicao', 'false'); 
           return;
       }
       limparMovimento();
       peca.setAttribute('data-posicao', 'true');
       limparMovimentos();
}



export function movimentoTorre(id){
    const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 8);
    const coluna = idCell % 8;
    const torre = document.getElementById(id);
    const isBranco = torre.classList.contains('torreBranca');
     const classesPecas = ['peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei', 
                      'peaoBranco', 'torreBranca', 'bispoBranco', 'cavaloBranco', 'rainhaBranca', 'reiBranco'];
    
    

    if (torre.dataset.posicao === 'true') {
        limparMovimentos(); 
        torre.setAttribute('data-posicao', 'false'); 
        return;
    }
    limparMovimento();
    torre.setAttribute('data-posicao', 'true');
    limparMovimentos();
    
    //direita
    for (let k = coluna + 1; k < 8; k++) {
        const cellId = tabuleiro[linha][k];
        if (cellId === idCell) continue;
            
            const posicao = document.getElementById(`cell-${cellId}`);
            if(posicao.classList.contains('vazia')) {
                const img = document.createElement('img');
                 posicao.classList.add('posicao-cell')
                img.src = "pecas/button.png";
                img.classList.add('posicao');
                posicao.appendChild(img);
                
            }else{
                    const cellBranca = Array.from(posicao.classList).some(classe => classe.includes('Branc'));
                     if (isBranco) {
                        if(!cellBranca){
                           posicao.classList.add('cell-marcada','posicao-cell');
                       

                        }
                    }
                    else{
                        if(cellBranca){
                        posicao.classList.add('cell-marcada','posicao-cell');
                        }
                    }
                    break;
                    
                }
            
    }
    //esquerda
    for (let k = coluna - 1; k >=0; k--) {
        const cellId = tabuleiro[linha][k];
        if (cellId === idCell) continue;
            
            const posicao = document.getElementById(`cell-${cellId}`);
            if(posicao.classList.contains('vazia')) {
                const img = document.createElement('img');
                 posicao.classList.add('posicao-cell')
                img.src = "pecas/button.png";
                img.classList.add('posicao');
                posicao.appendChild(img);
                
            }else{
                    const cellBranca = Array.from(posicao.classList).some(classe => classe.includes('Branc'));
                     if (isBranco) {
                        if(!cellBranca){
                           posicao.classList.add('cell-marcada','posicao-cell');
                       

                        }
                    }
                    else{
                        if(cellBranca){
                        posicao.classList.add('cell-marcada','posicao-cell');
                        }
                    }
                    break;
                    
                }
            
    }

    //cima
    
    for (let j = linha - 1; j >= 0; j--) {
        const cellId = tabuleiro[j][coluna];
        if (cellId === idCell) continue;

        const posicao = document.getElementById(`cell-${cellId}`);
        if(posicao.classList.contains('vazia')) {
            const img = document.createElement('img');
             posicao.classList.add('posicao-cell')
            img.src = "pecas/button.png";
            img.classList.add('posicao');
            posicao.appendChild(img);
            
        }else{
                    const cellBranca = Array.from(posicao.classList).some(classe => classe.includes('Branc'));
                     if (isBranco) {
                        if(!cellBranca){
                           posicao.classList.add('cell-marcada','posicao-cell');
                       

                        }
                    }
                    else{
                        if(cellBranca){
                        posicao.classList.add('cell-marcada','posicao-cell');
                        }
                    }
                    break;
                    
                }
        
    }   
     //baixo
    for (let j = linha + 1; j  < 8; j++) {
        const cellId = tabuleiro[j][coluna];
        if (cellId === idCell) continue;

        const posicao = document.getElementById(`cell-${cellId}`);
        if(posicao.classList.contains('vazia')) {
            posicao.classList.add('posicao-cell')
            const img = document.createElement('img');
            img.src = "pecas/button.png";
            img.classList.add('posicao');
            posicao.appendChild(img);
            
        }else{
                    const cellBranca = Array.from(posicao.classList).some(classe => classe.includes('Branc'));
                     if (isBranco) {
                        if(!cellBranca){
                           posicao.classList.add('cell-marcada','posicao-cell');
                       

                        }
                    }
                    else{
                        if(cellBranca){
                        posicao.classList.add('cell-marcada','posicao-cell');
                        }
                    }
                    break;
                    
                }
        
    }
   
    
    document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
        const cell = evento.target.closest('.posicao-cell');
        if (!cell) return;

        const pecaCliclada = document.querySelector('[data-posicao="true"]');
        if (!pecaCliclada) return;

         limparMovimentos();

        const imgInicial = pecaCliclada.querySelector('img');
        const imgNova = document.createElement('img');
        

       

        imgNova.src = `${isBranco ? 'pecas/branco/rook-w.svg' : 'pecas/preto/rook-b.svg'}`;
        imgNova.classList.add('peca', isBranco ? 'torreBranca' : 'torre');
        
        
        const imgAlvo = cell.querySelector('img');
        if (imgAlvo) cell.removeChild(imgAlvo);

        if (imgInicial) pecaCliclada.removeChild(imgInicial);

        pecaCliclada.classList.remove('torreBranca', 'torre');
        pecaCliclada.classList.add('vazia');
        pecaCliclada.removeAttribute('data-posicao');

       

        cell.setAttribute('data-posicao', 'false');
        cell.classList.remove(...Array.from(cell.classList).filter(classe => classesPecas.includes(classe)));
        cell.classList.remove('vazia', 'cell-marcada', 'posicao-cell');
        cell.classList.add(isBranco ? 'torreBranca' : 'torre');
        cell.appendChild(imgNova); 
       
    }, { once: true });

   
    
}

export function movimentoPeao(id) {
    const idCell = Number(id.split('-')[1]);
    const peao = document.getElementById(id);
    const linha = Math.floor(idCell / 8);
    const coluna = idCell % 8;
    const classesPecas = ['peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei', 
                      'peaoBranco', 'torreBranca', 'bispoBranco', 'cavaloBranco', 'rainhaBranca', 'reiBranco'];

    if (peao.dataset.posicao === 'true') {
        limparMovimentos(); 
        peao.setAttribute('data-posicao', 'false'); 
        return;
    }

    limparMovimento();
    limparMovimentos();
    peao.setAttribute('data-posicao', 'true');

    const isBranco = peao.classList.contains('peaoBranco');
    const direcao = isBranco ? -8 : 8;
    const inicio = isBranco ? 6 : 1; 
    const direcoesDiagonal = [
        -7, //Branco Direita 
        -9, // Branco esqueda
        9, // Preto direita
        7 //preto esquerda

    ]

    const idFrente1 = idCell + direcao;
    const idDiagonalD = idCell + (isBranco ? direcoesDiagonal[0] : direcoesDiagonal[2]);
    const idDiagonalE = idCell + (isBranco ? direcoesDiagonal[1] : direcoesDiagonal[3]);
    const cellDireita = document.getElementById(`cell-${idDiagonalD}`);
    const cellEsquerda = document.getElementById(`cell-${idDiagonalE}`);
    

    const celulaFrente1 = document.getElementById(`cell-${idFrente1}`);
   
    const cellBrancaE = Array.from(cellEsquerda.classList).some(classe => classe.includes('Branc'));
   
    if(cellDireita &&  !cellDireita.classList.contains('vazia')){
         const cellBrancaD = Array.from(cellDireita.classList).some(classe => classe.includes('Branc'));

         if (isBranco && !cellBrancaD) {
            cellDireita.classList.add('cell-marcada', 'posicao-cell');
        } else if (!isBranco && cellBrancaD) {
        cellDireita.classList.add('cell-marcada', 'posicao-cell');
    }
      
    }
    if (cellEsquerda && !cellEsquerda.classList.contains('vazia')) {
    const cellBrancaE = Array.from(cellEsquerda.classList).some(classe => classe.includes('Branc'));
    if (isBranco && !cellBrancaE) {
        cellEsquerda.classList.add('cell-marcada', 'posicao-cell');
    } else if (!isBranco && cellBrancaE) {
        cellEsquerda.classList.add('cell-marcada', 'posicao-cell');
    }
}
    
    

    if (celulaFrente1 && celulaFrente1.classList.contains('vazia')) {
        celulaFrente1.classList.add('posicao-cell');
        const img = document.createElement('img');
        img.src = "pecas/button.png";
        img.classList.add('posicao');
        celulaFrente1.appendChild(img);
    }

    const idFrente2 = idCell + (2 * direcao);
    const celulaFrente2 = document.getElementById(`cell-${idFrente2}`);

    if (
        linha === inicio &&
        celulaFrente1 && celulaFrente1.classList.contains('vazia') &&
        celulaFrente2 && celulaFrente2.classList.contains('vazia')
    ) {
        celulaFrente2.classList.add('posicao-cell');
        const img2 = document.createElement('img');
        img2.src = "pecas/button.png";
        img2.classList.add('posicao');
        celulaFrente2.appendChild(img2);
    }

    document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
        const destino = evento.target.closest('.posicao-cell');
        if (!destino) return;

        const peaoInicial = document.querySelector('[data-posicao="true"]');
        if (!peaoInicial || !peaoInicial.classList.contains('peao')) return;

        limparMovimentos();

        const imgAtual = peaoInicial.querySelector('img');
        const novoPeao = document.createElement('img');
        const isBranco = peaoInicial.classList.contains('peaoBranco');

        novoPeao.src = isBranco ? "pecas/branco/pawn-w.svg" : "pecas/preto/pawn-b.svg";
        novoPeao.classList.add('peca', 'peaoImg');

        const imgAlvo = destino.querySelector('img');
        if (imgAlvo) destino.removeChild(imgAlvo);

        if (imgAtual) peaoInicial.removeChild(imgAtual);

        peaoInicial.classList.remove('peao', 'peaoBranco');
        peaoInicial.classList.add('vazia');
        peaoInicial.removeAttribute('data-posicao');
        peaoInicial.removeAttribute('data-movimento');

        destino.classList.remove(...Array.from(destino.classList).filter(classe => classesPecas.includes(classe)));
        destino.classList.remove('vazia', 'cell-marcada', 'posicao-cell');
        destino.classList.add('peao');
        if (isBranco) destino.classList.add('peaoBranco');
        destino.setAttribute('data-posicao', 'false');
        destino.setAttribute('data-movimento', 'false');
        destino.appendChild(novoPeao);
    }, { once: true });
}
