import { limparMovimento,limparMovimentos,tabuleiro } from "./movimento.js";


export function movimentoRainha(id){
      const idCell = Number(id.split('-')[1]);
        const linha = Math.floor(idCell / 8);
        const coluna = idCell % 8;
        const rainha = document.getElementById(id);
    
          if (rainha.dataset.posicao === 'true') {
                  limparMovimentos(); 
                 rainha.setAttribute('data-posicao', 'false'); 
                  return;
              }
              limparMovimento();
              rainha.setAttribute('data-posicao', 'true');
              limparMovimentos();
    
              let soma = 1;

           const direcoesHorizontal = [
            {dl:0, dc:1}, //direita
            {dl:0,dc:-1}, //esquerda
            {dl:1,dc: 0}, //cima
            {dl:-1,dc:0} // baixo

           ];
           for( const { dl,dc} of direcoesHorizontal){
            let i = linha + dl;
            let j = coluna + dc;

            while(i >= 0 && i < 8 && j >= 0 && j < 8){
                const cellId = `cell-${tabuleiro[i][j]}`;
                const cellPosicao= document.getElementById(cellId);
                console.log(cellPosicao);
                try{
                    if(cellPosicao.classList.contains('vazia')){
                        cellPosicao.classList.add('posicao-cell');
                        const igmPosicao = document.createElement('img');
                        igmPosicao.src= "pecas/button.png";
                        igmPosicao.classList.add('posicao');
                        cellPosicao.appendChild(igmPosicao);
                }else{
                    break;
                }
                }catch{
                    return;
                }

                i += dl;
                j += dc;

            }
            
           }




          const direcoes = [
            { dl: 1, dc: 1 },   // inferior direita
            { dl: 1, dc: -1 },  // inferior esquerda
            { dl: -1, dc: 1 },  // superior direita
            { dl: -1, dc: -1 }  // superior esquerda
        ];
    
    
        for (const {dl,dc} of direcoes){
    
             let i = linha + dl;
             let j = coluna + dc;
             while(i >= 0 && i < 8 && j >= 0 && j < 8){
                const cellId = `cell-${tabuleiro[i][j]}`;
                const cellPosicao= document.getElementById(cellId);
                console.log(cellPosicao);
                


                
                
                
                try {
                    if(cellPosicao.classList.contains('vazia')){
                        cellPosicao.classList.add('posicao-cell');
                        const igmPosicao = document.createElement('img');
                        igmPosicao.src= "pecas/button.png";
                        igmPosicao.classList.add('posicao');
                        cellPosicao.appendChild(igmPosicao);
    
                        
    
    
                    }else{
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
                            const imgInicial = pecaCliclada.querySelector('img');
                            const imgNova = document.createElement('img');
                            const isBranco = pecaCliclada.classList.contains('rainhaBranca');
    
                            
    
                            imgNova.src = `${isBranco ? 'pecas/branco/queen-w.svg' : 'pecas/preto/queen-b.svg'}`;
                            imgNova.classList.add('peca', isBranco ? 'rainhaBranca' : 'rainha');
                            
                            
    
    
                            if (imgInicial) pecaCliclada.removeChild(imgInicial);
    
                            pecaCliclada.classList.remove('rainhaBranca', 'rainha');
                            pecaCliclada.classList.add('vazia');
                            pecaCliclada.removeAttribute('data-posicao');
    
                            
    
                            cell.setAttribute('data-posicao', 'false');
                            cell.classList.remove('vazia');
                            cell.classList.add(isBranco ? 'rainhaBranca' : 'rainha');
                            cell.appendChild(imgNova);
                            }, { once: true });
}