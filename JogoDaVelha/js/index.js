var Game = (function(document) {

	//this
	var self = {},
		
		//array com as casas.	
		selecionados = undefined,

		//container do jogo
		elemento = undefined,

		//quem jogou por último
		status = undefined,

		//Inicializa os atributos
		init = function() {
			selecionados = [['', '', ''], ['', '', ''], ['', '', '']];
			elemento = document.getElementById('box-game');
			elemento.style.display = 'block';
			status = false;
		},

		//Limpa os elementos
		limparElementos = function() {
			var casas = elemento.querySelectorAll('.casa'); 
			for(var i = 0; i < casas.length; i++) {
				casas[i].innerText = '';
			}
		},

		//Verifica se alguém ganhou
		verificaVencedor = function() {
			var ganhouLinha = false,
			    ganhouColuna = false,
			    ganhouDiagonal = false,
			    i = 0;

		    for (i = 0; i < 3; i++) { 
		    	if(selecionados[i][0].length && selecionados[i][1].length && selecionados[i][2].length){
			        if (selecionados[i][0] == selecionados[i][1] && selecionados[i][0] == selecionados[i][2]) {
			            ganhouLinha = true;
			            break;
			        }
		    	}
		    	if(selecionados[0][i].length && selecionados[1][i].length && selecionados[2][i].length){
			        if (selecionados[0][i] == selecionados[1][i] && selecionados[0][i] == selecionados[2][i]) {
			            ganhouColuna = true;
			            break;
			        }
			    }
		    }

			var posicoesOcupadas = 0;
			for (i = 0; i < 3; i++) {
				for (j = 0; j < 3; j++) {
					if (selecionados[i][j].length)
						posicoesOcupadas++;
				}
			}
			if (selecionados[0][0].length && selecionados[1][1].length && selecionados[2][2].length && selecionados[0][0] == selecionados[1][1] && selecionados[0][0] == selecionados[2][2]){
				ganhouDiagonal = true;			
			}
			if (selecionados[2][0].length && selecionados[1][1].length && selecionados[0][2].length && selecionados[0][2] == selecionados[1][1] && selecionados[0][2] == selecionados[2][0]){
				ganhouDiagonal = true;
			}

			if (ganhouDiagonal){
				alert("Jogador " + (!status ? "O": "X")+ " ganhou");
			}else if (ganhouLinha){
				alert("Jogador " + (!status ? "O": "X") + " ganhou");
			}else if (ganhouColuna){
				alert("Jogador " + (!status ? "O": "X") + " ganhou");
			}else if (ganhouDiagonal || ganhouColuna || ganhouLinha || posicoesOcupadas == 9) {
				if (posicoesOcupadas == 9 && !ganhouDiagonal && !ganhouColuna && !ganhouLinha) {
					alert("Ninguém ganhou!");
				}
			}
		},

		//adiciona os eventos
		addEvent = function() {
			elemento.addEventListener('click', function(evt) {
				var $this = evt.target;
				if(!$this.innerText.trim().length){
					var posX = $this.getAttribute('data-x'),
						posY = $this.getAttribute('data-y');
					selecionados[posX][posY] = status ? 'O' : 'X';
					$this.innerText = status ? 'O' : 'X';
					status = !status;
					verificaVencedor();
				}
			});
		};

	//Inicia o jogo
	self.run = function() {
		init();
		limparElementos();
		addEvent();
	};

	return self;

})(document);
