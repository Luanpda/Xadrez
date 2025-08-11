import { getNumeroJogadas } from "./turno.js";
import { posicionarPeca } from "./posicionarPecas.js";
let vantagemDefinida = false;
let spawnRateBranco = 0.1;
let spawnRatePreto = 0.1;
let pecaBrancaSpawned = false;
let pecaPretaSpawned = false;

export function resetarPecaSpawned() {
    pecaBrancaSpawned = false;
    pecaPretaSpawned = false;
    spawnRateBranco = 0.1;
    spawnRatePreto = 0.1;
}

export function spawnPecaEspecial(){

    if(pecaBrancaSpawned && pecaPretaSpawned) return;

    let numeroDasJogadas = getNumeroJogadas() -1;

    console.log(`Número de jogadas no spawn: ${numeroDasJogadas}`);
    if(numeroDasJogadas >= 20){


        const todasPecas = document.querySelectorAll('[data-posicao]');
        
        const numPecasBrancas = Array.from(todasPecas).filter(peca => {
            const classesPeca = peca.className;
            return classesPeca.includes('Branc');
        });
        const  numPecasPretas = Array.from(todasPecas).filter(peca => {
            const classesPeca = peca.className;
            return !classesPeca.includes('Branc');
        });
        




         const increaseRate = 0.002;
        // const increaseRate = 0.1;
        if(!vantagemDefinida){
           spawnRateBranco =  numPecasBrancas.length < numPecasPretas.length  ?0.05  : 0.01 ;
           spawnRatePreto =  numPecasPretas.length < numPecasBrancas.length ? 0.05 : 0.01 ;
            // spawnRateBranco =  numPecasBrancas.length > numPecasPretas.length  ?0.3  : 0.8 ;
            // spawnRatePreto =  numPecasPretas.length > numPecasBrancas.length ? 0.3 : 0.8 ;
           vantagemDefinida = true;
        }
        spawnRateBranco = Math.min(spawnRateBranco + increaseRate, 1);
        spawnRatePreto = Math.min(spawnRatePreto + increaseRate, 1);
        console.log(`Spawn rate Branco: ${spawnRateBranco}`);
        console.log(`Spawn rate Preto: ${spawnRatePreto}`);
        
        const letrasCasas = ['a','b','c','d','e','f','g','h','i','j'];
        const numeroCasas = ['10','9','8','7','6','5','4','3','2','1'];
        let random;
        const srcBranco = ['newPecas/branca/commonr-w.svg','newPecas/branca/dragao.png'];
        const srcPreto = ['newPecas/preta/commonr-b.svg','newPecas/preta/dragao.png'];
        


        const classeBranco = ['tpBranco','dragaoBranco'];
        const classePreto = ['tp','dragao'];

        
        if(numeroDasJogadas % 2 === 0 && !pecaBrancaSpawned){
           
            if(Math.random() < spawnRateBranco && numPecasBrancas.length > 0){
                let cellSpawn;
                let casaSpawn;
                do{
                    casaSpawn = `${letrasCasas[Math.floor(Math.random() * 10)]}`+`${numeroCasas[Math.floor(Math.random() * 10)]}`;
                    console.log(`Casa de spawn branca: ${casaSpawn}`);
                    cellSpawn = document.querySelector(`.${casaSpawn}`);
                }while(!cellSpawn.classList.contains('vazia'));

                random  = Math.floor(Math.random() * srcBranco.length);
           
              
                posicionarPeca(`${casaSpawn}`, srcBranco[random], classeBranco[random]);
                pecaBrancaSpawned= true;

            }
        }if(numeroDasJogadas % 2 === 1){
            if(!pecaPretaSpawned){
                 if(Math.random() < spawnRatePreto && numPecasPretas.length > 0){   
                let cellSpawn;
                let casaSpawn;
                do{
                    casaSpawn = `${letrasCasas[Math.floor(Math.random() * 10)]}`+`${numeroCasas[Math.floor(Math.random() * 10)]}`;
                    console.log(`Casa de spawn branca: ${casaSpawn}`);
                    cellSpawn = document.querySelector(`.${casaSpawn}`);
                }while(!cellSpawn.classList.contains('vazia'));

             
                random  = Math.floor(Math.random() * srcBranco.length);
           
              
                posicionarPeca(`${casaSpawn}`, srcPreto[random], classePreto[random]);
                pecaPretaSpawned = true;
                }
            }
           
        }
        
        
    }
}