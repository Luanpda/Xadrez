import { alternarTurno } from "./turno.js";

export  function movimentoIA(movimento,promocao){

    const pecaInicial = document.querySelector(`.${movimento.slice(0,2)}`)
    const destinoDaPeca = document.querySelector(`.${movimento.slice(2)}`)
    const promocaoSrcs = {
        'Q': 'queen-w.svg',
        'R': 'rook-w.svg',
        'B': 'bishop-w.svg',
        'N': 'knight-w.svg',
        'q': 'queen-b.svg',
        'r': 'rook-b.svg',
        'b': 'bishop-b.svg',
        'n': 'knight-b.svg'
    }
    const promocaoClasses = {
        'Q': 'rainhaBrnaca',
        'R': 'torreBranca',
        'B': 'bispoBranco',
        'N': 'cavaloBranco',
        'q': 'rainha',
        'r': 'torre',
        'b': 'bispo',
        'n': 'cavalo'
    }    
    const classesPecas = ['peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei', 
                      'peaoBranco', 'torreBranca', 'bispoBranco', 'cavaloBranco', 'rainhaBranca', 'reiBranco'];
    
    const imgInicial = pecaInicial.querySelector('img');
    const imgAlvo = destinoDaPeca.querySelector('img');
    if(imgAlvo) destinoDaPeca.removeChild(imgAlvo)
    const classesValidas = Array.from(pecaInicial.classList).filter(classe => classesPecas.includes(classe));
    const pecaBranca = classesValidas.some(iten => iten.includes('Branc') )

    if(promocao){
        const pecaPromovida = document.createElement('img');
        pecaPromovida.src = pecaBranca ? `pecas/branco/${promocaoSrcs[promocao]}` : `pecas/preto/${promocaoSrcs[promocao]}`;
        pecaPromovida.classList.add(promocaoClasses[promocao]);
        pecaPromovida.classList.add('peca');
        destinoDaPeca.appendChild(pecaPromovida);
        destinoDaPeca.classList.remove('vazia');
        destinoDaPeca.classList.remove(...Array.from(destinoDaPeca.classList).filter(classe => classesPecas.includes(classe)));
        console.log(promocaoClasses[promocao])
        destinoDaPeca.classList.add(promocaoClasses[promocao]);
        pecaInicial.classList.add('vazia');
        pecaInicial.classList.remove(...classesPecas);
        alternarTurno();
        pecaInicial.removeChild(imgInicial);
        return;

    }
   

    
    if(pecaBranca){

    }else{
        if(movimento.slice(0,2) === 'e8' && movimento.slice(2) === 'c8'){

        const torreRoque = document.getElementById('cell-0');
        const imgTorreInicial = torreRoque.querySelector('img')
        torreRoque.removeChild(imgTorreInicial);
        torreRoque.classList.add('vazia');
        torreRoque.classList.remove("torre");

        const newTorre = document.getElementById("cell-3");
        newTorre.appendChild(imgTorreInicial)
        destinoDaPeca.classList.remove(...Array.from(destinoDaPeca.classList).filter(classe => classesPecas.includes(classe)));
        destinoDaPeca.classList.remove('vazia')
        destinoDaPeca.classList.add(classesValidas);

        pecaInicial.classList.add('vazia')
        pecaInicial.classList.remove(classesValidas)
        alternarTurno()

        pecaInicial.removeChild(imgInicial)
        destinoDaPeca.appendChild(imgInicial)
        return;
        }
        if(movimento.slice(0,2) === 'e8' && movimento.slice(2) === 'g8'){
            const torreRoque = document.getElementById('cell-7');
            const imgTorreInicial = torreRoque.querySelector('img')
            torreRoque.removeChild(imgTorreInicial);
            torreRoque.classList.add('vazia');
            torreRoque.classList.remove("torre");

            const newTorre = document.getElementById("cell-5");
            newTorre.appendChild(imgTorreInicial)
            destinoDaPeca.classList.remove(...Array.from(destinoDaPeca.classList).filter(classe => classesPecas.includes(classe)));
            destinoDaPeca.classList.remove('vazia')
            destinoDaPeca.classList.add(classesValidas);
            
            pecaInicial.classList.add('vazia')
            pecaInicial.classList.remove(classesValidas)
            alternarTurno()

            newTorre.classList.remove('vazia');
            newTorre.classList.add('torre');
            pecaInicial.removeChild(imgInicial)
            destinoDaPeca.appendChild(imgInicial)
            return;
        }
    }
    if(pecaInicial.classList.contains('rei') || pecaInicial.classList.contains('reiBranco') || pecaInicial.classList.contains('torre') || pecaInicial.classList.contains('torreBranca')){
        pecaInicial.removeAttribute('data-movimentoroque');
    }
    destinoDaPeca.classList.remove(...Array.from(destinoDaPeca.classList).filter(classe => classesPecas.includes(classe)));
    destinoDaPeca.classList.remove('vazia')
    destinoDaPeca.classList.add(classesValidas);

    pecaInicial.classList.add('vazia')
    pecaInicial.classList.remove(classesValidas)
    alternarTurno()

    pecaInicial.removeChild(imgInicial)
    destinoDaPeca.appendChild(imgInicial)
    
    

}