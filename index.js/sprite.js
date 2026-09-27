// Jogador: movimento, pulos, pontuação e desenho.

function Sprite(x, y, largura, altura) {
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;

	this.desenha = function(xCanvas, yCanvas) 
    {
	    ctx.drawImage(img, // de onde se origina a imagem
        this.x, this.y, this.largura, this.altura, // Origem

        xCanvas, yCanvas, this.largura, this.altura);// Destino
	                                }
}

var bg = new Sprite(0, 0, 600, 600)
var spriteBoneco = new Sprite(618, 16, 87, 87)
var chaoSprite = new Sprite(0, 600, 600, 50)
var inicioSprite = new Sprite(600, 120, 850, 350)
var fimSprite = new Sprite(600, 480, 550, 350)
var novoRecordSprite = new Sprite(0, 700, 450, 480)
var recordSprite = new Sprite(0, 880, 450, 100)



var bloco = {
	y: 50,
	x: 50,
	altura: 50,
	largura: 50,
	cor: "red",
	gravidade: 1.5,
	velocidade: 0,
	forcaDoPulo: 25,
	qdtpulos: 0,
	score: 0,
    rotacao: 0,

	atualiza: function () {
		this.velocidade = this.gravidade + this.velocidade;
		this.y = this.y + this.velocidade;
        
        if (estadoAtual == estadoDaTela.jogando) {// Faz o boneco rotacionar de acordo com a velocidade.
        this.rotacao += (velocidade / (this.largura / 2)) * 0.5;
        }

		if (this.y > chao.y - this.altura && estadoAtual != estadoDaTela.final) {
			this.y = chao.y - this.altura;
			this.qdtpulos = 0;
			this.velocidade = 0;
		}
	},

	reset: function () {
		this.velocidade = 0;
		this.y = 0;

		if (this.score > record) {
			localStorage.setItem("record", this.score);
			record = this.score;
		}

		this.score = 0;
	},

	pula: function () {
		if (this.qdtpulos < maxPulos) {
			this.velocidade = -this.forcaDoPulo;
			this.qdtpulos += 1;
		}
	},

	desenha: function () {
        ctx.save();
        //operator de rotação
        ctx.translate(this.x + this.largura / 2, this.y + this.altura / 2);
        ctx.rotate(this.rotacao);
        spriteBoneco.desenha(-spriteBoneco.largura/ 2 , -spriteBoneco.altura / 2);
        ctx.restore();
	}
};
 