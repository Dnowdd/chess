function removeMarks(){
    $('.poss').remove()
}
function proxPos(side, pos, qnt, color){
    result = [];

    //VER AS POSSIBILIDADES PARA FRENTE
    if(side == "front"){
        posSplit = pos.split('');
        posText = posSplit[0];
        posNum = parseInt(posSplit[1]);

        for(i=1; i<=qnt; i++){
            //VERIFICA A COR DA PEÇA
            if(color == 'w'){
                posNum++;
            }else if(color == 'b'){
                posNum--;
            }

            //VERIFICA SE NÃO HÁ NADA NA FRENTE, CASO CONTRÁRIO ELE NÃO RETORNA NADA
            if($.trim($('#'+posText+posNum).html())!==''){
                return result;
            }
            
            // VERIFICA SE O NÚMERO NÃO ESTÁ SAINDO DO LIMITE DO TABULEIRO
            if(posNum >= 1 && posNum <= 8){
                result.push(posText + posNum);
            }
        }

        return result;
    }
}

function verifyContain(coordinates){
    if($.trim($('#'+coordinates).html())!==''){
        return false;
    }

    return true;
}
function proxLetter(l,order){
    if(order == 'right'){
        switch(l){
            case 'a':
                return 'b';
            case 'b':
                return 'c';
            case 'c':
                return 'd';
            case 'd':
                return 'e';
            case 'e':
                return 'f';
            case 'f':
                return 'g';
            case 'g':
                return 'h';
            case 'h':
                return false;
        }
    }else if(order == 'left'){
        switch(l){
            case 'a':
                return false;
            case 'b':
                return 'a';
            case 'c':
                return 'b';
            case 'd':
                return 'c';
            case 'e':
                return 'd';
            case 'f':
                return 'e';
            case 'g':
                return 'f';
            case 'h':
                return 'g';
        }
    }
}

