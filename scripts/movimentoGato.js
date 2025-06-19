import { limparMovimento, limparMovimentos} from "./movimento.js";
import { alternarTurno } from "./turno.js";

export function movimentoGato(id){
     const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 10);
    const coluna = idCell % 10;
    const gato = document.getElementById(id);
    const isBranco = gato.classList.contains('gatoBranco');
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

    const imgInicial = pecaCliclada.querySelector('img');
    if (imgInicial) pecaCliclada.removeChild(imgInicial);

    const imgNova = document.createElement('img');
    imgNova.src = `${isBranco ? 'newPecas/branca/gato.png' : 'newPecas/preta/gato.png'}`;
    imgNova.classList.add('peca', isBranco ? 'gatoBranco' : 'gato');

    
    const imgAlvo = cell.querySelector('img');
    if (imgAlvo) cell.removeChild(imgAlvo);

    
    pecaCliclada.classList.remove('gatoBranco', 'gato');
    pecaCliclada.classList.add('vazia');
    pecaCliclada.removeAttribute('data-posicao');

    
    cell.setAttribute('data-posicao', 'false');
    cell.classList.remove(...Array.from(cell.classList).filter(classe => classesPecas.includes(classe)));
    cell.classList.remove('vazia', 'cell-marcada', 'posicao-cell');
    cell.classList.add(isBranco ? 'gatoBranco' : 'gato');
    cell.appendChild(imgNova);
    cell.setAttribute('data-turno', 'false');
    alternarTurno();
}, { once: true });
 





}