
import { getModoDeJogo } from "./colocarPecas.js";
import { movimentoChess } from "./engine.js";
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
export function trocarMovimento(isBranco) {
    const todasPecas = document.querySelectorAll('[data-posicao]');
    console.log(isBranco)
    if(isBranco){
        const pecas = Array.from(todasPecas).filter(peca => {
        const classesDaPeca = peca.className;
        return !classesDaPeca.includes('Branc'); 
    });
    pecas.forEach(peca => {
            peca.dataset.turno = 'true';
        });
        turno.innerHTML = 'Turno Preto';
        const modoAtual = getModoDeJogo();
         if(modoAtual === 'IA'){
            setTimeout( ()=> {
                movimentoChess()
            },100);
            
         }

    }else {
        
        const pecas = Array.from(todasPecas).filter(peca => {
        const classesDaPeca = peca.className;
        return classesDaPeca.includes('Branc');
    });
    pecas.forEach(peca => {
            peca.dataset.turno = 'true';
        });
        turno.innerHTML = 'Turno Branco'
    }
    

}

export function impedirMovimento() {
    const todasPecas = document.querySelectorAll('[data-posicao]');
    Array.from(todasPecas).forEach(peca => {
        peca.dataset.turno = 'false';

    })
    
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
            setTimeout( ()=> {
                movimentoChess()
            },100);
            
         }
         
         
    }else {
        divsPretos.forEach(peca => peca.dataset.turno = 'false');
        divsBrancos.forEach(peca => peca.dataset.turno = 'true');
        turno.innerHTML = 'Turno: Branco';
        atualizarMovimento()
        
    }
    
        
}
    


