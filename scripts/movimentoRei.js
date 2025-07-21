import { limparMovimento, limparMovimentos } from "./movimento.js";
import { alternarTurno } from "./turno.js";

export function movimentoRei(id) {
    
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
    const idCell = Number(id.split('-')[1]);
    const linha = tabuleiro.findIndex(row => row.includes(idCell)); 
    const coluna = tabuleiro[linha].indexOf(idCell); 
    const rei = document.getElementById(id);
    const classesPecas = ['peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei', 'peaoBranco', 'torreBranca', 'bispoBranco', 'cavaloBranco', 'rainhaBranca', 'reiBranco'];
    const isBranco = rei.classList.contains('reiBranco');
    if (rei.dataset.turno === 'false') return;
    if (rei.dataset.posicao === 'true') {
        limparMovimentos();
        rei.setAttribute('data-posicao', 'false');
        return;
    }
    limparMovimento();
    rei.setAttribute('data-posicao', 'true');
    limparMovimentos();

  
    if ('movimentoroque' in rei.dataset && !rei.classList.contains('cell-marcada')) {
        const torres = isBranco ? document.querySelectorAll('.torreBranca') : document.querySelectorAll('.torre');

        Array.from(torres).forEach(torreElem => {
       
            if (!('movimentoroque' in torreElem.dataset)) return;

            const idTorre = Number(torreElem.id.split('-')[1]);
            const passo = idTorre > idCell ? 1 : -1;
            let caminhoLivre = true; 

          
            for (let i = idCell + passo; i !== idTorre; i += passo) {
                const cellPosicao = document.getElementById(`cell-${i}`);
               
                if (!cellPosicao.classList.contains('vazia') || cellPosicao.classList.contains('cell-marcada')) {
                    caminhoLivre = false;
                    break; 
                }
            }

            
            if (caminhoLivre) {
                const cellRoque = document.getElementById(`cell-${idCell + (2 * passo)}`);
                cellRoque.classList.add('roque', 'posicao-cell');
                cellRoque.dataset.torreId = torreElem.id; 
                cellRoque.dataset.torreDestinoId = `cell-${idCell + passo}`; 

                const igmPosicao = document.createElement('img');
                igmPosicao.src = "pecas/button.png";
                igmPosicao.classList.add('posicao');
                cellRoque.appendChild(igmPosicao);
            }
        });
    }

  
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

    for (const { dl, dc } of direcoes) {
        let i = linha + dl;
        let j = coluna + dc;

        if (i < 0 || i >= tabuleiro.length || j < 0 || j >= tabuleiro[0].length) continue;

        const cellId = `cell-${tabuleiro[i][j]}`;
        const cellPosicao = document.getElementById(cellId);

        try {
            if (cellPosicao.classList.contains('vazia')) {
                cellPosicao.classList.add('posicao-cell');
                const igmPosicao = document.createElement('img');
                igmPosicao.src = "pecas/button.png";
                igmPosicao.classList.add('posicao');
                cellPosicao.appendChild(igmPosicao);
            } else {
                const cellBranca = Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'));
                if (isBranco) {
                    if (!cellBranca) {
                        cellPosicao.classList.add('cell-marcada', 'posicao-cell');
                    }
                } else {
                    if (cellBranca) {
                        cellPosicao.classList.add('cell-marcada', 'posicao-cell');
                    }
                }
            }
        } catch {
            return;
        }
    }

    // --- EVENT LISTENER PARA EXECUTAR O MOVIMENTO ---
    document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
        const cell = evento.target.closest('.posicao-cell');
        if (!cell) return;
        
        // NOVO! Lógica de execução do roque simplificada
        if (cell.classList.contains('roque')) {
            const pecaClicada = document.querySelector('[data-posicao="true"]'); // O Rei
            const torreOriginal = document.getElementById(cell.dataset.torreId);
            const destinoTorre = document.getElementById(cell.dataset.torreDestinoId);

            if (!pecaClicada || !torreOriginal || !destinoTorre) return;

            // Mover o Rei
            const imgRei = pecaClicada.querySelector('img');
            if (imgRei) pecaClicada.removeChild(imgRei);
            pecaClicada.classList.remove('reiBranco', 'rei');
            pecaClicada.classList.add('vazia');
            pecaClicada.removeAttribute('data-posicao');
            pecaClicada.removeAttribute('data-movimentoroque');

            cell.appendChild(imgRei);
            cell.classList.remove('vazia');
            cell.classList.add(isBranco ? 'reiBranco' : 'rei');

            // Mover a Torre
            const imgTorre = torreOriginal.querySelector('img');
            if (imgTorre) torreOriginal.removeChild(imgTorre);
            torreOriginal.classList.remove('torreBranca', 'torre');
            torreOriginal.classList.add('vazia');
            torreOriginal.removeAttribute('data-movimentoroque');

            destinoTorre.appendChild(imgTorre);
            destinoTorre.classList.remove('vazia');
            destinoTorre.classList.add(isBranco ? 'torreBranca' : 'torre');

            limparMovimentos();
            alternarTurno();
            return; // Encerra a função aqui
        }

        // --- Lógica de execução de movimento normal ---
        const pecaCliclada = document.querySelector('[data-posicao="true"]');
        if (!pecaCliclada) return;

        limparMovimentos();
        const imgInicial = pecaCliclada.querySelector('img');
        const imgNova = document.createElement('img');

        imgNova.src = `${isBranco ? 'pecas/branco/king-w.svg' : 'pecas/preto/king-b.svg'}`;
        imgNova.classList.add('peca', isBranco ? 'reiBranco' : 'rei');

        const imgAlvo = cell.querySelector('img');
        if (imgAlvo) cell.removeChild(imgAlvo);

        if (imgInicial) pecaCliclada.removeChild(imgInicial);

        pecaCliclada.classList.remove('reiBranco', 'rei');
        pecaCliclada.classList.add('vazia');
        pecaCliclada.removeAttribute('data-posicao');
        pecaCliclada.removeAttribute('data-movimentoroque');

        cell.setAttribute('data-posicao', 'false');
        cell.classList.remove(...Array.from(cell.classList).filter(classe => classesPecas.includes(classe)));
        cell.classList.remove('vazia', 'cell-marcada', 'posicao-cell');
        cell.classList.add(isBranco ? 'reiBranco' : 'rei');
        cell.appendChild(imgNova);
        cell.setAttribute('data-turno', 'false');
        alternarTurno();

    }, { once: true });
}