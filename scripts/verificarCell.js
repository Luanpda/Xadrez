import { movimentoTorre,movimentoPeao } from "./movimento.js";
import { movimentoCavalo } from "./movimentoCavalo.js";
import { movimentoBispo } from "./movimentoBispo.js";
import { movimentoRainha } from "./movimentoRainha.js";
import { movimentoRei } from "./movimentoRei.js";

export function verificarCell(classes,id){
    if( classes.includes('torre') || classes.includes('torreBranca')){
        if(classes.includes('cell-marcada')) return;
        movimentoTorre(id);
    }
    if( classes.includes('cavalo') || classes.includes('cavaloBranco')){
        if(classes.includes('cell-marcada')) return;
        movimentoCavalo(id);
    }
    if( classes.includes('rei')  || classes.includes('reiBranco')){
        if(classes.includes('cell-marcada')) return;
        movimentoRei(id);
    }
    if( classes.includes('rainha')  || classes.includes('rainhaBranca')){
        if(classes.includes('cell-marcada')) return;
        movimentoRainha(id);
    }
    if( classes.includes('bispo')  || classes.includes('bispoBranco')){
        if(classes.includes('cell-marcada')) return;
        movimentoBispo(id);
    }
    if( classes.includes('peao')  ){
        if(classes.includes('cell-marcada')) return;
        movimentoPeao(id);
    }

}