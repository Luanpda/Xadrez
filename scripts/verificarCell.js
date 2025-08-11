import { movimentoTorre,movimentoPeao } from "./movimento.js";
import { movimentoCavalo } from "./movimentoCavalo.js";
import { movimentoBispo } from "./movimentoBispo.js";
import { movimentoRainha } from "./movimentoRainha.js";
import { movimentoRei } from "./movimentoRei.js";
import { movimentoElefante } from "./movimentoElefante.js";
import { movimentoGato } from "./movimentoGato.js";
import { movimentoGarca } from "./movimentoGarca.js";
import { movimentoGafanhoto } from "./movimemtoGafanhoto.js";
import { movimentoCamelo } from "./movimentoCamelo.js";
import { movimentoOrnamento } from "./movimentoOrnamento.js";
import { movimentoTp } from "./tpMovimento.js"
import { movimentoDragao } from "./movDragao.js";

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
    if( classes.includes('elefante')  || classes.includes('elefanteBranco')){
        if(classes.includes('cell-marcada')) return;
        movimentoElefante(id);
    }
    if( classes.includes('gato')  || classes.includes('gatoBranco')){
        if(classes.includes('cell-marcada')) return;
        movimentoGato(id);
    }
    if( classes.includes('garca')  || classes.includes('garcaBranco')){
        if(classes.includes('cell-marcada')) return;
        movimentoGarca(id);
    }
    if( classes.includes('gafanhoto')  || classes.includes('gafanhotoBranco')){
        if(classes.includes('cell-marcada')) return;
        movimentoGafanhoto(id);
    }
    if( classes.includes('camelo')  || classes.includes('cameloBranco')){
        if(classes.includes('cell-marcada')) return;
        movimentoCamelo(id);
    }
    if( classes.includes('ornamento')  || classes.includes('ornamentoBranco')){
        if(classes.includes('cell-marcada')) return;
        movimentoOrnamento(id);
    }
    if( classes.includes('tp')  || classes.includes('tpBranco')){
        if(classes.includes('cell-marcada')) return;
        movimentoTp(id);
    }
    if( classes.includes('dragao')  || classes.includes('dragaoBranco')){
        if(classes.includes('cell-marcada')) return;
        movimentoDragao(id);
    }

}