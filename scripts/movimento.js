import { alternarTurno, impedirMovimento, trocarMovimento } from "./turno.js";
import { setJogada, getJogada } from "./opennings.js";


const tabuleiroPeao = [
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
export const allClass = ['peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei', 
                      'peaoBranco', 'torreBranca', 'bispoBranco', 'cavaloBranco', 'rainhaBranca', 'reiBranco','vazia','marcada','cell','branca'];


export function limparMovimentos() {
    const botoes = document.querySelectorAll('img.posicao');
    const posicao = document.querySelectorAll('div.posicao-cell');
    const cellMarcada = document.querySelectorAll('div.cell-marcada');
    const cellMarcadaTp = document.querySelectorAll('div.cell-marcada-tp');
    cellMarcada.forEach(cell => cell.classList.remove('cell-marcada'));
    cellMarcadaTp.forEach(cell => cell.classList.remove('cell-marcada-tp'));
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
    
    
    if (torre.dataset.turno === `false`) return;

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
        pecaCliclada.removeAttribute('data-movimentoroque')
       

        cell.setAttribute('data-posicao', 'false');
        cell.classList.remove(...Array.from(cell.classList).filter(classe => classesPecas.includes(classe)));
        cell.classList.remove('vazia', 'cell-marcada', 'posicao-cell');
        cell.classList.add(isBranco ? 'torreBranca' : 'torre');
        cell.appendChild(imgNova); 
        cell.setAttribute('data-turno', 'false');
        alternarTurno();
    }, { once: true });

   
    
}

