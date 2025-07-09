import { Chess } from 'https://cdn.jsdelivr.net/npm/chess.js@1.0.0-beta.6/+esm';
import { movimentoIA } from './MovimentoIA.js';
import { gerarFenDoTabuleiro } from './gerarFen.js';
import { pst } from './tables.js';

   const bonusPeaoBrancoLivre = [
    0,   
    120, 
    80,  
    50,  
    30, 
    15,  
    0,   
    0    
];
const bonusPeaoPretoLivre = [
    0,   
    -120, 
    -80,  
    -50,  
    -30, 
    -15,  
    0,   
    0    
]


function valor(chess) {
    let totalScore = 0;
    const board = chess.board();
    const valorPecas = { p: 100, n: 300, b: 300, r: 500, q: 900, k: 20000 };

    const whitePawnFiles = [0, 0, 0, 0, 0, 0, 0, 0];
    const blackPawnFiles = [0, 0, 0, 0, 0, 0, 0, 0];
    let bisposBrancos = 0;
    let bisposPretos = 0;
    let valorPST;
     const isEndgame = board.flat().filter(p => p && p.type === 'q').length === 0;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const peca = board[i][j];
            if (peca) {
               
                if (peca && peca.type === 'p') {
                if (peca.color === 'w') {
                    const peaoLivre = pawnBrancoLivre(board,j,i); 
                    if(peaoLivre){
                        totalScore += bonusPeaoBrancoLivre[i]; 
                    }
                    whitePawnFiles[j]++;
                    if(i>0){
                        
                        const pecaDiagonalEsquerda = board[i-1][j-1];
                        const pecaDiagonalDireita = board[i-1][j+1];

                        // Verifica se a peça diagonal direita é um peão branco
                        if(pecaDiagonalDireita &&  pecaDiagonalDireita.color === 'w' && pecaDiagonalDireita.type === 'p') {
                            totalScore += 15; 
                            }
                        // Verifica se a peça diagonal direita é uma peça preta
                         if(pecaDiagonalDireita &&  pecaDiagonalDireita.color === 'b') {
                            totalScore += valorPecas[pecaDiagonalDireita.type] / 10; 
                            }

                        // Verifica se a peça diagonal esquerda é um peão preto
                        if(pecaDiagonalEsquerda &&  pecaDiagonalEsquerda.color === 'w' && pecaDiagonalEsquerda.type === 'p') {
                            totalScore += 15; 
                            }
                        // Verifica se a peça diagonal esquerda é uma peça preta
                        if(pecaDiagonalEsquerda &&  pecaDiagonalEsquerda.color === 'b' ) {
                            totalScore += valorPecas[pecaDiagonalEsquerda.type] / 10; 
                            }
                        
                        



                    }
                    
                } else {
                    blackPawnFiles[j]++;
                    const peaoLivre = pawnPretoLivre(board,j,i); 
                    if(peaoLivre){
                        totalScore += bonusPeaoPretoLivre[7-i]; 
                    }
                    if(i<7){
                        
                        const pecaDiagonalEsquerda = board[i+1][j-1];
                        const pecaDiagonalDireita = board[i+1][j+1];

                        if(pecaDiagonalDireita &&  pecaDiagonalDireita.color === 'b' && pecaDiagonalDireita.type === 'p') {
                            totalScore -= 15; 
                            }
                        if(pecaDiagonalDireita &&  pecaDiagonalDireita.color === 'w') {
                            totalScore -= valorPecas[pecaDiagonalDireita.type] / 10; 
                            }


                        if(pecaDiagonalEsquerda && pecaDiagonalEsquerda.color === 'b' && pecaDiagonalEsquerda.type === 'p') {
                            totalScore -= 15; 
                            }
                         if(pecaDiagonalEsquerda && pecaDiagonalEsquerda.color === 'w' ) {
                            totalScore -= valorPecas[pecaDiagonalEsquerda.type] / 10; 
                            }
                    }
                }
            }
            if(peca.type === 'b' && peca.color === 'w'){
                bisposBrancos++;
            }
            if(peca.type === 'b' && peca.color === 'b'){
                bisposPretos++;
            }
            


                const materialValue = valorPecas[peca.type];
               
                
                const tipoUpper = peca.type.toUpperCase();
                const indicePST = i * 8 + j;

                
                if (tipoUpper === 'K') {
                   
                    const gamePhase = isEndgame ? 'eg' : 'mg';
                    if(gamePhase === 'mg' && peca.color === 'w'){
                        totalScore += protegerReiBranco(board,j,i);
                    }
                if(gamePhase === 'mg' && peca.color === 'b'){
                        totalScore += protegerReiPreto(board,j,i);
                    }
                    valorPST = pst[peca.color][tipoUpper][gamePhase][indicePST];
                } else {
                    valorPST = pst[peca.color][tipoUpper][indicePST];
                }

                const score = materialValue + valorPST;
                totalScore += (peca.color === 'w' ? score : -score);
            }
        }
    }
    

    if(bisposBrancos=== 2){
                totalScore += 60; 
            }

    if(bisposPretos=== 2){
                totalScore -= 60;
            }

     for( const cont of whitePawnFiles){
        if(cont > 1){
            totalScore -= (cont - 1) * 25;
        }
    }
    for( const cont of blackPawnFiles){
        if(cont > 1){
            totalScore += (cont - 1) * 25;
        }
    }

    return totalScore;
}


