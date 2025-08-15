import { gerarFenDoTabuleiro } from "./gerarFen.js";
import { movimentoIA } from "./MovimentoIA.js";

export function stockfishJogada(dificuldade) {
    
    const stockfish = new Worker('./scripts/stockfish.js');

    const fen = gerarFenDoTabuleiro();

  
    stockfish.onmessage = (event) => {
        const data = event.data;

       
        if (typeof data === 'string' && data.includes('bestmove')) {
            const melhorJogada = data.split(' ')[1];
            console.log("IA escolheu a jogada:", melhorJogada);

          
            movimentoIA(melhorJogada, '');

            
            
        }
    };


    stockfish.postMessage('uci');
    stockfish.postMessage(`setoption name Skill Level value ${dificuldade}`);
    stockfish.postMessage(`position fen ${fen}`);
    stockfish.postMessage('go depth 15');
}
