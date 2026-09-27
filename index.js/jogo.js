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
    frames++;

    if (estadoAtual == estadoDaTela.jogando) {
        obstaculos.atualiza();
    }

    if (obstaculos.avisoNivel > 0) {
        obstaculos.avisoNivel--;
    }

    bloco.atualiza();
}

function desenha() {

    bg.desenha(0, 0); // Desenha o fundo do jogo.
    
    ctx.fillStyle = "black";// Desenha o score do jogador.
    ctx.font = "50px arial";
    ctx.fillText(bloco.score, 30, 40);

    if (estadoAtual == estadoDaTela.jogar) {

        ctx.fillStyle = "green";
        ctx.fillRect(largura / 2.5, altura / 3, 150, 150);

    } else if (estadoAtual == estadoDaTela.final) {
        ctx.fillStyle = "red";
        ctx.fillRect(largura / 2.5, altura / 3, 150, 150);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";

        if (bloco.score > record) {
            ctx.fillText("Novo Record", largura / 2, altura / 2.5 - 60);
        } else {
            ctx.fillText("Record " + record, largura / 2, altura / 2.5 - 60);
        }

        ctx.fillText(bloco.score, largura / 2 + 15, altura / 2);
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