// Obstaculos: criacao, movimento, colisoes e mudancas de velocidade.
var obstaculos = {
    _obs: [],
    cores: ["red", "black", "blue", "green", "yellow", "orange"],
    tempInsere: 0,
    somaPulo: 0,
    avisoNivel: 0,
    velocidades: [7, 8, 9, 10, 11, 12, 14],

    insere: function () {
        this._obs.push({
            x: largura,
            altura: 80 + Math.floor(30 * Math.random()),
            largura: 50 + Math.floor(25 * Math.random()),
            cor: this.cores[Math.floor(this.cores.length * Math.random())],
            velocidade: velocidade
        });

        this.tempInsere = 25 + Math.floor(50 * Math.random());
    },

    atualiza: function () {
        if (this.tempInsere == 0) {
            this.insere();
        } else {
            this.tempInsere--;
        }

        for (var i = 0; i < this._obs.length; i++) {
            var obs = this._obs[i];
            obs.x = obs.x - obs.velocidade;

            if (bloco.x < obs.x + obs.largura
                && bloco.x + bloco.largura >= obs.x
                && bloco.y + bloco.altura >= chao.y - obs.altura) {
                estadoAtual = estadoDaTela.final;
            } else if (obs.x + obs.largura < 0) {
                bloco.score++;
                this._obs.splice(i, 1);
                this.somaPulo++;
                i--;
            }

            if (this.somaPulo > 10) {
                var velocidadesDisponiveis = this.velocidades.filter(function (item) {
                    return item !== velocidade;
                });

                velocidade = velocidadesDisponiveis[
                    Math.floor(Math.random() * velocidadesDisponiveis.length)
                ];

                this.somaPulo = 0;
                this.avisoNivel = 90;
            }
        }
    },

    limpa: function () {
        this._obs = [];
    },

    desenha: function () {
        for (var i = 0, total = this._obs.length; i < total; i++) {
            var obs = this._obs[i];
            ctx.fillStyle = obs.cor;
            ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
        }
    }
};