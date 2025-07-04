

export function gerarFenDoTabuleiro() {
   
    const mapaDeClassesParaFen = {
        'torreBranca': 'R', 'cavaloBranco': 'N', 'bispoBranco': 'B', 'rainhaBranca': 'Q', 'reiBranco': 'K', 'peaoBranco': 'P',
        'torre': 'r', 'cavalo': 'n', 'bispo': 'b', 'rainha': 'q', 'rei': 'k', 'peao': 'p'
        
    };
   
    const classesDePecas = Object.keys(mapaDeClassesParaFen);

    const ranksFen = []; 

   
    for (let linha = 0; linha <= 7; linha++) {
        let casasVazias = 0;
        let rankString = ''; 

       
        for (let coluna = 0; coluna < 8; coluna++) {
            const id = linha * 8 + coluna;
            const cell = document.getElementById(`cell-${id}`);

            
            const classeDaPeca = classesDePecas.find(cls => cell.classList.contains(cls));

            if (classeDaPeca) {
               
                if (casasVazias > 0) {
                    rankString += casasVazias;
                }
                casasVazias = 0; 
                
                rankString += mapaDeClassesParaFen[classeDaPeca];
            } else {
                
                casasVazias++;
            }
        }

       
        if (casasVazias > 0) {
            rankString += casasVazias;
        }

      
        ranksFen.push(rankString);
    }

   
    let fen = ranksFen.join('/');

   
    fen += ` b`;


    const q = document.getElementById('cell-0').hasAttribute('data-movimentoroque') && document.getElementById('cell-4').hasAttribute('data-movimentoroque') ? 'q' : '';
    const k = document.getElementById('cell-4').hasAttribute('data-movimentoroque') && document.getElementById('cell-7').hasAttribute('data-movimentoroque') ? "k" : '';
    const Q = document.getElementById('cell-56').hasAttribute('data-movimentoroque') && document.getElementById('cell-60').hasAttribute('data-movimentoroque') ? "Q" : '';
    const K = document.getElementById('cell-60').hasAttribute('data-movimentoroque') && document.getElementById('cell-63').hasAttribute('data-movimentoroque') ? "K" : '';

    
    let direitosDeRoque = K + Q + k + q;

    
    if (direitosDeRoque === '') {
        direitosDeRoque = '-';
    }

   
    fen += ` ${direitosDeRoque} - 0 1`;

    console.log("FEN Gerada:", fen);
    return fen;
}