

import { resetarPosicao,limparMovimento,limparMovimentos,tabuleiro } from "./movimento.js";
 export function movimentoCavalo(id){

    const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 8);
    const coluna = idCell % 8;
    const cavalo = document.getElementById(id);
   console.log(cavalo);

   if (cavalo.dataset.posicao === 'true') {
              limparMovimentos(); 
              cavalo.setAttribute('data-posicao', 'false'); 
              return;
          }
          limparMovimento();
          cavalo.setAttribute('data-posicao', 'true');
          limparMovimentos();

   


   // ordem, cima:direita 0 ,esquerda 1 / baixo: direita 2 esqueda 3 / direita:  cima 4  baixo 5 / esquerda: cima 6 esquerda 7
   const movimentos = [[2,1],[2,-1],[-2,1],[-2,-1], [1,2], [-1,2], [1,-2],[-1,-2] ];

   function movimentoL(){
    

      movimentos.forEach(([x,y]) => {
         try{
         const posicao = tabuleiro[linha+x][coluna+y];
         
         const cellPosicao = document.getElementById(`cell-${posicao}`);
         
         if(cellPosicao.classList.contains('vazia')){
            
            const igmPosicao = document.createElement('img');
            console.log(cellPosicao);
            igmPosicao.src= "pecas/button.png";
            igmPosicao.classList.add('posicao')
            cellPosicao.appendChild(igmPosicao);
            cellPosicao.classList.add('posicao-cell');

             document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
               const cell = evento.target.closest('.posicao-cell');
               
               if (!cell) return;
               const pecaCliclada = document.querySelector('[data-posicao="true"]');
               if (!pecaCliclada) return;

               limparMovimentos();
               const imgInicial = pecaCliclada.querySelector('img');
               const imgNova = document.createElement('img');
               const isBranco = pecaCliclada.classList.contains('cavaloBranco');

               

               imgNova.src = `${isBranco ? 'pecas/branco/knight-w.svg' : 'pecas/preto/knight-b.svg'}`;
               imgNova.classList.add('peca', isBranco ? 'cavaloBranco' : 'cavalo');
               
               


               if (imgInicial) pecaCliclada.removeChild(imgInicial);

               pecaCliclada.classList.remove('cavaloBranco', 'cavalo');
               pecaCliclada.classList.add('vazia');
               pecaCliclada.removeAttribute('data-posicao');

               

               cell.setAttribute('data-posicao', 'false');
               cell.classList.remove('vazia');
               cell.classList.add(isBranco ? 'cavaloBranco' : 'cavalo');
               cell.appendChild(imgNova);
             }, { once: true });

         }
   
      }
       catch{
         return;
      }
      });
      
      
    

   }
   movimentoL();


 }