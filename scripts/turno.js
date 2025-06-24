import { chamarIA } from "./teste.js";
import { getModoDeJogo } from "./colocarPecas.js";
const turno = document.getElementById('turno');


let movimentoAtual = gerarMovimento();

function gerarMovimento() {
    return Math.floor(Math.random() * 6);
}

 function atualizarMovimento() {
    movimentoAtual = gerarMovimento();
}

export function getMovimentoAtual() {
    return movimentoAtual;
}


export function alternarTurno(){
    const todasPecas = document.querySelectorAll('[data-posicao]');
    const divsBrancos = Array.from(todasPecas).filter(peca => {
    const classesDaPeca = peca.className;
    return classesDaPeca.includes('Branc');
});

const divsPretos = Array.from(todasPecas).filter(peca => { 
    const classesDaPeca = peca.className;
    return !classesDaPeca.includes('Branc');
    
})
    const turnoBrancas = Array.from(divsBrancos).some(peca => peca.dataset.turno === 'true');
    if(turnoBrancas){
        divsBrancos.forEach(peca => peca.dataset.turno = 'false');
        divsPretos.forEach(peca => peca.dataset.turno = 'true');
        atualizarMovimento()
        const modoAtual = getModoDeJogo();
        
         turno.innerHTML = 'Turno: Preto';
         if(modoAtual === 'IA'){
            chamarIA();
         }
         
         
    }else {
        divsPretos.forEach(peca => peca.dataset.turno = 'false');
        divsBrancos.forEach(peca => peca.dataset.turno = 'true');
        turno.innerHTML = 'Turno: Branco';
        atualizarMovimento()
        
    }
    
        
}
    


