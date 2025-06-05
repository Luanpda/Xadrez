import { limparMovimento,limparMovimentos,tabuleiro } from "./movimento.js";


export function movimentoRei(id){
      const idCell = Number(id.split('-')[1]);
        const linha = Math.floor(idCell / 8);
        const coluna = idCell % 8;
        const rei = document.getElementById(id);
        const classesPecas = ['peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei', 
                      'peaoBranco', 'torreBranca', 'bispoBranco', 'cavaloBranco', 'rainhaBranca', 'reiBranco'];
        const isBranco = rei.classList.contains('reiBranco');
    
          if (rei.dataset.posicao === 'true') {
                  limparMovimentos(); 
                 rei.setAttribute('data-posicao', 'false'); 
                  return;
              }
              limparMovimento();
              rei.setAttribute('data-posicao', 'true');
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

                if (i < 0 || i >= 8 || j < 0 || j >= 8) continue;
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
                }catch{
                    return;
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
                            
    
                            
    
                            imgNova.src = `${isBranco ? 'pecas/branco/king-w.svg' : 'pecas/preto/king-b.svg'}`;
                            imgNova.classList.add('peca', isBranco ? 'reiBranco' : 'rei');
                            
                            
                            const imgAlvo = cell.querySelector('img');
                            if (imgAlvo) cell.removeChild(imgAlvo);
    
                            if (imgInicial) pecaCliclada.removeChild(imgInicial);
    
                            pecaCliclada.classList.remove('reiBranco', 'rei');
                            pecaCliclada.classList.add('vazia');
                            pecaCliclada.removeAttribute('data-posicao');
    
                            
    
                            cell.setAttribute('data-posicao', 'false');
                            cell.classList.remove(...Array.from(cell.classList).filter(classe => classesPecas.includes(classe)));
                            cell.classList.remove('vazia', 'cell-marcada', 'posicao-cell');
                            cell.classList.add(isBranco ? 'reiBranco' : 'rei');
                            cell.appendChild(imgNova);
                            }, { once: true });
}