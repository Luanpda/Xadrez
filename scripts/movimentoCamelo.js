import { limparMovimento,limparMovimentos } from "./movimento.js";
import { alternarTurno } from "./turno.js";
import { getMovimentoAtual } from "./turno.js";

export function movimentoCamelo(id){
        const idCell = Number(id.split('-')[1]);
        const linha = Math.floor(idCell / 10);
        const coluna = idCell % 10;
        const camelo = document.getElementById(id);
        const classesPecas = ['ornamentoBranco','elefanteBranco','cameloBranco','gafanhotoBranco','reiBranco','gatoBranco','ornamento','elefante','camelo','gafanhoto','rei','gato','peao','peaoBranco','garca','garcaBranco'];
        const tabuleiro = [
    [  0,  1,  2,  3,  4,  5,  6,  7,  8,  9 ],
    [ 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ],
    [ 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 ],
    [ 30, 31, 32, 33, 34, 35, 36, 37, 38, 39 ],
    [ 40, 41, 42, 43, 44, 45, 46, 47, 48, 49 ],
    [ 50, 51, 52, 53, 54, 55, 56, 57, 58, 59 ],
    [ 60, 61, 62, 63, 64, 65, 66, 67, 68, 69 ],
    [ 70, 71, 72, 73, 74, 75, 76, 77, 78, 79 ],
    [ 80, 81, 82, 83, 84, 85, 86, 87, 88, 89 ],
    [ 90, 91, 92, 93, 94, 95, 96, 97, 98, 99 ]
    ];
    
        const isBranco = camelo.classList.contains('cameloBranco');
        if(camelo.dataset.turno === 'false') return;
          if (camelo.dataset.posicao === 'true') {
                  limparMovimentos(); 
                 camelo.setAttribute('data-posicao', 'false'); 
                  return;
              }
              limparMovimento();
              camelo.setAttribute('data-posicao', 'true');
              limparMovimentos();


        const movimento = getMovimentoAtual();
        console.log(movimento)

       //Peao
       if(movimento === 5){
        const colunas = tabuleiro[0].length;



          const direcao = isBranco ? -colunas : colunas;
        const inicio = isBranco ? tabuleiro.length - 2 : 1;

        const direcoesDiagonal = [
        -colunas + 1,
        -colunas - 1,
        colunas + 1,
        colunas - 1
    ];

    const idFrente1 = idCell + direcao;
    const idDiagonalD = idCell + (isBranco ? direcoesDiagonal[0] : direcoesDiagonal[2]);
    const idDiagonalE = idCell + (isBranco ? direcoesDiagonal[1] : direcoesDiagonal[3]);

    const cellDireita = document.getElementById(`cell-${idDiagonalD}`);
    const cellEsquerda = document.getElementById(`cell-${idDiagonalE}`);
    const celulaFrente1 = document.getElementById(`cell-${idFrente1}`);

    if (cellDireita && !cellDireita.classList.contains('vazia')) {
        const cellBrancaD = Array.from(cellDireita.classList).some(classe => classe.includes('Branc'));
        if ((isBranco && !cellBrancaD) || (!isBranco && cellBrancaD)) {
            cellDireita.classList.add('cell-marcada', 'posicao-cell');
        }
    }

    if (cellEsquerda && !cellEsquerda.classList.contains('vazia')) {
        const cellBrancaE = Array.from(cellEsquerda.classList).some(classe => classe.includes('Branc'));
        if ((isBranco && !cellBrancaE) || (!isBranco && cellBrancaE)) {
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
        destino.setAttribute('data-turno', 'false');
        destino.appendChild(novoPeao);

        alternarTurno();
    }, { once: true });


       }else{

        //bispo
        if(movimento === 2){
            const direcoes = [
                        { dl: 1, dc: 1 },   // inferior direita
                        { dl: 1, dc: -1 },  // inferior esquerda
                        { dl: -1, dc: 1 },  // superior direita
                        { dl: -1, dc: -1 }  // superior esquerda
                        ];
            for (const {dl,dc} of direcoes){
                    

                     let i = linha + dl;
                     let j = coluna + dc;
                     while(i >= 0 && i < 10 && j >= 0 && j < 10){
                        const cellId = `cell-${tabuleiro[i][j]}`;
                        const cellPosicao= document.getElementById(cellId);
                        
                        
                        try {
                            if(cellPosicao.classList.contains('vazia')){
                                cellPosicao.classList.add('posicao-cell');
                                const igmPosicao = document.createElement('img');
                                igmPosicao.src= "pecas/button.png";
                                igmPosicao.classList.add('posicao');
                                cellPosicao.appendChild(igmPosicao);
            
                                
            
                            }else{
                                const cellBranca = Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'));
                                 if (isBranco) {
                                    if(!cellBranca){
                                       cellPosicao.classList.add('cell-marcada','posicao-cell');
                                   
            
                                    }
                                }
                                else{
                                    if(cellBranca){
                                    cellPosicao.classList.add('cell-marcada','posicao-cell');
                                    }
                                }
                                break;
                            }
                        } catch  {
                            return;
                            
                        }
                        i += dl;
                        j += dc;
                        
                     }
            
                }
        }
        //Rainha
        if(movimento === 0){
            const direcoesHorizontal = [
                        {dl:0, dc:1}, //direita
                        {dl:0,dc:-1}, //esquerda
                        {dl:1,dc: 0}, //cima
                        {dl:-1,dc:0} // baixo
            
                       ];
                       for( const { dl,dc} of direcoesHorizontal){
                        let i = linha + dl;
                        let j = coluna + dc;
            
                        while(i >= 0 && i < 10 && j >= 0 && j < 10){
                            const cellId = `cell-${tabuleiro[i][j]}`;
                            const cellPosicao= document.getElementById(cellId);
                            
                            try{
                                if(cellPosicao.classList.contains('vazia')){
                                    cellPosicao.classList.add('posicao-cell');
                                    const igmPosicao = document.createElement('img');
                                    igmPosicao.src= "pecas/button.png";
                                    igmPosicao.classList.add('posicao');
                                    cellPosicao.appendChild(igmPosicao);
                            }else{
                                const cellBranca = Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'));
                                 if (isBranco) {
                                    if(!cellBranca){
                                       cellPosicao.classList.add('cell-marcada','posicao-cell');
                                   
            
                                    }
                                }
                                else{
                                    if(cellBranca){
                                    cellPosicao.classList.add('cell-marcada','posicao-cell');
                                    }
                                }
                                break;
                            }
                            }catch{
                                return;
                            }
            
                            i += dl;
                            j += dc;
            
                        }
                        
                       }
            
            
            
            
                      const direcoes = [
                        { dl: 1, dc: 1 },   // inferior direita
                        { dl: 1, dc: -1 },  // inferior esquerda
                        { dl: -1, dc: 1 },  // superior direita
                        { dl: -1, dc: -1 }  // superior esquerda
                    ];
                
                
                    for (const {dl,dc} of direcoes){
                
                         let i = linha + dl;
                         let j = coluna + dc;
                         while(i >= 0 && i < 10 && j >= 0 && j < 10){
                            const cellId = `cell-${tabuleiro[i][j]}`;
                            const cellPosicao= document.getElementById(cellId);
                            
                            
            
            
                            
                            
                            
                            try {
                                if(cellPosicao.classList.contains('vazia')){
                                    cellPosicao.classList.add('posicao-cell');
                                    const igmPosicao = document.createElement('img');
                                    igmPosicao.src= "pecas/button.png";
                                    igmPosicao.classList.add('posicao');
                                    cellPosicao.appendChild(igmPosicao);
                
                                    
                
                
                                }else{
                                    const cellBranca = Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'));
                                    if (isBranco) {
                                        if(!cellBranca){
                                        cellPosicao.classList.add('cell-marcada','posicao-cell');
                                    
            
                                        }
                                    }
                                    else{
                                        if(cellBranca){
                                        cellPosicao.classList.add('cell-marcada','posicao-cell');
                                        }
                                    }
                                    break;
                            }
                            } catch  {
                                return;
                                
                            }
                            i += dl;
                            j += dc;
                            
                         }
                
                    }
        }
        //REI
        if(movimento === 4){

            const direcoes = [
                { dl: 0, dc: 1 },   // direita
                { dl: 0, dc: -1 },  // esquerda
                { dl: 1, dc: 0 },   // baixo
                { dl: -1, dc: 0 },  // cima
                { dl: 1, dc: 1 },   // inferior direita
                { dl: 1, dc: -1 },  // inferior esquerda
                { dl: -1, dc: 1 },  // superior direita
                { dl: -1, dc: -1 }  // superior esquerda
            ];

           for( const { dl,dc} of direcoes){
            let i = linha + dl;
            let j = coluna + dc;

                if (i < 0 || i >= 10 || j < 0 || j >= 10) continue;
                const cellId = `cell-${tabuleiro[i][j]}`;
                const cellPosicao= document.getElementById(cellId);
                
                
                
                try{
                    if(cellPosicao.classList.contains('vazia')){
                        cellPosicao.classList.add('posicao-cell');
                        const igmPosicao = document.createElement('img');
                        igmPosicao.src= "pecas/button.png";
                        igmPosicao.classList.add('posicao');
                        cellPosicao.appendChild(igmPosicao);
                }else{
                    const cellBranca = Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'));
                     if (isBranco) {
                        if(!cellBranca){
                           cellPosicao.classList.add('cell-marcada','posicao-cell');
                       

                        }
                    }
                    else{
                        if(cellBranca){
                        cellPosicao.classList.add('cell-marcada','posicao-cell');
                        }
                    }
                    
                }
                }catch{
                    return;
                }

               
            
           }
        }
        //cavalo
        if(movimento === 3 ){
             const movimentos = [[2,1],[2,-1],[-2,1],[-2,-1], [1,2], [-1,2], [1,-2],[-1,-2]];
            
                function movimentoL() {
                    movimentos.forEach(([x, y]) => {
                        try {
                            const posicao = tabuleiro[linha + x][coluna + y];
                            const cellPosicao = document.getElementById(`cell-${posicao}`);
                            
            
                            if (cellPosicao.classList.contains('vazia')) {
                                const igmPosicao = document.createElement('img');
                                
                                igmPosicao.src = "pecas/button.png";
                                igmPosicao.classList.add('posicao');
                                cellPosicao.appendChild(igmPosicao);
                                cellPosicao.classList.add('posicao-cell');
                            }else{
                                 const cellBranca = Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'));
            
                                 if (isBranco) {
                                    if(!cellBranca){
                                       cellPosicao.classList.add('cell-marcada','posicao-cell');
                                   
            
                                    }
                            }
                            else{
                                 if(cellBranca){
                                cellPosicao.classList.add('cell-marcada','posicao-cell');
                                 }
                            }
                            }
                            
            
                        } catch {
                            return;
                        }
                    });
                }
            
                movimentoL();
        }

        if(movimento === 1){
            //direita
                for (let k = coluna + 1; k < 10; k++) {
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
                for (let j = linha + 1; j  < 10; j++) {
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
                        

                        

                        imgNova.src = `${isBranco ? 'newPecas/branca/camelo.png' : 'newPecas/preta/camelo.png'}`;
                        imgNova.classList.add('peca', isBranco ? 'cameloBranco' : 'camelo');
                        
                        

                        const imgAlvo = cell.querySelector('img');
                        if (imgAlvo) cell.removeChild(imgAlvo);
                        if (imgInicial) pecaCliclada.removeChild(imgInicial);

                        pecaCliclada.classList.remove('cameloBranco', 'camelo');
                        pecaCliclada.classList.add('vazia');
                        pecaCliclada.removeAttribute('data-posicao');

                        

                        cell.setAttribute('data-posicao', 'false');
                        cell.classList.remove(...Array.from(cell.classList).filter(classe => classesPecas.includes(classe)));
                        cell.classList.remove('vazia', 'cell-marcada', 'posicao-cell');
                        cell.classList.add(isBranco ? 'cameloBranco' : 'camelo');
                        cell.appendChild(imgNova);
                        cell.setAttribute('data-turno', 'false');
                        alternarTurno();
                        }, { once: true });
       
}       