$('.piece').on('click', function(){
    removeMarks()
    posAtual = this.getAttribute('pos');
    pieceType = this.getAttribute('piece');

    if(pieceType == "pawn"){
        //CONFIGURAÇÃO DO PEÃO        
        proxFrente = proxPos('front', posAtual, 2, 'w');

        posNum = parseInt(posAtual.split('')[1]);
        posLetter = posAtual.split('')[0];

        proxFrente.forEach(element => {
            $('#'+element).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${element}')"><div class="mark"></div></div>`);
        });
    }else if(pieceType == "knight"){
        //CONFIGURAÇÃO DO CAVALO
        posNum = parseInt(posAtual.split('')[1]);
        posLetter = posAtual.split('')[0];

        frontSpace2 = parseInt(posAtual.split('')[1]) + 2;
        frontSpace1 = parseInt(posAtual.split('')[1]) + 1;

        backSpace2 = parseInt(posAtual.split('')[1]) - 2;
        backSpace1 = parseInt(posAtual.split('')[1]) - 1;

        leftSpace2 = proxLetter(posAtual.split('')[0], 'left');
        leftSpace1 = proxLetter(proxLetter(posAtual.split('')[0], 'left'), 'left');

        rightSpace2 = proxLetter(posAtual.split('')[0], 'right');
        rightSpace1 = proxLetter(proxLetter(posAtual.split('')[0], 'right'), 'right');

        predictLeftFront2 = leftSpace2+frontSpace2;
        predictLeftFront1 = leftSpace1+frontSpace1;

        predictRightFront2 = rightSpace2+frontSpace2;
        predictRightFront1 = rightSpace1+frontSpace1;

        predictLeftBack2 = leftSpace2+backSpace2;
        predictLeftBack1 = leftSpace1+backSpace1;

        predictRightBack2 = rightSpace2+backSpace2;
        predictRightBack1 = rightSpace1+backSpace1;

        if(frontSpace2 <= 8){
            if(verifyContain(predictLeftFront2) !== false){
                $('#'+predictLeftFront2).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${predictLeftFront2}')"><div class="mark"></div></div>`);
            }if(verifyContain(predictRightFront2) !== false){
                $('#'+predictRightFront2).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${predictRightFront2}')"><div class="mark"></div></div>`);
            }
        }if(frontSpace1 <= 8){
            if(verifyContain(predictLeftFront1) !== false){
                $('#'+predictLeftFront1).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${predictLeftFront1}')"><div class="mark"></div></div>`);
            }if(verifyContain(predictRightFront1) !== false){
                $('#'+predictRightFront1).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${predictRightFront1}')"><div class="mark"></div></div>`);
            }
        }if(backSpace2 >= 1){
            if(verifyContain(predictLeftBack2) !== false){
                $('#'+predictLeftBack2).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${predictLeftBack2}')"><div class="mark"></div></div>`);
            }if(verifyContain(predictRightBack2) !== false){
                $('#'+predictRightBack2).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${predictRightBack2}')"><div class="mark"></div></div>`);
            }
        }if(backSpace2 >= 1){
            if(verifyContain(predictLeftBack1) !== false){
                $('#'+predictLeftBack1).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${predictLeftBack1}')"><div class="mark"></div></div>`);
            }if(verifyContain(predictRightBack1) !== false){
                $('#'+predictRightBack1).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${predictRightBack1}')"><div class="mark"></div></div>`);
            }
        }
    }else if(pieceType == "bishop"){
        //CONFIGURAÇÃO DO BISPO
        posNum = parseInt(posAtual.split('')[1]);
        posLetter = posAtual.split('')[0];

        posLetterFrontRight = posLetter;
        posLetterFrontLeft = posLetter;
        posLetterBackRight = posLetter;
        posLetterBackLeft = posLetter;

        for(i=posNum+1;i<=8;i++){
            posLetterFrontRight = proxLetter(posLetterFrontRight,'right');
            posLetterFrontLeft = proxLetter(posLetterFrontLeft,'left');
            
            if(verifyContain(posLetterFrontRight+i) == false){
                break;
            }
            if(verifyContain(posLetterFrontLeft+i) == false){
                break;
            }

            $('#'+posLetterFrontRight+i).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterFrontRight + i}')"><div class="mark"></div></div>`);
            $('#'+posLetterFrontLeft+i).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterFrontLeft + i}')"><div class="mark"></div></div>`);
        }

        for(o=posNum-1;o>=1;o--){
            posLetterBackRight = proxLetter(posLetterBackRight,'right');
            posLetterBackLeft = proxLetter(posLetterBackLeft,'left');
            
            if(verifyContain(posLetterBackRight+o) == false){
                break;
            }
            if(verifyContain(posLetterBackLeft+o) == false){
                break;
            }

            $('#'+posLetterBackRight+o).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterBackRight + o}')"><div class="mark"></div></div>`);
            $('#'+posLetterBackLeft+o).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterBackLeft + o}')"><div class="mark"></div></div>`);
        }
    }else if(pieceType == "queen"){
        //CONFIGURAÇÃO DA RAINHA
        posNum = parseInt(posAtual.split('')[1]);
        posLetter = posAtual.split('')[0];

        posLetterFrontRight = posLetter;
        posLetterFrontLeft = posLetter;
        posLetterBackRight = posLetter;
        posLetterBackLeft = posLetter;

        posLetterRight = posLetter;
        posLetterLeft = posLetter;

        for(i=posNum+1;i<=8;i++){
            posLetterFrontRight = proxLetter(posLetterFrontRight,'right');
            posLetterFrontLeft = proxLetter(posLetterFrontLeft,'left');
            
            if(verifyContain(posLetterFrontRight+i) == false){
                break;
            }
            if(verifyContain(posLetterFrontLeft+i) == false){
                break;
            }

            $('#'+posLetterFrontRight+i).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterFrontRight + i}')"><div class="mark"></div></div>`);
            $('#'+posLetterFrontLeft+i).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterFrontLeft + i}')"><div class="mark"></div></div>`);

            // DEFINE AS OPÇÕES PARA CIMA
            if(verifyContain(posLetter+i) == false){
                break;
            }

            $('#'+posLetter+i).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetter + i}')"><div class="mark"></div></div>`);
        }

        for(o=posNum-1;o>=1;o--){
            posLetterBackRight = proxLetter(posLetterBackRight,'right');
            posLetterBackLeft = proxLetter(posLetterBackLeft,'left');

            if(verifyContain(posLetterBackRight+o) == false){
                break;
            }
            if(verifyContain(posLetterBackLeft+o) == false){
                break;
            }

            $('#'+posLetterBackRight+o).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterBackRight + o}')"><div class="mark"></div></div>`);
            $('#'+posLetterBackLeft+o).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterBackLeft + o}')"><div class="mark"></div></div>`);

            // DEFINE AS OPÇÕES PARA BAIXO
            if(verifyContain(posLetter+o) == false){
                break;
            }

            $('#'+posLetter+o).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetter + o}')"><div class="mark"></div></div>`);
        }

        for(u=posNum-1;u>=1;u--){
            posLetterRight = proxLetter(posLetterRight,'right');
            posLetterLeft = proxLetter(posLetterLeft,'left');
            
            if(verifyContain(posLetterRight+posNum) == false){
                break;
            }
            if(verifyContain(posLetterLeft+posNum) == false){
                break;
            }

            $('#'+posLetterRight+posNum).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterRight + posNum}')"><div class="mark"></div></div>`);
            $('#'+posLetterLeft+posNum).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterLeft + posNum}')"><div class="mark"></div></div>`);
        }
    }else if(pieceType == "rook"){
        //CONFIGURAÇÃO DA TORRE
        posNum = parseInt(posAtual.split('')[1]);
        posLetter = posAtual.split('')[0];

        posLetterRight = posLetter;
        posLetterLeft = posLetter;

        for(i=posNum+1;i<=8;i++){
            // DEFINE AS OPÇÕES PARA CIMA
            if(verifyContain(posLetter+i) == false){
                break;
            }
            $('#'+posLetter+i).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetter + i}')"><div class="mark"></div></div>`);
        }

        for(o=posNum-1;o>=1;o--){
            // DEFINE AS OPÇÕES PARA BAIXO
            if(verifyContain(posLetter+o) == false){
                break;
            }
            $('#'+posLetter+o).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetter + o}')"><div class="mark"></div></div>`);
        }

        for(u=posNum-1;u>=1;u--){
            posLetterRight = proxLetter(posLetterRight,'right');
            posLetterLeft = proxLetter(posLetterLeft,'left');

            console.log(u);
            
            if(verifyContain(posLetterRight+posNum) == false){
                console.log('deu');
            }
            if(verifyContain(posLetterLeft+posNum) == false){
                console.log('deu');
            }

            $('#'+posLetterRight+posNum).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterRight + posNum}')"><div class="mark"></div></div>`);
            $('#'+posLetterLeft+posNum).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterLeft + posNum}')"><div class="mark"></div></div>`);
        }
    }
});

function changePosition(atualPos, nextPos){
    removeMarks()
    $('#'+atualPos).children().appendTo('#'+nextPos);
    $('#'+nextPos+' > div').attr('pos', nextPos);
}