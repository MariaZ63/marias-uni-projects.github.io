// JavaScript source code
$(document).ready(function () {


	/**
	 * START INTRO
	 * */

	/**Infobuttons incl. link to references*/

	$('#infobutton01').hover(

		// mouse-enter event
		function () {
			$('#sources01').show();
		},
		// mouse-leave event
		function () {
			$('#sources01').hide();
		})

	$('#infobutton01').on('click', function () {
		window.open("Sources.html");
	});

	$('#infobutton02').hover(

		// mouse-enter event
		function () {
			$('#sources02').show();
		},
		// mouse-leave event
		function () {
			$('#sources02').hide();
		})

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
		})

	$('#infobutton03').on('click', function () {
		window.open("Sources.html");
	});

	$('#infobutton04').hover(

		// mouse-enter event
		function () {
			$('#sources04').show();
		},
		// mouse-leave event
		function () {
			$('#sources04').hide();
		})

	$('#infobutton04').on('click', function () {
		window.open("Sources.html");
	});

	$('#infobutton05').hover(

		// mouse-enter event
		function () {
			$('#sources05').show();
		},
		// mouse-leave event
		function () {
			$('#sources05').hide();
		})

	$('#infobutton05').on('click', function () {
		window.open("Sources.html");
	});


	/** Title melody and sounds */

	
	/* var titleMelody = document.createElement('audio');
	titleMelody.setAttribute('src', 'sounds/titlemelody.mp3');
	titleMelody.autoplay = false;
	titleMelody.play(); */
	var takeOff = document.createElement('audio');
	takeOff.setAttribute('src', 'sounds//takeOff.mp3');

	$('#start_button').off('click').on('click', function () {

		/* if (!titleMelody.paused) { //title melody stops, when the #start_button is clicked
			titleMelody.pause();
		} */
		takeOff.play();//takeOff-sounds are played when the #start_button is clicked
		$('#start_button').hide();
		$('#introductionSam').hide();
		$('#shakingSpaceShuttle').show(); //button and panel disappear and the rocket appears
		setTimeout(function delay() { 
			$("#spaceShuttle").animate({ marginTop: '-=10000px' }, 12000); //rocket flies to the top of the page
			$('html,body').animate({ scrollTop: 0 }, '5000'); //page gets scrolled up accordingly 
			$('#row08').slideUp(1000); //all old panels disppear and new panels appear starting with the function in line 117 
			$('#row07').slideUp(1000);
			$('#row06_oneToSix').slideUp(1000);
			$('#row06').slideUp(1000);
			$('#row05_piechart').slideUp(1000);
			$('#row05').slideUp(1000);
			$('#row04').slideUp(1000);
			$('#row03').slideUp(1000);
			$('#row02').slideUp(1000);
			$('#row01').slideUp(1000);
		}, 12000); //Countdown duration approx. 12 seconds 

		setTimeout(function delay() { //all new panels appear when the rocketstart has finished

			$("#spaceShuttle").fadeOut(1000)
			$('#flyingToTheSpaceStation').fadeIn(1000);
			$('#welcomeToTheSpaceStation').fadeIn(1000);
			$('#atTheSpaceStation').fadeIn(1000);
			$('#IntroDataGaps').fadeIn(1000);
			$('#letsFindOut').fadeIn(1000);
			$('#samMeetsCharlie').fadeIn(1000);
			$('#samGoesWithCharlie').fadeIn(1000);
			
		}, 12000); //Countdown duration approx. 12 seconds

	});


	/*Laser Sound when the Crahtest story begins*/

	var laserSound = document.createElement('audio');
	laserSound.setAttribute('src', 'sounds/laser-transition.mp3');
	$('#samGoesWithCharlie_overlay').on('click', function () {
		laserSound.play(); //duration: 5 seconds
		setTimeout(function delay() {
			window.open("Crashtest.html", "_self")
		}, 5000);
	});

});



