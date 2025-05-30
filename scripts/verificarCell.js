import { movimentoTorre,movimentoPeao } from "./movimento.js";
import { movimentoCavalo } from "./movimentoCavalo.js";

export function verificarCell(classes,id){
    if( classes.includes('torre') || classes.includes('torreBranca')){
        movimentoTorre(id);
    }
    if( classes.includes('cavalo') || classes.includes('cavaloBranco')){
        movimentoCavalo(id);
    }
    if( classes.includes('rei')){
        movimentoRei(id);
    }
    if( classes.includes('rainha')){
        movimentoRainha(id);
    }
    if( classes.includes('bispo')){
        movimentoBispo(id);
    }
    if( classes.includes('peao')){
        
        movimentoPeao(id);
    }

}