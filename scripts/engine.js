import { Chess } from 'https://cdn.jsdelivr.net/npm/chess.js@1.0.0-beta.6/+esm';
import { movimentoIA } from './MovimentoIA.js';
import { gerarFenDoTabuleiro } from './gerarFen.js';
import { pst } from './tables.js';
import { getJogada,opennings } from './opennings.js';

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
    const isEndgame = board.flat().filter(p => p && p.type === 'q').length === 0;

    
    
    const whitePawnFiles = [0, 0, 0, 0, 0, 0, 0, 0];
    const blackPawnFiles = [0, 0, 0, 0, 0, 0, 0, 0];
    let bisposBrancos = 0;
    let bisposPretos = 0;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const peca = board[i][j];
            if (peca) {
                if (peca.type === 'p') {
                    if (peca.color === 'w') whitePawnFiles[j]++;
                    else blackPawnFiles[j]++;
                } else if (peca.type === 'b') {
                    if (peca.color === 'w') bisposBrancos++;
                    else bisposPretos++;
                }
            }
        }
    }
    
    
    if (bisposBrancos >= 2) totalScore += 50; 
    if (bisposPretos >= 2) totalScore -= 50;

    const DOUBLED_PAWN_PENALTY = -25;
    for (const count of whitePawnFiles) {
        if (count > 1) totalScore += (count - 1) * DOUBLED_PAWN_PENALTY;
    }
    for (const count of blackPawnFiles) {
        if (count > 1) totalScore -= (count - 1) * DOUBLED_PAWN_PENALTY;
    }


    

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const peca = board[i][j];
            if (peca) {
               
                const materialValue = valorPecas[peca.type];
                let valorPST;
                const tipoUpper = peca.type.toUpperCase();
                const indicePST = i * 8 + j;

                if (tipoUpper === 'K') {
                    const gamePhase = isEndgame ? 'eg' : 'mg';
                    valorPST = pst[peca.color][tipoUpper][gamePhase][indicePST];
                    
                    if (gamePhase === 'mg') {
                        if (peca.color === 'w') totalScore += protegerReiBranco(board, j, i);
                        else totalScore += protegerReiPreto(board, j, i); 
                    }
                } else {
                    valorPST = pst[peca.color][tipoUpper][indicePST];
                }
                const scoreBase = materialValue + valorPST;
                totalScore += (peca.color === 'w' ? scoreBase : -scoreBase);


                
                if (peca.type === 'p') {
                    if (peca.color === 'w') {
                        
                        if (pawnBrancoLivre(board, j, i)) {
                            totalScore += bonusPeaoBrancoLivre[i];
                        }
                       
                        if (i > 0) {
                            const pecaDiagEsq = board[i - 1][j - 1];
                            const pecaDiagDir = board[i - 1][j + 1];
                            if (pecaDiagEsq && pecaDiagEsq.type === 'p' && pecaDiagEsq.color === 'w') totalScore += 10;
                            if (pecaDiagDir && pecaDiagDir.type === 'p' && pecaDiagDir.color === 'w') totalScore += 10;
                        }
                    } else { 
                       
                        if (pawnPretoLivre(board, j, i)) {
                            totalScore += bonusPeaoPretoLivre[i];
                        }
                       
                        if (i < 7) {
                            const pecaDiagEsq = board[i + 1][j - 1];
                            const pecaDiagDir = board[i + 1][j + 1];
                            if (pecaDiagEsq && pecaDiagEsq.type === 'p' && pecaDiagEsq.color === 'b') totalScore -= 10;
                            if (pecaDiagDir && pecaDiagDir.type === 'p' && pecaDiagDir.color === 'b') totalScore -= 10;
                        }
                    }
                }
            }
        }
    }

    return totalScore;
}







function getAbertura(){
    const jogada = getJogada();
    
    const primeiraJogada = jogada[0]['inicial'];
    const segundaJogada = jogada[0]['final'];
    
    const aberturas = opennings['b'][segundaJogada];
    const abertura = aberturas[Math.floor(Math.random()  * Array.from(aberturas).length)];
    
    return abertura;
}

let aberturaEscolhida = null;


export function movimentoChess() {
    if(aberturaEscolhida === null){
        aberturaEscolhida= getAbertura();
        console.log(aberturaEscolhida);
       
    }
    if(aberturaEscolhida.length > 0){
        movimentoIA(aberturaEscolhida[0],'');
        let jogada = aberturaEscolhida.shift();
        return;
    }
    
    
    



    const profundidade =6; 
    const fen = gerarFenDoTabuleiro();
    const chess = new Chess(fen);
    const moves = ordemMovimentos(chess.moves({ verbose: true }),chess);
    
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

    const moves = ordemMovimentos(chess.moves({ verbose: true }),chess);
     
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
),chess);
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

function ordemMovimentos(moves, chess) {
    const valorPecas = { p: 100, n: 300, b: 300, r: 500, q: 900, k: 10000 };

    moves.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        
        if (a.flags.includes('c')) {
         
            scoreA = (valorPecas[a.captured] - valorPecas[a.piece]) + 1000; 
        }
        if (a.promotion) {
            scoreA += valorPecas[a.promotion];
        }

       
        const oponente = a.color === 'w' ? 'b' : 'w';
        if (chess.isAttacked(a.to, oponente)) {
          
            if (!a.flags.includes('c')) {
                
                scoreA -= valorPecas[a.piece];
            }
        }

       
        if (b.flags.includes('c')) {
            scoreB = (valorPecas[b.captured] - valorPecas[b.piece]) + 1000;
        }
        if (b.promotion) {
            scoreB += valorPecas[b.promotion];
        }
        const oponenteB = b.color === 'w' ? 'b' : 'w';
        if (chess.isAttacked(b.to, oponenteB)) {
            if (!b.flags.includes('c')) {
                scoreB -= valorPecas[b.piece];
            }
        }
        
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