/**
 * END INTRO
 * */





	/**#TYPING --> I decided against it, because of alignment reasons*/
	/*var i = 0;
	var text = "We write the year 2022. We live in a world with BIG DATA. A giant amount of data. \ \n For example, on the NASA Homepage  you can download thousands of data sets about space. \n However, about at least 27 % of the space, which is a lot considering that we are talking about THE UNIVERSE, \
                we know absolutely nothing.\n Because we can't see it. \n This space of THE space which we can't see is called the dark matter.\
                We only know about it, because we know a lot about the surrounding stars and materia. [Hand 2020, 4 p.] \n \
				This analogy works quite well for the BIG Dataverse we have on earth as well.\
				The fact that we have a lot of data doesn't mean that we know everything. \
				The quantity of data does not say anything about the quality or completeness of the data [Barocas and Selbst 2016]. \n This missing data is called a data gap or dark data [Hand 2020]. \
				One of the most popular data gaps is the gender data gap. Gender-specific data is data where a distinction has been made between men and women in the collection of the data. [Termin & Roca 2016, S. 264] \
				Thus, gender - specific data gaps have occurred because either no distinction was made or women were simply not surveyed.\n \
				But why is this important? \n\n \
				To find out, we send our best datanaut into the wide worlds of the dataverse.Join her on her journey and find out what the dark data is all about."


	var speed = 5;

	function type() {
		if (i < text.length)
			document.getElementById("typing").innerHTML += text.charAt(i);
		i++;
		setTimeout(type, speed);
	}


	type();*/

	/*setTimeout(function () {
		document.getElementById('intro_sam').innerHTML += '<img src="images/intro/introductionSam.png" width="400" height="350">';
	}, 20000);  // Wait 3 seconds (3000 milliseconds) before adding the image

	setTimeout(function () {
		document.getElementById('start_the_rocket').innerHTML += '<img src="images/intro/startTheRocketButton.png" width="400" height="100">';
	}, 20000);  // Wait 3 seconds (3000 milliseconds) before adding the image*/
/**END TYPING*/



	/*EXAMPLE FUNCTIONS --> We're designed as a starting point for the team to develop them for their further development
	 * 
	 * 
	 * SHOW FURTHER STORY PANELS:
	 *
		* Attention: 
			All IDs such as '#start_button' and '#intro'
			must be IDs of the paragraphs, NOT the images themselves! 
	
			The style of the paragraphs must be set to "display=none":
			--> Example: 
					<p id="intro1" style="display:none">
					<img src="Intro1.jpg" width="500" height="600">
					</p>
		 */

	/*
	//Shows paragraph with ID #intro1 when paragraph with ID #start_button is clicked
	$('#start_button').on('click', function () {
		$('#intro1').fadeIn(1000);
	});

	//Shows paragraph with ID #intro2 when paragraph with ID #start_button is clicked
	$('#start_button').on('click', function () {
		$('#intro2').fadeIn(1000);
	});

	//Hides paragraph with ID #start_button when #start_button is clicked 
	$('#start_button').on('click', function () {
		$(this).fadeOut();
	});*/


	/** SHOW INFO(TEXT) NEXT TO A STORY PANEL OR IMAGE: 
	 * 
	 * Attention: 
		  * Works with both paragraph and image-IDs 
		* information must be within the paragraph in the HTML document: 
				Example:
				<p id="austronaut_sam">
					<img src="austronaut_sam.jpg" width="300" height="250">
					<img id="start_button1" src="start_button1.jpg" style="display:none" width="300" height="50">
				</p>
	 
	 * */

	/*SHOWS #start_button1 WHEN #austronaut_sam IS CLICKED
	 * 
	$('#austronaut_sam').on('click', function () {
		$('#start_button1').fadeIn(1000);
	});


	/**
	 * FUNCTION: Clickable links on Webpage: 
	 *  <a href="https://www.w3schools.com/" target="_blank">Visit W3Schools!</a> 
	 * 
	 * 
	 * */

/** END OF EXAMPLE FUNCTIONS*/


