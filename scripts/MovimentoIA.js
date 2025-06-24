import { alternarTurno } from "./turno.js";

export function movimentoIA(movimento){

    const pecaInicial = document.querySelector(`.${movimento.slice(0,2)}`)
    const destinoDaPeca = document.querySelector(`.${movimento.slice(2)}`)
    console.log(pecaInicial)
    console.log(destinoDaPeca)
    const classesPecas = ['peao', 'torre', 'bispo', 'cavalo', 'rainha', 'rei', 
                      'peaoBranco', 'torreBranca', 'bispoBranco', 'cavaloBranco', 'rainhaBranca', 'reiBranco'];

    const imgInicial = pecaInicial.querySelector('img');
    const imgAlvo = destinoDaPeca.querySelector('img');
    if(imgAlvo) destinoDaPeca.removeChild(imgAlvo)
    
    console.log(pecaInicial.classList)

    const classesValidas = Array.from(pecaInicial.classList).filter(classe => classesPecas.includes(classe));
    const pecaBranca = classesValidas.some(iten => iten.includes('Branc') )
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

            pecaInicial.removeChild(imgInicial)
            destinoDaPeca.appendChild(imgInicial)
            return;
        }
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