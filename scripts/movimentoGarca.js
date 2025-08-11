import { limparMovimento,limparMovimentos} from "./movimento.js";
import { movimentoPadraoCaptura } from "./movimento.js"; 
import { classesPecas,tabuleiro } from "./tables.js";
export function movimentoGarca(id){
    const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 10);
    const coluna = idCell % 10;
    const garca = document.getElementById(id);
    const isBranco = garca.classList.contains('garcaBranco');
 

        if(garca.dataset.turno === 'false') return;
          if (garca.dataset.posicao === 'true') {
                  limparMovimentos(); 
                 garca.setAttribute('data-posicao', 'false'); 
                  return;
              }
              limparMovimento();
              garca.setAttribute('data-posicao', 'true');
              limparMovimentos();
    
              
           const brancaH =  [
            {dl:0, dc:1}, 
            {dl:0,dc:-1}, 
            {dl:1,dc:0}
           ];
           const pretaH =  [
            {dl:0, dc:1}, 
            {dl:0,dc:-1}, 
            {dl:-1,dc:0}  
           ];

           const direcoesHorizontal = isBranco ? brancaH : pretaH;
            
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



          const brancoD = [
            { dl: -1, dc: 1 },   // inferior direita
            { dl: -1, dc: -1 }  // inferior esquerda
                             
        ];
        const pretoD = [
            { dl: 1, dc: 1 },   // inferior direita
            { dl: 1, dc: -1 }  // inferior esquerda
                             
        ];

          const direcoes = isBranco ? brancoD : pretoD;
    
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
        document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
                            const cell = evento.target.closest('.posicao-cell');
                            
                            if (!cell) return;
                            const pecaCliclada = document.querySelector('[data-posicao="true"]');
                            if (!pecaCliclada) return;
    
                            limparMovimentos();
                            movimentoPadraoCaptura(cell,pecaCliclada,isBranco,classesPecas,'garca.png','garca.png','garca');
                            }, { once: true });
}