export function movimentoPeao(id) {
    function getTabuleiro() {
        if (document.getElementById(`cell-99`)) {
            return [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
                [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
                [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
                [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
                [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
                [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
                [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
                [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
            ];
        } else {
            return [
                [0, 1, 2, 3, 4, 5, 6, 7],
                [8, 9, 10, 11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20, 21, 22, 23],
                [24, 25, 26, 27, 28, 29, 30, 31],
                [32, 33, 34, 35, 36, 37, 38, 39],
                [40, 41, 42, 43, 44, 45, 46, 47],
                [48, 49, 50, 51, 52, 53, 54, 55],
                [56, 57, 58, 59, 60, 61, 62, 63]
            ];
        }
    }

    const tabuleiro = getTabuleiro();
    const colunas = tabuleiro[0].length;

    const idCell = Number(id.split('-')[1]);
    const peao = document.getElementById(id);
    const isBranco = peao.classList.contains('peaoBranco');

    const classesPecas = [
        'peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei',
        'peaoBranco', 'torreBranca', 'bispoBranca', 'cavaloBranco', 'rainhaBranca', 'reiBranca','ornamentoBranco','elefanteBranco','cameloBranco','gafanhotoBranco','reiBranco','gatoBranco','gafanhotoBranco','cameloBranco','elefanteBranco','ornamentoBranco','ornamento','elefante','camelo','gafanhoto','rei','gato','gafanhoto','camelo','elefante','ornamento','garca' ,'garcaBranco'
    ];

    if (peao.dataset.turno === `false`) return;

    if (peao.dataset.posicao === 'true') {
        limparMovimentos();
        peao.setAttribute('data-posicao', 'false');
        return;
    }

    limparMovimento();
    limparMovimentos();
    peao.setAttribute('data-posicao', 'true');

    const direcao = isBranco ? -colunas : colunas;
    

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
        peao.dataset.movimento === "true"&&
        celulaFrente1 && celulaFrente1.classList.contains('vazia') &&
        celulaFrente2 && celulaFrente2.classList.contains('vazia')
    ) {
        celulaFrente2.classList.add('posicao-cell');
        const img2 = document.createElement('img');
        img2.src = "pecas/button.png";
        img2.classList.add('posicao');
        celulaFrente2.appendChild(img2);
    }

    document.querySelector('.tabuleiro').addEventListener('pointerdown', async(evento) => {
        const destino = evento.target.closest('.posicao-cell');
        if (!destino) return;

        const peaoInicial = document.querySelector('[data-posicao="true"]');
        if (!peaoInicial || !peaoInicial.classList.contains('peao')) return;

        limparMovimentos();
        const isBranco = peaoInicial.classList.contains('peaoBranco');
        
      

        const finalBranco = ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'];
        const finalpreto = ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'];
       
        const jogada = getJogada();
        if(jogada.length === 0){
        const posicaoDaPecaInicial = Array.from(peaoInicial.classList)
    .filter(classe => !allClass.includes(classe));
       const  posicaoFinaldaPeca = Array.from(destino.classList)
    .filter(classe => !allClass.includes(classe));
        setJogada(posicaoDaPecaInicial[0], posicaoFinaldaPeca[0]);
       
        }
      
        

        const imgAtual = peaoInicial.querySelector('img');
        const novoPeao = document.createElement('img');
        

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
        
        if(isBranco){
            if (Array.from(destino.classList).some(classe => finalBranco.includes(classe))){
              if (!document.getElementById('cell-99')) {
                await escolhaPeca(destino, isBranco,peaoInicial);
                return
              }
            }
        }else{
            if (Array.from(destino.classList).some(classe => finalpreto.includes(classe))){
               if (!document.getElementById('cell-99')) {
                console.log('Peão Preto chegou ao final do tabuleiro!');
                await  escolhaPeca(destino, isBranco,peaoInicial);
                return
             }
            }
        }
        
        alternarTurno();
    }, { once: true });
}

 function escolhaPeca(destino,isBranco,peaoInicial){
    return new Promise((resolve) => { 
    const containerOpcoesPeca = document.getElementById('container-opcoes-peca');
    containerOpcoesPeca.classList.remove('invisible');
    const opcoes = containerOpcoesPeca.querySelectorAll('img');
    const srcsPreto = ["pecas/preto/queen-b.svg","pecas/preto/rook-b.svg" ,"pecas/preto/bishop-b.svg", "pecas/preto/knight-b.svg"];
    const srcsBranco = ["pecas/branco/queen-w.svg","pecas/branco/rook-w.svg" ,"pecas/branco/bishop-w.svg", "pecas/branco/knight-w.svg"];
    const classesPretas = ['rainha','torre','bispo','cavalo'];
    const classesBrancas = ['rainhaBranca','torreBranca','bispoBranco','cavaloBranco'];

    const classesPecas = [
        'peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei',
        'peaoBranco', 'torreBranca', 'bispoBranco', 'cavaloBranco', 'rainhaBranca', 'reiBranca','ornamentoBranco','elefanteBranco','cameloBranco','gafanhotoBranco','reiBranco','gatoBranco','gafanhotoBranco','cameloBranco','elefanteBranco','ornamentoBranco','ornamento','elefante','camelo','gafanhoto','rei','gato','gafanhoto','camelo','elefante','ornamento','garca' ,'garcaBranco'
    ];




    if(isBranco){
        opcoes.forEach(opcao => {
            opcao.src = srcsBranco[Array.from(opcoes).indexOf(opcao)];
            opcao.dataset.classe = classesBrancas[Array.from(opcoes).indexOf(opcao)];
        })
        impedirMovimento('branco');                          
    }else{
        opcoes.forEach(opcao => {
            opcao.src = srcsPreto[Array.from(opcoes).indexOf(opcao)];
            opcao.dataset.classe = classesPretas[Array.from(opcoes).indexOf(opcao)];
        })
        impedirMovimento('preto');
    }
    
    opcoes.forEach((opcao, i) => {
    
    const novoOpcao = opcao.cloneNode(true);
    novoOpcao.src = isBranco ? srcsBranco[i] : srcsPreto[i];
    novoOpcao.dataset.classe =  isBranco? classesBrancas[i]: classesPretas[i];
    opcao.parentNode.replaceChild(novoOpcao, opcao);

    novoOpcao.addEventListener('click', () => {
        const imgAtual = destino.querySelector('img');
        if (imgAtual) destino.removeChild(imgAtual);

        const imgDoPeao = peaoInicial.querySelector('img');
        if (imgDoPeao) peaoInicial.removeChild(imgDoPeao);

        peaoInicial.classList.remove('peao','peaoBranco');
        peaoInicial.classList.add('vazia');
        peaoInicial.removeAttribute('data-posicao');
        peaoInicial.removeAttribute('data-movimento');
        const classeDaPecaEscolhida = novoOpcao.dataset.classe;

        const novoPeca = document.createElement('img');
        novoPeca.src = novoOpcao.src;
        novoPeca.classList.add('peca',classeDaPecaEscolhida);

        destino.appendChild(novoPeca);
        destino.classList.remove(...Array.from(destino.classList).filter(classe => classesPecas.includes(classe)));
        destino.classList.add(classeDaPecaEscolhida);
        destino.setAttribute('data-posicao', 'false');
        destino.setAttribute('data-movimento', 'false');
        destino.setAttribute('data-turno', 'false');

        containerOpcoesPeca.classList.add('invisible');
        trocarMovimento(isBranco);
        resolve()
    });
});
});

}