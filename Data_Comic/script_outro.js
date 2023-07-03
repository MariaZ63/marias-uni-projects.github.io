// JavaScript source code

$(document).ready(function () {
	/**
	 * START OUTRO
	 * */

	/**INFOBUTTONS TO HOVER AND CLICK FOR SOURCES*/




	/**FURTHER INFO*/

	$('#ini_yellow').hover(

		// mouse-enter event
		function () {
			$('#Hand_Hover').show();
			$('#Hand_HoverText').show();
		},
		// mouse-leave event
		function () {
			$('#Hand_Hover').hide();
			$('#Hand_HoverText').hide();
		})


	$('#ini_yellow').on('click', function () {
		$('#Hand').toggle();
		$('#Hand2').toggle();
		$('#UN').hide();
		$('#AboutTheGenderGap').hide();
		$('#AboutTheGenderGap_data2x').hide();
	});

	$('#ini_blue').hover(

		// mouse-enter event
		function () {
			$('#UN_Hover').show();
			$('#UN_HoverText').show();
		},
		// mouse-leave event
		function () {
			$('#UN_Hover').hide();
			$('#UN_HoverText').hide();
		})

	$('#ini_blue').on('click', function () {
		$('#UN').toggle();
		$('#AboutTheGenderGap').hide();
		$('#AboutTheGenderGap_data2x').hide();
		$('#Hand').hide();
		$('#Hand2').hide();
		/**all other annotations disappear*/
	});

	$('#ini_orange').hover(

		// mouse-enter event
		function () {
			$('#Female_Hover').show();
			$('#Female_HoverText').show();
		},
		// mouse-leave event
		function () {
			$('#Female_Hover').hide();
			$('#Female_HoverText').hide();
		})

	$('#ini_orange').on('click', function () {
		$('#AboutTheGenderGap').toggle();
		$('#AboutTheGenderGap_data2x').toggle();
		$('#UN').hide();
		$('#Hand').hide();
		$('#Hand2').hide();
		/**all other annotations disappear*/
	});

	$('#data2x').on('click', function () {
		window.open("https://data2x.org/about-us/");
	});

	$('#data2xReport').on('click', function () {
		window.open("https://data2x.org/resource-center/transforming-the-data-landscape-solutions-to-close-gender-data-gaps/");
	});


	$('#infobutton01').hover(

		// mouse-enter event
		function () {
			$('#sources01').show();
		},
		// mouse-leave event
		function () {
			$('#sources01').hide();
		});
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


	$('#infobutton04').hover(

		// mouse-enter event
		function () {
			$('#sources04').show();
		},
		// mouse-leave event
		function () {
			$('#sources04').hide();
		});

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
		});

	$('#infobutton05').on('click', function () {
		window.open("Sources.html");
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

	
	/**
	
 * END OUTRO
 * */


	/*EXAMPLE FUNCTIONS
	 * 
	 * 


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


	/**
	 * FUNCTION: Clickable links on Webpage: 
	 *  <a href="https://www.w3schools.com/" target="_blank">Visit W3Schools!</a> 
	 * 
	 * 
	 * */


});
