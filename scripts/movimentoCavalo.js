
import { limparMovimento, limparMovimentos, tabuleiro } from "./movimento.js";

export function movimentoCavalo(id) {
    const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 8);
    const coluna = idCell % 8;
    const cavalo = document.getElementById(id);
    const isBranco = cavalo.classList.contains('cavaloBranco');
    const classesPecas = ['peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei', 
                      'peaoBranco', 'torreBranca', 'bispoBranco', 'cavaloBranco', 'rainhaBranca', 'reiBranco'];
    
    console.log(cavalo);

    if (cavalo.dataset.posicao === 'true') {
        limparMovimentos();
        cavalo.setAttribute('data-posicao', 'false');
        return;
    }

    limparMovimento();
    cavalo.setAttribute('data-posicao', 'true');
    limparMovimentos();

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

    document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
    const cell = evento.target.closest('.cell');
    if (!cell || (!cell.classList.contains('posicao-cell') && !cell.classList.contains('cell-marcada'))) return;

    const pecaCliclada = document.querySelector('[data-posicao="true"]');
    if (!pecaCliclada) return;

    limparMovimentos();

    const imgInicial = pecaCliclada.querySelector('img');
    if (imgInicial) pecaCliclada.removeChild(imgInicial);

    const imgNova = document.createElement('img');
    imgNova.src = `${isBranco ? 'pecas/branco/knight-w.svg' : 'pecas/preto/knight-b.svg'}`;
    imgNova.classList.add('peca', isBranco ? 'cavaloBranco' : 'cavalo');

    
    const imgAlvo = cell.querySelector('img');
    if (imgAlvo) cell.removeChild(imgAlvo);

    
    pecaCliclada.classList.remove('cavaloBranco', 'cavalo');
    pecaCliclada.classList.add('vazia');
    pecaCliclada.removeAttribute('data-posicao');

    
    cell.setAttribute('data-posicao', 'false');
    cell.classList.remove(...Array.from(cell.classList).filter(classe => classesPecas.includes(classe)));
    cell.classList.remove('vazia', 'cell-marcada', 'posicao-cell');
    cell.classList.add(isBranco ? 'cavaloBranco' : 'cavalo');
    cell.appendChild(imgNova);
}, { once: true });

}
