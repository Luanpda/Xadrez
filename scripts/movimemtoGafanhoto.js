import { limparMovimento,limparMovimentos } from "./movimento.js";
import { alternarTurno } from "./turno.js";

export function movimentoGafanhoto(id){
      const idCell = Number(id.split('-')[1]);
        const linha = Math.floor(idCell / 10);
        const coluna = idCell % 10;
        const gafanhoto = document.getElementById(id);
       const classesPecas = [
        'peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei',
        'peaoBranco', 'torreBranca', 'bispoBranca', 'cavaloBranco', 'rainhaBranca', 'reiBranca','ornamentoBranco','elefanteBranco','cameloBranco','gafanhotoBranco','reiBranco','gatoBranco','gafanhotoBranco','cameloBranco','elefanteBranco','ornamentoBranco','ornamento','elefante','camelo','gafanhoto','rei','gato','gafanhoto','camelo','elefante','ornamento','garca' ,'garcaBranco'
    ];
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
        const isBranco = gafanhoto.classList.contains('gafanhotoBranco');
        if(gafanhoto.dataset.turno === 'false') return;
          if (gafanhoto.dataset.posicao === 'true') {
                  limparMovimentos(); 
                 gafanhoto.setAttribute('data-posicao', 'false'); 
                  return;
              }
              limparMovimento();
              gafanhoto.setAttribute('data-posicao', 'true');
              limparMovimentos();
    
             

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

           for( const { dl,dc} of direcoes){
            let i = linha + dl;
            let j = coluna + dc;

            while(i >= 0 && i < 10 && j >= 0 && j < 10){
                const cellId = `cell-${tabuleiro[i][j]}`;
                let cellDaFrente;
                if (i + dl >= 0 && i + dl < 10 && j + dc >= 0 && j + dc < 10) {
                    cellDaFrente = document.getElementById(`cell-${tabuleiro[i+dl][j+dc]}`);
                }

                
                const cellPosicao= document.getElementById(cellId);
                if(cellPosicao.classList.contains('vazia')){
                    
                         
                        


                }else{
                    if(isBranco){
                            
                            if(!Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'))){
                                if(cellDaFrente &&  cellDaFrente.classList.contains('vazia')){
                                    console.log('entrou no else')
                                    console.log(cellDaFrente);
                                    cellPosicao.classList.add('cell-marcada');
                                    const imgFrente = document.createElement('img');
                                    imgFrente.src = "pecas/button.png";
                                    imgFrente.classList.add('posicao');
                                    cellDaFrente.classList.add('posicao-cell');
                                    cellDaFrente.appendChild(imgFrente);
                                }


                            }




                        }else{
                             if(Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'))){
                                if(cellDaFrente &&  cellDaFrente.classList.contains('vazia')){
                                    
                                    cellPosicao.classList.add('cell-marcada');
                                    const imgFrente = document.createElement('img');
                                    imgFrente.src = "pecas/button.png";
                                    imgFrente.classList.add('posicao');
                                    cellDaFrente.classList.add('posicao-cell');
                                    cellDaFrente.appendChild(imgFrente);
                                }


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
                            const imgInicial = pecaCliclada.querySelector('img');
                            const imgNova = document.createElement('img');

                            const idD = cell.id;
                            const idI =  pecaCliclada.id
                            const idInicial = Number(idI.split('-')[1]);
                            const idDestino = Number(idD.split('-')[1]);
                            const linhaI = Math.floor(idInicial / 10);
                            const linhaD = Math.floor(idDestino / 10);
                            const colunaI = idInicial % 10;
                            const colunaD = idDestino % 10;
                            const isBranco = pecaCliclada.classList.contains('gafanhotoBranco');


                      

                          function verificarMovimento(linhaI, linhaD, colunaI, colunaD){
                                if(colunaI === colunaD && linhaI > linhaD){
                                    return  document.getElementById(`cell-${idDestino+10}`);
                                }
                                if(colunaI === colunaD && linhaI < linhaD ){
                                    return  document.getElementById(`cell-${idDestino-10}`) 
                                }
                                 if(linhaI === linhaD && colunaI > colunaD){
                                    return  document.getElementById(`cell-${idDestino+1}`)
                                 }
                                 if(linhaI === linhaD && colunaI < colunaD){
                                    return   document.getElementById(`cell-${idDestino-1}`)
                                 }
                                 //diagonal pra cima esquerda
                                 if(linhaI > linhaD  && colunaI >  colunaD){
                                    
                                    return document.getElementById(`cell-${idDestino +11}`)
                                 }
                                 //diagonal pra cima direita 
                                 if(linhaI > linhaD && colunaI < colunaD ){
                                    
                                    return document.getElementById(`cell-${idDestino +9}`)
                                 }
                                 //diagonal pra baixo direita
                                 if(linhaI < linhaD  && colunaI < colunaD){
                                    
                                    return document.getElementById(`cell-${idDestino -11}`)
                                 }
                                  //diagonal pra baixo esquerda
                                 if(linhaI < linhaD  && colunaI > colunaD){
                                    
                                    return document.getElementById(`cell-${idDestino -9}`)
                                 }
                                 


                          }
                                function removerAtributos(elemento) {
                                for (const attr of [...elemento.attributes]) {
                                    if (attr.name.startsWith('data-')) {
                                        elemento.removeAttribute(attr.name);
                                    }
                                }
    }
                            
                            const cellTras = verificarMovimento(linhaI, linhaD, colunaI, colunaD);
                            
                            const imgCellTras = cellTras.querySelector('img')
                            cellTras.removeChild(imgCellTras)
                            cellTras.classList.remove(...Array.from(cellTras.classList).filter(classe => classesPecas.includes(classe)));
                            cellTras.classList.remove('cell-marcada');
                            cellTras.classList.add('vazia');
                            removerAtributos(cellTras)
                            
    
                            imgNova.src = `${isBranco ? 'newPecas/branca/gafanhoto.png' : 'newPecas/preta/gafanhoto.png'}`;
                            imgNova.classList.add('peca', isBranco ? 'gafanhotoBranco' : 'gafanhoto');
                            
                            
                            
                            const imgAlvo = cell.querySelector('img');
                            if (imgAlvo) cell.removeChild(imgAlvo);
    
                            if (imgInicial) pecaCliclada.removeChild(imgInicial);
    
                            pecaCliclada.classList.remove('gafanhotoBranco', 'gafanhoto');
                            pecaCliclada.classList.add('vazia');
                            pecaCliclada.removeAttribute('data-posicao');
    
                            
            
                            cell.setAttribute('data-posicao', 'false');
                            cell.classList.remove(...Array.from(cell.classList).filter(classe => classesPecas.includes(classe)));
                            cell.classList.remove('vazia', 'cell-marcada', 'posicao-cell');
                            cell.classList.add(isBranco ? 'gafanhotoBranco' : 'gafanhoto');
                            cell.appendChild(imgNova);
                            cell.setAttribute('data-turno', 'false');
                            alternarTurno();
                            }, { once: true });
}