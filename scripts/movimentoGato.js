import { limparMovimento, limparMovimentos} from "./movimento.js";
import { movimentoPadraoCaptura } from "./movimento.js";
import { tabuleiro,classesPecas } from "./tables.js";
export function movimentoGato(id){
     const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 10);
    const coluna = idCell % 10;
    const gato = document.getElementById(id);
    const isBranco = gato.classList.contains('gatoBranco');


    if(gato.dataset.turno === 'false') return;
    if (gato.dataset.posicao === 'true') {
        limparMovimentos();
        gato.setAttribute('data-posicao', 'false');
        return;
    }

    limparMovimento();
    gato.setAttribute('data-posicao', 'true');
    limparMovimentos();


    
    
    const parteBranco = [[1,0],[1,1],[1,-1], [0,3],[0,-3],[-3,0 ], [-3, 3], [-3, -3]];
    const partePreto = [[-1,0],[-1,1],[-1,-1], [0,3],[0,-3], [3,0], [3,3], [3,-3]];
    const movimentos = isBranco ? parteBranco: partePreto;

    function movimento() {
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
    movimento();
    document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
    const cell = evento.target.closest('.cell');
    if (!cell || (!cell.classList.contains('posicao-cell') && !cell.classList.contains('cell-marcada'))) return;

    const pecaCliclada = document.querySelector('[data-posicao="true"]');
    if (!pecaCliclada) return;

    limparMovimentos();

   movimentoPadraoCaptura(cell,pecaCliclada,isBranco,classesPecas,'gato.png','gato.png','gato');
}, { once: true });
 





}