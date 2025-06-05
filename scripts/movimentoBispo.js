import { limparMovimento,limparMovimentos,tabuleiro } from "./movimento.js";

export function movimentoBispo(id){
    const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 8);
    const coluna = idCell % 8;
    const bispo = document.getElementById(id);
    const isBranco = bispo.classList.contains('bispoBranco');
    const classesPecas = ['peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei', 
                      'peaoBranco', 'torreBranca', 'bispoBranco', 'cavaloBranco', 'rainhaBranca', 'reiBranco'];

      if (bispo.dataset.posicao === 'true') {
              limparMovimentos(); 
             bispo.setAttribute('data-posicao', 'false'); 
              return;
          }
          limparMovimento();
          bispo.setAttribute('data-posicao', 'true');
          limparMovimentos();

          let soma = 1;
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
                        const imgInicial = pecaCliclada.querySelector('img');
                        const imgNova = document.createElement('img');
                        

                        

                        imgNova.src = `${isBranco ? 'pecas/branco/bishop-w.svg' : 'pecas/preto/bishop-b.svg'}`;
                        imgNova.classList.add('peca', isBranco ? 'bispoBranco' : 'bispo');
                        
                        

                        const imgAlvo = cell.querySelector('img');
                        if (imgAlvo) cell.removeChild(imgAlvo);
                        if (imgInicial) pecaCliclada.removeChild(imgInicial);

                        pecaCliclada.classList.remove('bispoBranco', 'bispo');
                        pecaCliclada.classList.add('vazia');
                        pecaCliclada.removeAttribute('data-posicao');

                        

                        cell.setAttribute('data-posicao', 'false');
                        cell.classList.remove(...Array.from(cell.classList).filter(classe => classesPecas.includes(classe)));
                        cell.classList.remove('vazia', 'cell-marcada', 'posicao-cell');
                        cell.classList.add(isBranco ? 'bispoBranco' : 'bispo');
                        cell.appendChild(imgNova);
                        }, { once: true });

    
}
