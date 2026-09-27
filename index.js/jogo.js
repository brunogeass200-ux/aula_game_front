// Controles, inicio e loop principal do jogo.
function clique(event) {
    if (estadoAtual == estadoDaTela.jogando) {
        bloco.pula();
    } else if (estadoAtual == estadoDaTela.jogar) {
        velocidade = obstaculos.velocidades[
            Math.floor(obstaculos.velocidades.length * Math.random())
        ];
        estadoAtual = estadoDaTela.jogando;
        obstaculos.limpa();
    } else if (estadoAtual == estadoDaTela.final) {
        estadoAtual = estadoDaTela.jogar;
        bloco.reset();
    }
}

function main() {
    altura = window.innerHeight;
    largura = window.innerWidth;

    if (largura >= 500) {
        largura = 600;
        altura = 600;
    }

    canvas = document.createElement("canvas");
    canvas.width = largura;
    canvas.height = altura;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    document.addEventListener("mousedown", clique);

    estadoAtual = estadoDaTela.jogar;
    record = localStorage.getItem("record");

    if (record == null) {
        record = 0;
    }
    
    img = new Image();
    img.src = "img/sheet.png";

    roda();
}

function roda() {
    atualiza();
    desenha();
    window.requestAnimationFrame(roda);
}

function atualiza() {
    if (estadoAtual == estadoDaTela.jogando) {
        obstaculos.atualiza();
    }

    if (obstaculos.avisoNivel > 0) {
        obstaculos.avisoNivel--;
    }

    chao.atualiza();
    bloco.atualiza();
}

function desenha() {

    bg.desenha(0, 0); // Desenha o fundo do jogo.
    
    ctx.fillStyle = "white";// Desenha o score do jogador.
    ctx.font = "50px arial";
    ctx.fillText(bloco.score, 30, 40); 

    if (estadoAtual == estadoDaTela.jogar) {
        inicioSprite.desenha( 150, 100);


    } else if (estadoAtual == estadoDaTela.final) {
       
        if (bloco.score > record) {
            novoRecordSprite.desenha( 50, 100);
            ctx.fillStyle = "white";
            ctx.fillText(record,415, 345);
        } else {
            ctx.fillStyle = "white";
            ctx.fillText(record,415, 420);
            fimSprite.desenha( 100, 10);
            ctx.fillText(bloco.score, 395, 330);

            recordSprite.desenha( 50, 350);
            ctx.fillStyle = "white";
            ctx.font = "50px Arial";
            ctx.fillText(record, 415, 420);
        }

        
    }

    if (estadoAtual == estadoDaTela.jogando || estadoAtual == estadoDaTela.final) {
        obstaculos.desenha();
    }

    if (obstaculos.avisoNivel > 0) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Mudança de nível!", largura / 2, altura / 2);
        ctx.textAlign = "left";
    }

    chao.desenha();
    bloco.desenha();
}

main();