export function movimentoChess() {
    const profundidade =6; 
    const fen = gerarFenDoTabuleiro();
    const chess = new Chess(fen);
    const moves = ordemMovimentos(chess.moves({ verbose: true }));
    
    let melhorJogada = null;
    let melhorScore;

    const turno = chess.turn();

    
    if (turno === 'w') {
       
        melhorScore = -Infinity;
        for (const move of moves) {
            chess.move(move);
            
            const score = minimax(profundidade - 1, chess, false,-Infinity,Infinity);
            chess.undo();

            console.log(`Analisando a jogada ${move.san}... Score resultante: ${score}`);
            if (score > melhorScore) {
                melhorScore = score;
                melhorJogada = move;
                console.log(`--- Nova melhor jogada para as Brancas: ${move.san} com score ${score} ---`);
            }
                }
    } else { 
        
        melhorScore = Infinity;
        for (const move of moves) {
            chess.move(move);
            
            const score = minimax(profundidade - 1, chess, true,-Infinity,Infinity);
            chess.undo();
            
            console.log(`Analisando a jogada ${move.san}... Score resultante: ${score}`);
            if (score < melhorScore) { 
                melhorScore = score;
                melhorJogada = move;
                console.log(`--- Nova melhor jogada para as Pretas: ${move.san} com score ${score} ---`);
            }
            
        }
    }
    
    console.log(`FIM DA BUSCA. Score final escolhido: ${melhorScore}`);
    console.log("Jogada final escolhida:", melhorJogada);

    if (melhorJogada) {
         
         movimentoIA(melhorJogada.from + melhorJogada.to, melhorJogada.promotion);
    }
}



function minimax(profundidade,chess,isMaximizingPlayer,alpha,beta){

    

    if(profundidade === 0 || chess.isGameOver()){
        return buscaDeSegurança(chess,alpha,beta,isMaximizingPlayer, 6)
    }

    const moves = ordemMovimentos(chess.moves({ verbose: true }));
     
    //vez brancas
    if(isMaximizingPlayer){
        let maiorScore = -Infinity;
        
        for(const move of moves){
            chess.move(move)
            const score = minimax(profundidade -1, chess,false,alpha,beta);
            alpha = Math.max(alpha, score);
            chess.undo();
            if (beta <= alpha) {
                break; 
            }
           
            
            maiorScore = Math.max(maiorScore,score);
    }
    return maiorScore;
    //vez pretas
    }else{
        let maiorScore= Infinity;
        
        for(const move of moves){
            chess.move(move)
            const score = minimax(profundidade -1, chess,true,alpha,beta);
            beta = Math.min(beta, score);
            chess.undo();
            // console.log(`Maior score: ${maiorScore} e score:${score}`)
            
            if (beta <= alpha) {
                break; 
            }
            
            maiorScore = Math.min(maiorScore,score);
    }
        return maiorScore;
    }
     

}


