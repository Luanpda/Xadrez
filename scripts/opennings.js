let jogada = [];

export function setJogada(inicial,final) {
    jogada.push({inicial, final});
}

export function getJogada(){
    return jogada;
}


export const opennings = {
    b:{
        e4: [
            ['e7e5','b8c6','g8f6','f6e4','e4d6'],['c7c6','d7d5'],['e7e6','d7d5','g8f6']
        ],
        d4:[
            ['d7d5','c7c6'],['g8f6','c7c6','d7d5'],['d7d5','e7e6','a7a6']
        ],
        f3:[
            ['d7d5','c7c6','g8f6'],['g8f6','d7d5','c7c6'],['c7c6','g8f6','d7d5']
        ],
        c3:[
            ['d7d5','g8f6','c8f5'],['b8c6','d7d5','a7a6']
        ],
        c4:[
            ['c7c5', 'b8c6', 'g7g6'], ['e7e6', 'd7d5', 'g8f6']
        ],
    }    
}