$(document).ready(function () {

	/**
	 * START CRASHTEST
	 * */


	//all functions below were set up by Maria

	//Audio element (crash sound)
	var audioElement01 = document.createElement('audio');
	audioElement01.setAttribute('src', 'sounds/carcrash.mp3');
	var dontPlaySound = false;

	$('#playbutton').on('click', function () {
		$('#playbutton').hide();
		if (!dontPlaySound) { //video fading in while crash sound is played
			audioElement01.play(); //duration: 5.2 seconds
			dontPlaySound = true;
			$("#infobutton01").hide(); //workaround, because the infobutton somehow disabled the youtube playbutton
			$('#crashtest-video').delay(2700).fadeIn(2500);
		}
		else { //sound won't be played multiple times 
			$("#infobutton01").hide(); 
			$('#crashtest-video').show();
		}
	});

	$('#panel-01').on('click', function () { //close the video
		$('#crashtest-video').hide();
		audioElement01.pause(); //stop the sound
		audioElement01.currentTime = 0;
		$("#infobutton01").show();
		$('#playbutton').show();
	});

	$('#infobutton01').hover( //hovering over the infobutton will make the references appear below the panel

		// mouse-enter event
		function () {
			$('#sources01').show();
		},
		// mouse-leave event
		function () {
			$('#sources01').hide();
		});

	$('#infobutton01').on('click', function () { //clicking on the infobutton will open the references page in a new window
		window.open("Sources.html");
	});

	$('#rectangle_02a').on('click', function () { //displaying the rectangle with additional information on click
		$('#rectangle_02b').show();
		$('#add_info02').show();
	});

	$('#panel-02').on('click', function () { //clicking on the panel will hide the additional information again
		$('#rectangle_02b').hide();
		$('#add_info02').hide();
	});

	$('#infobutton02').hover(

		// mouse-enter event
		function () {
			$('#sources02').show();
		},
		// mouse-leave event
		function () {
			$('#sources02').hide();
		});
	$('#infobutton02').on('click', function () {
		window.open("Sources.html");
	});

	$('#infobutton03').hover(

		// mouse-enter event
		function () {
			$('#sources03').show();
		},
		// mouse-leave event
		function () {
			$('#sources03').hide();
		});

	$('#infobutton03').on('click', function () {
		window.open("Sources.html");
	});

	$('#rectangle_4a').on('click', function () { //clicking will reveal an additional panel
		$('#row-04').show();
	});

	$('#infobutton4a').hover(

		// mouse-enter event
		function () {
			$('#sources4a').show();
		},
		// mouse-leave event
		function () {
			$('#sources4a').hide();
		});

	$('#infobutton4a').on('click', function () {
		window.open("Sources.html");
	});

	$('#infobutton4b').hover(

		// mouse-enter event
		function () {
			$('#sources4b').show();
		},
		// mouse-leave event
		function () {
			$('#sources4b').hide();
		});
	$('#infobutton4b').on('click', function () {
		window.open("Sources.html");
	});

	$('#rectangle_05a').on('click', function () {
		$('#rectangle_05a').hide(); //hide the clickable element while the additional info is displayed
		$('#rectangle_05b').show();
		$('#add_info05a').show();
	});

	$('#rectangle_05c').on('click', function () {
		$('#rectangle_05c').hide(); 
		$('#rectangle_05d').show();
		$('#add_info05b').show();
	});

	$('#rectangle_05e').on('click', function () {
		$('#rectangle_05e').hide();
		$('#rectangle_05f').show();
		$('#add_info05c').show();
	});

	$('#panel-05').on('click', function () { //hide the additional information again, while making the clickable elements reappear
		$('#rectangle_05a').show();
		$('#rectangle_05b').hide();
		$('#add_info05a').hide();
		$('#rectangle_05c').show();
		$('#rectangle_05d').hide();
		$('#add_info05b').hide();
		$('#rectangle_05e').show();
		$('#rectangle_05f').hide();
		$('#add_info05c').hide();
	});
	$('#infobutton05').hover(

		// mouse-enter event
		function () {
			$('#sources05').show();
		},
		// mouse-leave event
		function () {
			$('#sources05').hide();
		});

	$('#infobutton05').on('click', function () {
		window.open("Sources.html");
	});

	$('#rectangle_06a').on('click', function () {
		$('#rectangle_06a').hide();
		$('#rectangle_06b').show();
		$('#add_info06').show();
	});

	$('#panel-06').on('click', function () {
		$('#rectangle_06a').show();
		$('#rectangle_06b').hide();
		$('#add_info06').hide();
	});

	$('#infobutton06').hover(

		// mouse-enter event
		function () {
			$('#sources06').show();
		},
		// mouse-leave event
		function () {
			$('#sources06').hide();
		});

	$('#infobutton06').on('click', function () {
		window.open("Sources.html");
	});

	$('#infobutton07').hover(

		// mouse-enter event
		function () {
			$('#sources07').show();
		},
		// mouse-leave event
		function () {
			$('#sources07').hide();
		});

	$('#infobutton07').on('click', function () {
		window.open("Sources.html");
	});

	$('#infobutton08').hover(

		// mouse-enter event
		function () {
			$('#sources08').show();
		},
		// mouse-leave event
		function () {
			$('#sources08').hide();
		});

	$('#infobutton08').on('click', function () {
		window.open("Sources.html");
	});

	$('#rectangle_08').on('click', function () {
		$('#row-07').show();
		$('#rectangle_08').hide();
	});

	$('#closebutton07').on('click', function () {
		$('#row-07').hide();
		$('#rectangle_08').show();
	});

	//audio element (space sounds)
	var audioElement02 = document.createElement('audio');
	audioElement02.setAttribute('src', 'sounds/laser-transition.mp3');

	$('#rectangle_09a').on('click', function () { //redirect the user to the next part of the comic while playing the sound
		audioElement02.play(); //duration: 5 seconds
		setTimeout(function delay() {
			window.open("Health.html", "_self")
		}, 5000);
	});

	$('#rectangle_09b').on('click', function () { //open new window (interesting newspaper article)
		window.open("https://www.consumerreports.org/car-safety/crash-test-bias-how-male-focused-testing-puts-female-drivers-at-risk/")
	});

	/**
 * END CRASHTEST
 * */
});