function buscaDeSegurança(chess,alpha, beta, isMaximizingPlayer,profundidade){
    if (profundidade === 0 || chess.isGameOver()) {
        if (chess.isCheckmate()) {
            return isMaximizingPlayer ? -Infinity : Infinity; 
        }
        return valor(chess); 
    }
    
    const valorInicial = valor(chess);

     if (isMaximizingPlayer) {
        alpha = Math.max(alpha, valorInicial);
        if (valorInicial >= beta) {
            return valorInicial;
        }
    } else { 
        beta = Math.min(beta, valorInicial);
        if (valorInicial <= alpha) {
            return valorInicial;
        }
    }
    const capturas = ordemMovimentos(chess.moves({ verbose: true }).filter(
    move => move.flags.includes('c') || move.promotion
));
    let melhorScore = valorInicial;

 for (const captura of capturas) {
        chess.move(captura);
       
        const score = buscaDeSegurança(chess, alpha, beta, !isMaximizingPlayer, profundidade -1);
        chess.undo();

        if (isMaximizingPlayer) {
            melhorScore = Math.max(melhorScore, score);
            alpha = Math.max(alpha, melhorScore);
        } else {
            melhorScore = Math.min(melhorScore, score);
            beta = Math.min(beta, melhorScore); 
        }

        if (beta <= alpha) {
            break; 
        }
    }
    
    return melhorScore;

}

function ordemMovimentos(moves){
    const valorPecas = { p: 100, n: 300, b: 300, r: 500, q: 900, k: 10000 };
   moves.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

       
        if (a.flags.includes('c')) scoreA = valorPecas[a.captured] - valorPecas[a.piece];
        if (b.flags.includes('c')) scoreB = valorPecas[b.captured] - valorPecas[b.piece];
        
      
        if (a.promotion) scoreA += valorPecas[a.promotion];
        if (b.promotion) scoreB += valorPecas[b.promotion];

        return scoreB - scoreA; 
    });
   
    return moves;
}

function pawnBrancoLivre(board,coluna,linha){
 
    for(let i = linha - 1; i >= 0; i--) {
       for(let j = coluna - 1; j <= coluna + 1; j++) {
        if (j >= 0 && j < 8) {
            const piece = board[i][j];
            if (piece && piece.type === 'p' && piece.color === 'b') {
                    return false; 
                }
                
        }


       }
    }
    return true;
}

function pawnPretoLivre(board,coluna,linha){
 
    for(let i = linha + 1; i <= 7; i++) {
       for(let j = coluna - 1; j <= coluna + 1; j++) {
        if (j >= 0 && j < 8) {
            const piece = board[i][j];
            if (piece && piece.type === 'p' && piece.color === 'w') {
                    return false; 
                }
                
        }


       }
    }
    return true;
}

function protegerReiBranco(board,coluna,linha){
       const direcoesBranco = [
        { dl: -1, dc: 0 },  // cima
        { dl: -1, dc: 1 },  // superior direita
        { dl: -1, dc: -1 }  // superior esquerda
    ];
    let scoreDePeoes = 0
    for (const { dl, dc } of direcoesBranco) {
        let i = linha + dl;
        let j = coluna + dc;

        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) continue;
        const piece = board[i][j];
        if(piece && piece.color === 'w' && piece.type === 'p'){
             scoreDePeoes += 10;
        }
    }
    return scoreDePeoes;

}
function protegerReiPreto(board,coluna,linha){
       const direcoesBranco = [
        { dl: 1, dc: 0 },  // cima
        { dl: 1, dc: 1 },  // superior direita
        { dl: 1, dc: -1 }  // superior esquerda
    ];
    let scoreDePeoes = 0
    for (const { dl, dc } of direcoesBranco) {
        let i = linha + dl;
        let j = coluna + dc;

        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) continue;
        const piece = board[i][j];
        if(piece && piece.color === 'b' && piece.type === 'p'){
             scoreDePeoes -= 10;
        }
    }
    return scoreDePeoes;

}