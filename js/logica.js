$(document).ready(function(){
	var juego = {
		cartasValor: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
		jugador: '',
	

		iniciar: function(){
			juego.mezclar();
			
			$('.ejecutar').on('click', function(e){
				juego.validaNombre(e);
			});

		},

		validaNombre: function (e) {
			e.preventDefault();
			if ($('.nombre').val() !== '') {
				juego.jugador = $('.nombre').val();
				$('.menu').fadeOut();
				juego.usuarioClick();
			}
			else {
				$('.mensajeError').css({'display':'block'});
			}


		},

		usuarioClick: function(){
			$('.carta').on('click', function(){
				juego.darVuelta($(this));
			});
		},

		mezclar: function (){
			var random = 0;
			var intermcabio = 0;
			for (var i = 0; i < juego.cartasValor.length; i++) {
				random = Math.round(Math.random()*i);
				intercambio = juego.cartasValor[i];
				juego.cartasValor[i] = juego.cartasValor[random];
				juego.cartasValor[random] = intercambio;
				$('.contenedor').append('<div class = "carta sinmatch"></div>');
			}

			$('.carta').each(function(index){
				$(this).attr('data-carta', juego.cartasValor[index]);
			});

		},

		darVuelta: function (carta) {
			carta.addClass('seleccionada');
			carta.css({'background-image':'url("images/img' +carta.data('carta')+'.jpg")'});
			if ($('.seleccionada').length == 2) {
				juego.chequearMatch();
			}

		},

		chequearMatch: function(){
			if ($('.seleccionada').first().data('carta') == $('.seleccionada').last().data('carta')) {
				setTimeout(function () {
					$('.seleccionada').each(function(){
						$(this).removeClass('seleccionada sinmatch').css({'background': ''}).animate({'opacity': '0'}, {'duration':'1500'});
						juego.chequeaGanador();
					});
				}, 1000);
				
			}

			else {
				setTimeout(function(){
					$('.seleccionada').each(function(){
						$(this).removeClass('seleccionada').css({'background': ''});

					});
				}, 1000);
			}
		},

		chequeaGanador: function(){
			if ($('.sinmatch').length === 0) {
				$('.resultado').show();
			}
		},

	
	};

	juego.iniciar();
						 
});

				
