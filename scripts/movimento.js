const tabuleiro = [
  [0, 1, 2, 3, 4, 5, 6, 7],         
  [8, 9, 10, 11, 12, 13, 14, 15],   
  [16, 17, 18, 19, 20, 21, 22, 23], 
  [24, 25, 26, 27, 28, 29, 30, 31], 
  [32, 33, 34, 35, 36, 37, 38, 39], 
  [40, 41, 42, 43, 44, 45, 46, 47], 
  [48, 49, 50, 51, 52, 53, 54, 55], 
  [56, 57, 58, 59, 60, 61, 62, 63]  
];



export function movimentoTorre(id){
    const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 8);
    const coluna = idCell % 8;

    
    for (let k = 0; k < 8; k++) {
        const cellId = tabuleiro[linha][k];
        if (cellId === idCell) continue;
            
            const posicao = document.getElementById(`cell-${cellId}`);
            if(posicao.classList.contains('vazia')) {
                const img = document.createElement('img');
                img.src = "pecas/button.png";
                img.classList.add('posicao');
                posicao.appendChild(img);
                
            }else{
                break;
            }
            
    }

    
    for (let j = 0; j < 8; j++) {
        const cellId = tabuleiro[j][coluna];
        if (cellId === idCell) continue;

        const posicao = document.getElementById(`cell-${cellId}`);
        if(posicao.classList.contains('vazia')) {
            const img = document.createElement('img');
            img.src = "pecas/button.png";
            img.classList.add('posicao');
            posicao.appendChild(img);
            
        }else{
                break;
            }
        
    }
}
