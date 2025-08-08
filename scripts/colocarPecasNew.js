

export function colocarPecasNew() {
    //peoes
    for( let i = 80; i < 90; i++ ){
        const img = document.createElement('img');
            img.src = "pecas/branco/pawn-w.svg";
            img.classList.add('peca','peaoImg',);
           
            const cell = document.getElementById(`cell-${i}`);
            cell.setAttribute('data-movimento', true);
            cell.setAttribute('data-posicao', false);
            cell.setAttribute('data-turno','true');
            
            cell.classList.remove('vazia');
            cell.classList.add('peao', 'peaoBranco');
            
            cell.appendChild(img);
    }
    for( let i = 10; i < 20; i++ ){
        const img = document.createElement('img');
            img.src = "pecas/preto/pawn-b.svg";
            img.classList.add('peca','peaoImg',);
           
            const cell = document.getElementById(`cell-${i}`);
            cell.setAttribute('data-movimento', true);
            cell.setAttribute('data-posicao', false);
            cell.setAttribute('data-turno','false');
            
            cell.classList.remove('vazia');
            cell.classList.add('peao');
            
            cell.appendChild(img);
    }
    //pecas brancas 
    
    const pecasBrancas = [['newPecas/branca/ornamento.png'],['newPecas/branca/elefante.png'],['newPecas/branca/camelo.png'],['newPecas/branca/garca.png'],['pecas/branco/king-w.svg'],['newPecas/branca/gato.png'],['newPecas/branca/gafanhoto.png'],['newPecas/branca/camelo.png'],['newPecas/branca/elefante.png'],['newPecas/branca/ornamento.png']];

    const classesBrancas = ['ornamentoBranco','elefanteBranco','cameloBranco','garcaBranco','reiBranco','gatoBranco','gafanhotoBranco','cameloBranco','elefanteBranco','ornamentoBranco'];

    for(let i = 0; i <10; i++){
            const img = document.createElement('img');
            img.src = pecasBrancas[i];
            img.classList.add('peca', classesBrancas[i]);
            
           
            const cell = document.getElementById(`cell-${90+i}`);
            cell.classList.remove('vazia');
            cell.setAttribute('data-posicao', false);
            cell.setAttribute('data-turno','true');
            cell.classList.add(classesBrancas[i]);
            cell.appendChild(img);
        }
        

        //Pretas
         const pecasPretas = [['newPecas/preta/ornamento.png'],['newPecas/preta/elefante.png'],['newPecas/preta/camelo.png'],['newPecas/preta/gafanhoto.png'],['newPecas/preta/gato.png'],['pecas/preto/king-b.svg'],['newPecas/preta/garca.png'],['newPecas/preta/camelo.png'],['newPecas/preta/elefante.png'],['newPecas/preta/ornamento.png']];

         const classesPretas = ['ornamento','elefante','camelo','gafanhoto','gato','rei','garca','camelo','elefante','ornamento'];

        for(let i = 0; i <10; i++){
            const img = document.createElement('img');
            img.src = pecasPretas[i];
            img.classList.add('peca', classesPretas[i]);
            
           
            const cell = document.getElementById(`cell-${i}`);
            cell.classList.remove('vazia');
            cell.setAttribute('data-posicao', false);
            cell.setAttribute('data-turno','false');
             cell.classList.add(classesPretas[i]);
            cell.appendChild(img);
        }
          
  

}
