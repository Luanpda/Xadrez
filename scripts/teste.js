import { gerarFenDoTabuleiro } from "./gerarFen.js";

export async function chamarIA() {
    
    const fenAtual = gerarFenDoTabuleiro();

    if (fenAtual) {
        
        const jogadaDaIA_UCI = await pedirJogadaDaIA(fenAtual); 

        
        if (jogadaDaIA_UCI) {
            console.log(jogadaDaIA_UCI)
        }
    }
}


 async function pedirJogadaDaIA(fen) {
    const urlServidor = 'http://127.0.0.1:5000/get_move';
    try {
        const resposta = await fetch(urlServidor, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fen: fen }),
        });
        const dados = await resposta.json();
        return dados.movimento;
    } catch (erro) {
        console.error("Falha ao comunicar com a IA:", erro);
        return null;
    }
}