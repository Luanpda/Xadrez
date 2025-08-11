import { limparMovimento, limparMovimentos } from "./movimento.js";
import { tabuleiro,classesPecas } from "./tables.js";
import { movimentoPadraoCaptura } from "./movimento.js";



export function movimentoDragao(id){


    const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 10);
    const coluna = idCell % 10;
    const pecaAtual = document.getElementById(id);
    const isBranco = pecaAtual.classList.contains('dragaoBranco');
   
     
    if(pecaAtual.dataset.turno === 'false') return;
    if (pecaAtual.dataset.posicao === 'true') {
        limparMovimentos();
        pecaAtual.setAttribute('data-posicao', 'false');
        return;
    }

    limparMovimento();
    pecaAtual.setAttribute('data-posicao', 'true');
    limparMovimentos();


    let direcoes = [
        {dl:-1,dc:-2},
        {dl:-1,dc:2},
        {dl:1,dc:-2},
        {dl:1,dc:2},
        {dl:-2,dc:-1},
        {dl:-2,dc:1},
        {dl:2,dc:-1},
        {dl:2,dc:1}


    ];

           for( const { dl,dc} of direcoes){
            let i = linha + dl;
            let j = coluna + dc;

            if (i < 0 || i >= tabuleiro.length || j < 0 || j >= tabuleiro[0].length) continue;
                const cellId = `cell-${tabuleiro[i][j]}`;
             
                
                const cellPosicao= document.getElementById(cellId);
                if(cellPosicao.classList.contains('vazia')){                
                    const imgFrente = document.createElement('img');
                    imgFrente.src = "pecas/button.png";
                    imgFrente.classList.add('posicao');
                    cellPosicao.classList.add('posicao-cell');
                    
                    cellPosicao.appendChild(imgFrente);
                }else{
                    if(isBranco){
                            
                            if(!Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'))){
                                cellPosicao.classList.add('posicao-cell','cell-marcada');                            
                            }

                        }else{
                             if(Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'))){
                                                         
                                cellPosicao.classList.add('posicao-cell','cell-marcada');                       

                            }

                        }
                  
                }                                                           
           }
 direcoes = [
     
        { dl: 1, dc: 1 },   // inferior direita
        { dl: 1, dc: -1 },  // inferior esquerda
        { dl: -1, dc: 1 },  // superior direita
        { dl: -1, dc: -1 }  // superior esquerda
    ];

           for( const { dl,dc} of direcoes){
            let i = linha + dl;
            let j = coluna + dc;

            while(i >= 0 && i < 10 && j >= 0 && j < 10){
                const cellId = `cell-${tabuleiro[i][j]}`;
             
                
                const cellPosicao= document.getElementById(cellId);
                if(cellPosicao.classList.contains('vazia')){            
                    const imgFrente = document.createElement('img');
                    imgFrente.src = "pecas/button.png";
                    imgFrente.classList.add('posicao');
                    cellPosicao.classList.add('posicao-cell');
                    
                    cellPosicao.appendChild(imgFrente);
                }else{
                    if(isBranco){
                            
                            if(!Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'))){
                                cellPosicao.classList.add('posicao-cell','cell-marcada');                            
                            }

                        }else{
                             if(Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'))){
                                                         
                                cellPosicao.classList.add('posicao-cell','cell-marcada');                       

                            }

                        }
                    break;
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
                    movimentoPadraoCaptura(cell,pecaCliclada,isBranco,classesPecas,'dragao.png','dragao.png','dragao');
                    }, { once: true });         
            
}