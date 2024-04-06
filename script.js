function removeMarks(){
    $('.poss').remove();
    $('.killable').removeClass('killable');
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
function setKillablePieces(pos,color){
    if(color == "white"){
        if($('#'+pos+' > .piece')[0].getAttribute('color') == "black"){
            $('#'+pos).addClass('killable');
        }
    }else if(color == "black"){
        if($('#'+pos+' > .piece')[0].getAttribute('color') == "white"){
            $('#'+pos).addClass('killable');
        }
    }
}
function setPosDiagonals(pos,color){
    posNum = parseInt(pos.split('')[1]);
    posLetter = pos.split('')[0];

    posLetterFrontRight = posLetter;
    posLetterFrontLeft = posLetter;
    posLetterBackLeft = posLetter;
    posLetterBackRight = posLetter;

    for(i=posNum+1;i<=8;i++){
        // DEFINE AS OPCÕES PARA A DIAGONAL FRONTAL DA DIREITA
        posLetterFrontRight = proxLetter(posLetterFrontRight,'right');
        
        // VERIFICA SE EXISTE UMA PEÇA NA DIAGONAL DIREITA FRONTAL
        if(!verifyContain(posLetterFrontRight+i)){
            // VERIFICA SE ELE PODE COMER A PEÇA ALVO
            setKillablePieces(posLetterFrontRight+i,color);
            break;
        }

        $('#'+posLetterFrontRight+i).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterFrontRight + i}')"><div class="mark"></div></div>`);
    }
    for(i=posNum+1;i<=8;i++){
        // DEFINE AS OPCÕES PARA A DIAGONAL FRONTAL DA ESQUERDA
        posLetterFrontLeft = proxLetter(posLetterFrontLeft,'left');
        
        // VERIFICA SE EXISTE UMA PEÇA NA DIAGONAL ESQUERDA FRONTAL
        if(!verifyContain(posLetterFrontLeft+i)){
            // VERIFICA SE ELE PODE COMER A PEÇA ALVO
            setKillablePieces(posLetterFrontLeft+i,color);
            break;
        }

        $('#'+posLetterFrontLeft+i).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterFrontLeft + i}')"><div class="mark"></div></div>`);
    }
    for(i=posNum-1;i>=1;i--){
        // DEFINE AS OPCÕES PARA A DIAGONAL TRASEIRA DA ESQUERDA
        posLetterBackLeft = proxLetter(posLetterBackLeft,'left');
        
        // VERIFICA SE EXISTE UMA PEÇA NA DIAGONAL ESQUERDA TRASEIRA
        if(!verifyContain(posLetterBackLeft+i)){
            // VERIFICA SE ELE PODE COMER A PEÇA ALVO
            setKillablePieces(posLetterBackLeft+i,color);
            break;
        }

        $('#'+posLetterBackLeft+i).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterBackLeft + i}')"><div class="mark"></div></div>`);
    }
    for(i=posNum-1;i>=1;i--){
        // DEFINE AS OPCÕES PARA A DIAGONAL TRASEIRA DA DIREITA
        posLetterBackRight = proxLetter(posLetterBackRight,'right');
        
        // VERIFICA SE EXISTE UMA PEÇA NA DIAGONAL DIREITA TRASEIRA
        if(!verifyContain(posLetterBackRight+i)){
            // VERIFICA SE ELE PODE COMER A PEÇA ALVO
            setKillablePieces(posLetterBackRight+i,color);
            break;
        }

        $('#'+posLetterBackRight+i).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterBackRight + i}')"><div class="mark"></div></div>`);
    }
}

$('.piece').on('click', function(){
    removeMarks()
    posAtual = this.getAttribute('pos');
    pieceType = this.getAttribute('piece');
    pieceColor = this.getAttribute('color');

    if(pieceType == "pawn"){
        posNum = parseInt(posAtual.split('')[1]);
        posLetter = posAtual.split('')[0];

        //CONFIGURAÇÃO DO PEÃO        
        if (pieceColor == "white"){
            posNumEnemy = parseInt(posNum) + 1;
            if(posNum !== 2){
                proxFrente = proxPos('front', posAtual, 1, 'w');
            }else{
                proxFrente = proxPos('front', posAtual, 2, 'w');
            }

        }else if(pieceColor == "black"){
            posNumEnemy = parseInt(posNum) - 1;
            if(posNum !== 7){
                proxFrente = proxPos('front', posAtual, 1, 'b');
            }else{
                proxFrente = proxPos('front', posAtual, 2, 'b');
            }
        }else{
            return;
        }
        posLetterEnemy1 = proxLetter(posLetter, 'left');
        posLetterEnemy2 = proxLetter(posLetter, 'right');

        if(!verifyContain(posLetterEnemy1+posNumEnemy)){
            $('#'+posLetterEnemy1+posNumEnemy).addClass("killable");
        }
        if(!verifyContain(posLetterEnemy2+posNumEnemy)){
            $('#'+posLetterEnemy2+posNumEnemy).addClass("killable");
        }

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

        setPosDiagonals(posAtual,pieceColor);
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

        setPosDiagonals(posAtual,pieceColor);

        for(u=1;u<=8;u++){
            //DEFINE AS OPÇÕES PARA A ESQUERDA
            posLetterLeft = proxLetter(posLetterLeft,'left');
            
            if(posLetterLeft == false || posLetterLeft == undefined || verifyContain(posLetterLeft+posNum) == false){
                break;
            }

            $('#'+posLetterLeft+posNum).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterLeft + posNum}')"><div class="mark"></div></div>`);
        }

        for(j=1;j<=8;j++){
            //DEFINE AS OPÇÕES PARA A DIREITA
            posLetterRight = proxLetter(posLetterRight,'right');
            
            if(posLetterRight == false || posLetterRight == undefined || verifyContain(posLetterRight+posNum) == false){
                break;
            }

            $('#'+posLetterRight+posNum).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterRight + posNum}')"><div class="mark"></div></div>`);
        }

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

        for(u=1;u<=8;u++){
            //DEFINE AS OPÇÕES PARA A ESQUERDA
            posLetterLeft = proxLetter(posLetterLeft,'left');
            
            if(posLetterLeft == false || posLetterLeft == undefined || verifyContain(posLetterLeft+posNum) == false){
                break;
            }

            $('#'+posLetterLeft+posNum).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterLeft + posNum}')"><div class="mark"></div></div>`);
        }

        for(j=1;j<=8;j++){
            //DEFINE AS OPÇÕES PARA A DIREITA
            posLetterRight = proxLetter(posLetterRight,'right');
            
            if(posLetterRight == false || posLetterRight == undefined || verifyContain(posLetterRight+posNum) == false){
                break;
            }

            $('#'+posLetterRight+posNum).html(`<div class="poss" onclick="changePosition('${posLetter + posNum}','${posLetterRight + posNum}')"><div class="mark"></div></div>`);
        }
    }
});

function changePosition(atualPos, nextPos){
    removeMarks()
    $('#'+atualPos).children().appendTo('#'+nextPos);
    $('#'+nextPos+' > div').attr('pos', nextPos);
}
