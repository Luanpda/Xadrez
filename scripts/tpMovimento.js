import { limparMovimento, limparMovimentos } from "./movimento.js";
import { tabuleiro,classesPecas } from "./tables.js";

import { alternarTurno } from "./turno.js";


export function movimentoTp(id){


    const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 10);
    const coluna = idCell % 10;
    const pecaAtual = document.getElementById(id);
    const isBranco = pecaAtual.classList.contains('tpBranco');
   
     
    if(pecaAtual.dataset.turno === 'false') return;
    if (pecaAtual.dataset.posicao === 'true') {
        limparMovimentos();
        pecaAtual.setAttribute('data-posicao', 'false');
        return;
    }

    limparMovimento();
    pecaAtual.setAttribute('data-posicao', 'true');
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
             
                
                const cellPosicao= document.getElementById(cellId);
                if(cellPosicao.classList.contains('vazia')){            
                       
                }else{
                    if(isBranco){
                            
                            if(!Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'))){
                                cellPosicao.classList.add('posicao-cell','cell-marcada-tp');                            
                            }

                        }else{
                             if(Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'))){
                                                         
                                cellPosicao.classList.add('posicao-cell','cell-marcada-tp');                       

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
                        const classeDestino = Array.from(cell.classList).filter(classe => classesPecas.includes(classe));
                        console.log(classeDestino);
                     
                            
    
                        imgNova.src = `${isBranco ? 'newPecas/branca/commonr-w.svg' : 'newPecas/preta/commonr-b.svg'}`;
                        imgNova.classList.add('peca', isBranco ? 'tpBranco' : 'tp');
                            
                            
                        const imgAlvo = cell.querySelector('img');
                        
                        if (imgAlvo) cell.removeChild(imgAlvo);
    
                        if (imgInicial) pecaCliclada.removeChild(imgInicial);

                        pecaCliclada.appendChild(imgAlvo);
                        pecaCliclada.classList.remove('tpBranco', 'tp');
                        if(classeDestino.length > 1 && classeDestino[1] !== 'undefined'){
                            console.log('salve');
                            pecaCliclada.classList.add(classeDestino[0]);
                            pecaCliclada.classList.add(classeDestino[1]);
                        }else{
                             pecaCliclada.classList.add(classeDestino);
                        }
                       
                        pecaCliclada.setAttribute('data-posicao', 'false');
                        pecaCliclada.setAttribute('data-turno', 'false');
                        if(cell.dataset.movimento === 'true'){
                            pecaCliclada.setAttribute('data-movimento', 'true');
                        }
    
                            
                        if(cell.hasAttribute('data-movimento')){
                            cell.removeAttribute('data-movimento');
                        }

                        cell.setAttribute('data-posicao', 'false');
                        cell.classList.remove(...Array.from(cell.classList).filter(classe => classesPecas.includes(classe)));
                        cell.classList.remove('vazia', 'cell-marcada-tp', 'posicao-cell');
                        cell.classList.add(isBranco ? 'tpBranco' : 'tp');
                        cell.appendChild(imgNova);
                        cell.setAttribute('data-turno', 'false');
                        alternarTurno();
                       
                        }, { once: true });
}