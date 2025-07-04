import { Chess } from 'https://cdn.jsdelivr.net/npm/chess.js@1.0.0-beta.6/+esm';
import { movimentoIA } from './MovimentoIA.js';
import { gerarFenDoTabuleiro } from './gerarFen.js';
import { pst } from './tables.js';



function valor(chess) {
    let totalScore = 0;
    const board = chess.board();
    const valorPecas = { p: 100, n: 300, b: 300, r: 500, q: 900, k: 20000 };

    const whitePawnFiles = [0, 0, 0, 0, 0, 0, 0, 0];
    const blackPawnFiles = [0, 0, 0, 0, 0, 0, 0, 0];

     const isEndgame = board.flat().filter(p => p && p.type === 'q').length === 0;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const peca = board[i][j];
            if (peca) {
               
                if (peca && peca.type === 'p') {
                if (peca.color === 'w') {
                    whitePawnFiles[j]++;
                    if(i>0){
                        const pecaFrente = board[i-1][j];
                        const pecaDiagonalEsquerda = board[i-1][j-1];
                        const pecaDiagonalDireita = board[i-1][j+1];

                        if(pecaDiagonalDireita &&  pecaDiagonalDireita.color === 'w' && pecaDiagonalDireita.type === 'p') {
                            totalScore += 15; 
                            }
                         if(pecaDiagonalDireita &&  pecaDiagonalDireita.color === 'b') {
                            totalScore += valorPecas[pecaDiagonalDireita.type] / 10; 
                            }

                        if(pecaDiagonalEsquerda &&  pecaDiagonalEsquerda.color === 'w' && pecaDiagonalEsquerda.type === 'p') {
                            totalScore += 15; 
                            }
                        if(pecaDiagonalEsquerda &&  pecaDiagonalEsquerda.color === 'b' ) {
                            totalScore += valorPecas[pecaDiagonalEsquerda.type] / 10; 
                            }
                    }
                    
                } else {
                    blackPawnFiles[j]++;
                    if(i<7){
                        const pecaFrente = board[i-1][j];
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
           



                const materialValue = valorPecas[peca.type];
               
                let valorPST;
                const tipoUpper = peca.type.toUpperCase();
                const indicePST = i * 8 + j;

                
                if (tipoUpper === 'K') {
                   
                    const gamePhase = isEndgame ? 'eg' : 'mg';
                    valorPST = pst[peca.color][tipoUpper][gamePhase][indicePST];
                } else {
                    valorPST = pst[peca.color][tipoUpper][indicePST];
                }

                const score = materialValue + valorPST;
                totalScore += (peca.color === 'w' ? score : -score);
            }
        }
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
    const profundidade =5; 
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
         
         movimentoIA(melhorJogada.lan);
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


