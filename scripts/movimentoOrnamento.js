import { limparMovimento,limparMovimentos } from "./movimento.js";
import { alternarTurno } from "./turno.js";


export function movimentoOrnamento(id){
        const idCell = Number(id.split('-')[1]);
        const linha = Math.floor(idCell / 10);
        const coluna = idCell % 10;
        const ornamento = document.getElementById(id);
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
    
        const isBranco = ornamento.classList.contains('ornamentoBranco');
        if(ornamento.dataset.turno === 'false') return;
          if (ornamento.dataset.posicao === 'true') {
                  limparMovimentos(); 
                 ornamento.setAttribute('data-posicao', 'false'); 
                  return;
              }
              limparMovimento();
              ornamento.setAttribute('data-posicao', 'true');
              limparMovimentos();

        const direcoesHorizontal = [
                    {dl:0, dc:1}, //direita
                    {dl:0,dc:-1}, //esquerda
                    {dl:1,dc: 0}, //cima
                    {dl:-1,dc:0} // baixo
           ];
        const movimentos = [
            [0,1],
            [0,-1],
            [1,0],
            [-1,0]
        ];

        
function movimentoHorizontal(dl,dc){
    
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
                    
                    const  cellMarcada = document.querySelectorAll('.cell-marcada');
                    console.log(cellMarcada);
                    if(cellMarcada.length === 0){                   
                    const cellBranca = Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'));
                     if (isBranco) {
                        if(!cellBranca){
                           cellPosicao.classList.add('cell-marcada','posicao-cell');
                       

                        }else{
                            break;
                        }
                    }
                    else{
                        if(cellBranca){
                        cellPosicao.classList.add('cell-marcada','posicao-cell');
                        }else{
                            break;
                        }
                    }
                    
                    
                }
            }
                }catch{
                    return;
                }

                i += dl;
                j += dc;

            }
            
           
}
for(const [dl,dc] of movimentos){
    movimentoHorizontal(dl,dc)
}
           

            document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
                            const cell = evento.target.closest('.posicao-cell');
                            
                            if (!cell) return;
                            const pecaCliclada = document.querySelector('[data-posicao="true"]');
                            if (!pecaCliclada) return;
    
                            limparMovimentos();
                            const imgInicial = pecaCliclada.querySelector('img');
                            const imgNova = document.createElement('img');
                            
    
                            
    
                            imgNova.src = `${isBranco ? 'newPecas/branca/ornamento.png' : 'newPecas/preta/ornamento.png'}`;
                            imgNova.classList.add('peca', isBranco ? 'ornamentoBranco' : 'ornamento');
                            
                            
                            const imgAlvo = cell.querySelector('img');
                            if (imgAlvo) cell.removeChild(imgAlvo);
    
                            if (imgInicial) pecaCliclada.removeChild(imgInicial);
    
                            pecaCliclada.classList.remove('ornamentoBranco', 'ornamento');
                            pecaCliclada.classList.add('vazia');
                            pecaCliclada.removeAttribute('data-posicao');
    
                            
    
                            cell.setAttribute('data-posicao', 'false');
                            cell.classList.remove(...Array.from(cell.classList).filter(classe => classesPecas.includes(classe)));
                            cell.classList.remove('vazia', 'cell-marcada', 'posicao-cell');
                            cell.classList.add(isBranco ? 'ornamentoBranco' : 'ornamento');
                            cell.appendChild(imgNova);
                            cell.setAttribute('data-turno', 'false');
                            alternarTurno();
                            }, { once: true });



}