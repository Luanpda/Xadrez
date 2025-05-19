import { movimentoTorre } from "./movimento.js";


export function verificarCell(classes,id){
    if( classes.includes('torre')){
        movimentoTorre(id);
    }
    if( classes.includes('cavalo')){
        movimentoCavalo();
    }
    if( classes.includes('rei')){
        movimentoRei();
    }
    if( classes.includes('rainha')){
        movimentoRainha();
    }
    if( classes.includes('bispo')){
        movimentoBispo();
    }
    if( classes.includes('peao')){
        movimentoBispo();
    }

}