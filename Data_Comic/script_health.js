$(document).ready(function () {
	/**
	 * START HEALTH
	 * */

	/* SHOW & HIDE FUNCTIONS */

	$('#rect4').on('click', function() {
		$('#p5p5a').show();
	});

	$('#rect5close').on('click', function () {
		$('#5').hide();
	});

	$('#rect5').on('click', function () {
		$('#5a').show();
	});

	$('#rect5scroll').on('click', function () {
		$('#p5aa5b').show();
	});

	$('#rect5aa').on('click', function () {
		$('#5b').show();
	});

	$('#rect5aascroll').on('click', function () {
		$('#p5aa5b').hide();
	});

	$('#rect5aaclose').on('click', function () {
		$('#5aa').hide();
	});

	$('#rect5aclose').on('click', function () {
		$('#5a').hide();
	});

	$('#rect5bclose').on('click', function () {
		$('#5b').hide();
	});
	
	$('#rectp17').on('click', function() {
		$('#p18').show();
	});

	$('#rect18close').on('click', function () {
		$('#18').hide();
	});

	
	$('#rect20').on('click', function () {
		$('#p21p21ap21b').show();
	});

	$('#rect21close').on('click', function () {
		$('#p21p21ap21b').hide();
	});

	$('#rect21a').on('click', function () {
		$('#21a').show();
	});

	$('#rect21aclose').on('click', function () {
		$('#21a').hide();
	});

	$('#rect21a').on('click', function () {
		$('#21').hide();
	});

	$('#rect21b').on('click', function () {
		$('#21b').show();
	});

	$('#rect21b').on('click', function () {
		$('#21a').hide();
	});

	$('#rect21close').on('click', function () {
		$('#21').hide();
	});

	$('#rect21aclose').on('click', function () {
		$('#21a').hide();
	});

	$('#rect21bclose').on('click', function () {
		$('#21b').hide();
	});

	$('#rect21left').on('click', function () {
		$('#21').hide();
	});

	$('#rect21aleft').on('click', function () {
		$('#21').show();
	});

	$('#rect21aleft').on('click', function () {
		$('#21a').hide();
	});

	$('#rect21bleft').on('click', function () {
		$('#21a').show();
	});

	$('#rect21bleft').on('click', function () {
		$('#21b').hide();
	});

	$('#rect24').on('click', function () {
		$('#p24').show();
	});

	$('#rect24close').on('click', function () {
		$('#24').hide();
	});


	$('#rect26a').on('click', function () {
		$('#26b').show();
	});

	$('#rect26bclose').on('click', function () {
		$('#26b').hide();
	});

	$('#rect24close').on('click', function () {
		$('#26').hide();
	});

	$('#rect27').on('click', function () {
		$('#p28').show();
	});

	$('#rect28close').on('click', function () {
		$('#p28').hide();
	});
		
	$('#rect31').on('click', function () {
		$('#31a').show();
	});

	$('#rect31aclose').on('click', function () {
		$('#31a').hide();
	});
	

	$('#rect34').on('click', function () {
		$('#35').show();
	});

	$('#rect35').on('click', function () {
		$('#35a').show();
	});

	$('#rect35close').on('click', function () {
		$('#35').hide();
	});

	$('#rect35aclose').on('click', function () {
		$('#35a').hide();
	});

	$('#rect39').on('click', function () {
		$('#39pop').show();
		$('#rect39pop').show();
		$('#closebutton39pop').show();
		$('#rect39popclose').show();
	});

	$('#rect39popclose').on('click', function () {
		$('#closebutton39pop').hide();
		$('#rect39popclose').hide();
		$('#rect39pop').hide();
		$('#39pop').hide();
		
	});

	/*SOUNDS*/
	/*Falling sound*/
	var audioElement01 = document.createElement('audio');
	audioElement01.setAttribute('src', 'sounds/fall-on-carpet-6032.mp3');	
	$('#rect11').on('click', function () {
		audioElement01.play(); 
	});
	
	/* Button: move to chrashtest*/
	var audioElement02 = document.createElement('audio');
	audioElement02.setAttribute('src', 'sounds/laser-transition.mp3');	
	$('#rect41').on('click', function () {
		audioElement02.play(); //duration: 5 seconds
		setTimeout(function delay() {
			window.open("Outro.html","_self")
		}, 5000);
	});

	


	/*LINKS*/ 

	$('#rect24link').on('click', function () {
		window.open("https://www.aerzteblatt.de/nachrichten/sw/Gendermedizin?s=&p=1&n=1&aid=216908", "blank");
	});

	$('#rect39link').on('click', function () {
		window.open("hhttps://www.bundesgesundheitsministerium.de/fileadmin/Dateien/5_Publikationen/Gesundheit/Berichte/Gutachten_Integration_von_Aspekten_der_Geschlechtersensibilitaet.pdf", "blank");
	});

	

	/* INFOBUTTONS */

	$('#infobutton5a').hover(
		// mouseover
		function () {
			$('#sources5a').show();
		},
		// mouse leave
		function () {
			$('#sources5a').hide();
		});
	$('#infobutton5a').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton5b').hover(
		// mouseover
		function () {
			$('#sources5b').show();
		},
		// mouse leave
		function () {
			$('#sources5b').hide();
		});
	$('#infobutton5b').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton6').hover(
		// mouseover
		function () {
			$('#sources6').show();
		},
		// mouse leave
		function () {
			$('#sources6').hide();
		});
	$('#infobutton6').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton6a').hover(
		// mouseover
		function () {
			$('#sources6a').show();
		},
		// mouse leave
		function () {
			$('#sources6a').hide();
		});
	$('#infobutton6a').on('click', function (){
		window.open("Sources.html");
	});


	$('#infobutton20').hover(
		// mouseover
		function () {
			$('#sources20').show();
		},
		// mouse leave
		function () {
			$('#sources20').hide();
		});
	$('#infobutton20').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton21').hover(
		// mouseover
		function () {
			$('#sources21').show();
		},
		// mouse leave
		function () {
			$('#sources21').hide();
		});
	$('#infobutton21').on('click', function (){
		window.open("Sources.html");
	});

	
	$('#infobutton21a').hover(
		// mouseover
		function () {
			$('#sources21a').show();
		},
		// mouse leave
		function () {
			$('#sources21a').hide();
		});
	$('#infobutton21a').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton21b').hover(
		// mouseover
		function () {
			$('#sources21b').show();
		},
		// mouse leave
		function () {
			$('#sources21b').hide();
		});
	$('#infobutton21b').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton24').hover(
		// mouseover
		function () {
			$('#sources24').show();
		},
		// mouse leave
		function () {
			$('#sources24').hide();
		});
	$('#infobutton24').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton26a').hover(
		// mouseover
		function () {
			$('#sources26a').show();
		},
		// mouse leave
		function () {
			$('#sources26a').hide();
		});
	$('#infobutton26a').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton26b').hover(
		// mouseover
		function () {
			$('#sources26b').show();
		},
		// mouse leave
		function () {
			$('#sources26b').hide();
		});
	$('#infobutton26b').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton31').hover(
		// mouseover
		function () {
			$('#sources31').show();
		},
		// mouse leave
		function () {
			$('#sources31').hide();
		});
	$('#infobutton31').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton31a').hover(
		// mouseover
		function () {
			$('#sources31a').show();
		},
		// mouse leave
		function () {
			$('#sources31a').hide();
		});
	$('#infobutton31a').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton35').hover(
		// mouseover
		function () {
			$('#sources35').show();
		},
		// mouse leave
		function () {
			$('#sources35').hide();
		});
	$('#infobutton35').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton35a').hover(
		// mouseover
		function () {
			$('#sources35a').show();
		},
		// mouse leave
		function () {
			$('#sources35a').hide();
		});
	$('#infobutton35a').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton36').hover(
		// mouseover
		function () {
			$('#sources36').show();
		},
		// mouse leave
		function () {
			$('#sources36').hide();
		});
	$('#infobutton36').on('click', function (){
		window.open("Sources.html");
	});

	$('#infobutton39').hover(
		// mouseover
		function () {
			$('#sources39').show();
		},
		// mouse leave
		function () {
			$('#sources39').hide();
		});
	$('#infobutton39').on('click', function (){
		window.open("Sources.html");
	});


	/*
	  FUNCTION: Clickable links on Webpage: 
	 <a href="https://www.w3schools.com/" target="_blank">Visit W3Schools!</a> 
	  */


});
