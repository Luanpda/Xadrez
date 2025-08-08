import { getNumeroJogadas } from "./turno.js";
import { posicionarPeca } from "./posicionarPecas.js";
let vantagemDefinida = false;
let spawnRateBranco = 0.1;
let spawnRatePreto = 0.1;
let pecaBrancaSpawned = false;
let pecaPretaSpawned = false;
export function spawnPecaEspecial(){

    if(pecaBrancaSpawned && pecaPretaSpawned) return;

    let numeroDasJogadas = getNumeroJogadas() -1;

    console.log(`Número de jogadas no spawn: ${numeroDasJogadas}`);

    if(numeroDasJogadas >= 30){


        const todasPecas = document.querySelectorAll('[data-posicao]');
        
        const numPecasBrancas = Array.from(todasPecas).filter(peca => {
            const classesPeca = peca.className;
            return classesPeca.includes('Branc');
        });
        const  numPecasPretas = Array.from(todasPecas).filter(peca => {
            const classesPeca = peca.className;
            return !classesPeca.includes('Branc');
        });
        




        const increaseRate = 0.005;
        // const increaseRate = 0.1;
        if(!vantagemDefinida){
           spawnRateBranco =  numPecasBrancas.length > numPecasPretas.length  ?0.03  : 0.01 ;
           spawnRatePreto =  numPecasPretas.length > numPecasBrancas.length ? 0.03 : 0.01 ;
            // spawnRateBranco =  numPecasBrancas.length > numPecasPretas.length  ?0.3  : 0.1 ;
            // spawnRatePreto =  numPecasPretas.length > numPecasBrancas.length ? 0.3 : 0.1 ;
           vantagemDefinida = true;
        }
        spawnRateBranco = Math.min(spawnRateBranco + increaseRate, 0.3);
        spawnRatePreto = Math.min(spawnRatePreto + increaseRate, 0.3);
        console.log(`Spawn rate Branco: ${spawnRateBranco}`);
        console.log(`Spawn rate Preto: ${spawnRatePreto}`);
        
        const letrasCasas = ['a','b','c','d','e','f','g','h','i','j'];
        const numeroCasas = ['10','9','8','7','6','5','4','3','2','1'];

        

        
        if(numeroDasJogadas % 2 === 0 && !pecaBrancaSpawned){
           
            if(Math.random() < spawnRateBranco && numPecasBrancas.length > 0){
                let cellSpawn;
                let casaSpawn;
                do{
                    casaSpawn = `${letrasCasas[Math.floor(Math.random() * 10)]}`+`${numeroCasas[Math.floor(Math.random() * 10)]}`;
                    console.log(`Casa de spawn branca: ${casaSpawn}`);
                    cellSpawn = document.querySelector(`.${casaSpawn}`);
                }while(!cellSpawn.classList.contains('vazia'));
                
                
              
                posicionarPeca(`${casaSpawn}`, 'newPecas/branca/commonr-w.svg', 'tpBranco');
                pecaBrancaSpawned= true;

            }
        }else{
            if(!pecaPretaSpawned){
                 if(Math.random() < spawnRatePreto && numPecasPretas.length > 0){   
                let cellSpawn;
                let casaSpawn;
                do{
                    casaSpawn = `${letrasCasas[Math.floor(Math.random() * 10)]}`+`${numeroCasas[Math.floor(Math.random() * 10)]}`;
                    console.log(`Casa de spawn branca: ${casaSpawn}`);
                    cellSpawn = document.querySelector(`.${casaSpawn}`);
                }while(!cellSpawn.classList.contains('vazia'));

             
                posicionarPeca(casaSpawn, 'newPecas/preta/commonr-b.svg', 'tp');
                pecaPretaSpawned = true;
                }
            }
           
        }
        
        
    }
}