import { limparMovimento, limparMovimentos } from "./movimento.js";

import { classesPecas, tabuleiro } from "./tables.js";
import { movimentoPadraoCaptura } from "./movimento.js";
export function movimentoOrnamento(id) {
    const idCell = Number(id.split('-')[1]);
    const linha = Math.floor(idCell / 10);
    const coluna = idCell % 10;
    const ornamento = document.getElementById(id);


    const isBranco = ornamento.classList.contains('ornamentoBranco');
    if (ornamento.dataset.turno === 'false') return;
    if (ornamento.dataset.posicao === 'true') {
        limparMovimentos();
        ornamento.setAttribute('data-posicao', 'false');
        return;
    }
    limparMovimento();
    ornamento.setAttribute('data-posicao', 'true');
    limparMovimentos();






    const direcoes = [
        { dl: 0, dc: 1 },   // direita
        { dl: 0, dc: -1 },  // esquerda
        { dl: 1, dc: 0 },   // baixo
        { dl: -1, dc: 0 },  // cima

    ];
    let pecaMarcadaDireita = 0;
    let pecaMarcadaEsquerda = 0;
    let pecaMarcadaCima = 0;
    let pecaMarcadaBaixo = 0;

    for (const { dl, dc } of direcoes) {
        let i = linha + dl;
        let j = coluna + dc;

        while (i >= 0 && i < 10 && j >= 0 && j < 10) {
            const cellId = `cell-${tabuleiro[i][j]}`;
            let cellDaFrente;
            if (i + dl >= 0 && i + dl < 10 && j + dc >= 0 && j + dc < 10) {
                cellDaFrente = document.getElementById(`cell-${tabuleiro[i + dl][j + dc]}`);
            }


            const cellPosicao = document.getElementById(cellId);
            if (cellPosicao.classList.contains('vazia')) {

                const imgFrente = document.createElement('img');
                imgFrente.src = "pecas/button.png";
                imgFrente.classList.add('posicao');
                cellPosicao.classList.add('posicao-cell');

                cellPosicao.appendChild(imgFrente);




            } else {
                if (isBranco) {
                    if (Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'))) {
                        break;
                    } else {

                        if (pecaMarcadaDireita === 0 && dl === 0 && dc === 1) {
                            cellPosicao.classList.add('cell-marcada');
                            cellPosicao.classList.add('posicao-cell');
                            pecaMarcadaDireita++;
                        }
                        if (pecaMarcadaEsquerda === 0 && dl === 0 && dc === -1) {
                            cellPosicao.classList.add('cell-marcada');
                            cellPosicao.classList.add('posicao-cell');
                            pecaMarcadaEsquerda++;
                        }
                        if (pecaMarcadaCima === 0 && dl === -1 && dc === 0) {
                            cellPosicao.classList.add('cell-marcada');
                            cellPosicao.classList.add('posicao-cell');
                            pecaMarcadaCima++;
                        }
                        if (pecaMarcadaBaixo === 0 && dl === 1 && dc === 0) {
                            cellPosicao.classList.add('cell-marcada');
                            cellPosicao.classList.add('posicao-cell');
                            pecaMarcadaBaixo++;
                        }


                    }
                }
                else {
                    if (Array.from(cellPosicao.classList).some(classe => classe.includes('Branc'))) {

                        if (pecaMarcadaDireita === 0 && dl === 0 && dc === 1) {
                            cellPosicao.classList.add('cell-marcada');
                            cellPosicao.classList.add('posicao-cell');
                            pecaMarcadaDireita++;
                        }
                        if (pecaMarcadaEsquerda === 0 && dl === 0 && dc === -1) {
                            cellPosicao.classList.add('cell-marcada');
                            cellPosicao.classList.add('posicao-cell');
                            pecaMarcadaEsquerda++;
                        }
                        if (pecaMarcadaCima === 0 && dl === -1 && dc === 0) {
                            cellPosicao.classList.add('cell-marcada');
                            cellPosicao.classList.add('posicao-cell');
                            pecaMarcadaCima++;
                        }
                        if (pecaMarcadaBaixo === 0 && dl === 1 && dc === 0) {
                            cellPosicao.classList.add('cell-marcada');
                            cellPosicao.classList.add('posicao-cell');
                            pecaMarcadaBaixo++;

                        }
                    } else {
                        break
                    }

                }
            }





            i += dl;
            j += dc;

        }

    }


    document.querySelector('.tabuleiro').addEventListener('pointerdown', (evento) => {
        const cell = evento.target.closest('.posicao-cell');

        if (!cell) return;
        const pecaCliclada = document.querySelector('[data-posicao="true"]');
        if (!pecaCliclada) return;

        limparMovimentos();
        movimentoPadraoCaptura(cell, pecaCliclada, isBranco, classesPecas, 'ornamento.png', 'ornamento.png', 'ornamento');
    }, { once: true });



}