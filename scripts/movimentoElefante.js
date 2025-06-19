import { limparMovimento, limparMovimentos} from "./movimento.js";
import { alternarTurno } from "./turno.js";

export function movimentoElefante(id){
    const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 10);
    const coluna = idCell % 10;
    const elefante = document.getElementById(id);
    const isBranco = elefante.classList.contains('elefanteBranco');
    const classesPecas = ['ornamentoBranco','elefanteBranco','cameloBranco','gafanhotoBranco','reiBranco','gatoBranco','gafanhotoBranco','cameloBranco','elefanteBranco','ornamentoBranco','ornamento','elefante','camelo','gafanhoto','rei','gato','gafanhoto','camelo','elefante','ornamento','peao','peaoBranco','garca','garcaBranco'];
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

    const imgInicial = pecaCliclada.querySelector('img');
    if (imgInicial) pecaCliclada.removeChild(imgInicial);

    const imgNova = document.createElement('img');
    imgNova.src = `${isBranco ? 'newPecas/branca/elefante.png' : 'newPecas/preta/elefante.png'}`;
    imgNova.classList.add('peca', isBranco ? 'elefanteBranco' : 'elefante');

    
    const imgAlvo = cell.querySelector('img');
    if (imgAlvo) cell.removeChild(imgAlvo);

    
    pecaCliclada.classList.remove('elefanteBranco', 'elefante');
    pecaCliclada.classList.add('vazia');
    pecaCliclada.removeAttribute('data-posicao');

    
    cell.setAttribute('data-posicao', 'false');
    cell.classList.remove(...Array.from(cell.classList).filter(classe => classesPecas.includes(classe)));
    cell.classList.remove('vazia', 'cell-marcada', 'posicao-cell');
    cell.classList.add(isBranco ? 'elefanteBranco' : 'elefante');
    cell.appendChild(imgNova);
    cell.setAttribute('data-turno', 'false');
    alternarTurno();
}, { once: true });
}