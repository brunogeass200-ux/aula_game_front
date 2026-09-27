// Valores e elementos compartilhados pelos outros arquivos.
var canvas;
var ctx;
var altura;
var largura;
var frames = 0;
var maxPulos = 3;
var velocidade = 8;
var record;
var estadoAtual;
var img;

var estadoDaTela = {
    jogar: 0,
    jogando: 1,
    final: 2
};

// Chao desenhado na parte inferior do canvas.
var chao = {
    y: 550,
    x: 0,
    altura: 50,
    cor: "#ffdf70",

    atualiza: function () {
        this.x = this.x - velocidade;
        if (this.x <= -chaoSprite.largura) {
            this.x = 0;
        }

    },

    desenha: function () {
        chaoSprite.desenha(this.x , this.y);
        chaoSprite.desenha(this.x + chaoSprite.largura, this.y);
     
    }
};