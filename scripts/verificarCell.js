import { movimentoTorre,movimentoPeao } from "./movimento.js";
import { movimentoCavalo } from "./movimentoCavalo.js";
import { movimentoBispo } from "./movimentoBispo.js";
import { movimentoRainha } from "./movimentoRainha.js";
import { movimentoRei } from "./movimentoRei.js";

export function verificarCell(classes,id){
    if( classes.includes('torre') || classes.includes('torreBranca')){
        movimentoTorre(id);
    }
    if( classes.includes('cavalo') || classes.includes('cavaloBranco')){
        movimentoCavalo(id);
    }
    if( classes.includes('rei')  || classes.includes('reiBranco')){
        movimentoRei(id);
    }
    if( classes.includes('rainha')  || classes.includes('rainhaBranca')){
        movimentoRainha(id);
    }
    if( classes.includes('bispo')  || classes.includes('bispoBranco')){
        movimentoBispo(id);
    }
    if( classes.includes('peao') ){
        
        movimentoPeao(id);
    }

}