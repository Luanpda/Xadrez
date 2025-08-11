import { limparMovimento, limparMovimentos} from "./movimento.js";
import { movimentoPadraoCaptura } from "./movimento.js";
import { classesPecas,tabuleiro } from "./tables.js";
export function movimentoElefante(id){
    const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 10);
    const coluna = idCell % 10;
    const elefante = document.getElementById(id);
    const isBranco = elefante.classList.contains('elefanteBranco');
   
    if(elefante.dataset.turno === 'false') return;
    if (elefante.dataset.posicao === 'true') {
        limparMovimentos();
        elefante.setAttribute('data-posicao', 'false');
        return;
    }

    limparMovimento();
    elefante.setAttribute('data-posicao', 'true');
    limparMovimentos();

     const movimentos = [[-2,2],[-2,-2],[2,-2],[2,2]];

    function movimentoX() {
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
    movimentoX();
    document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
    const cell = evento.target.closest('.cell');
    if (!cell || (!cell.classList.contains('posicao-cell') && !cell.classList.contains('cell-marcada'))) return;

    const pecaCliclada = document.querySelector('[data-posicao="true"]');
    if (!pecaCliclada) return;

    limparMovimentos();
    movimentoPadraoCaptura(cell,pecaCliclada,isBranco,classesPecas,'elefante.png','elefante.png','elefante');

}, { once: true });
}