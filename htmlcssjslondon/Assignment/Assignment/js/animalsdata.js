
/*
 *		This file contains the javascript code for our gallery
 */

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled 
// templates many times
var category_template, animals_template, animal_template;

// variables to store the current displayed album and photo
var current_category = animalsdata.category[0];
var current_kingdom = current_category.animals[0];

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
	var html = template(data);
	$('#content').html(html);
}

// document read gets called when the whole document
// is loaded, so we put most of the code that needs to run
// in here
$(document).ready(function(){

	//
	// compile all of our templates ready for use
	//
	var source   = $("#category_template").html();
	category_template = Handlebars.compile(source);
	
	source   = $("#animals_template").html();
	animals_template = Handlebars.compile(source);
	
	source   = $("#animal_template").html();
	animal_template = Handlebars.compile(source);

	source   = $("#allanimals_template").html();
	allanimals_template = Handlebars.compile(source);
	
	
	// 
	//  clicking on the albums tab shows the 
	//  thumbnails of all the albums
	//
	

		// displays the albums template
		showTemplate(category_template, animalsdata);

		// make the albums tab the active one
		// first make the currently active tab inactive
		$("#categories-tab").removeClass("active");
		// then make albums tab active
		$("#animals-tab").addClass("active");

		// add a click callback to each album 
		// thumbnail which displays the photos
		// template on that album
		// (I have written out the code for this 
		// function for clarity but it is actually
		// pretty much the same as the photos tab
		// function so we could acutally just
		// call $(".photo-thumbnail").click() ) 
		$(".category-thumbnail").click(function (){
			
			// get the index (position in the array)
			// of the album we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the album in
			// the array - @index)
			var index = $(this).data("id");

			// set the current album to this album
			current_album = animalsdata.category[index];

			// displays the photos template
			showTemplate(animals_template, current_album);

			// add an on click al all the photo thumbnails
			// which displays the photo in a modal popup
			$(".animal-thumbnail").click(function (){
				// get the index (position in the array)
				// of the photo we clicked on
				// "this" is the element that was clicked on
				// data("id") gets the attribute data-id
				// (which we set to the index of the photo in
				// the array - @index)
				var index = $(this).data("id");

				// set the current photo to this photo
				current_photo = current_album.animals[index];
				
				// displays the single photo template
				showTemplate(animal_template, current_photo);
			});
		});
	

	// 
	//  clicking on the photos tab shows all of the 
	//  photos in the current album
	//
	$("#animals-tab").click(function () {
		
		// displays the photos template
		showTemplate(allanimals_template, animalsdata);

		// make the photos tab the active one
		// first make the currently active tab inactive
		$("#linkcat").removeClass("active");
		// then make photos tab active
		$("#linkall").addClass("active");

		// add an on click al all the photo thumbnails
		// which displays the photo in a modal popup
		$(".photo-thumbnail").click(function (){
			// get the index (position in the array)
			// of the photo we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the photo in
			// the array - @index)
			var index = $(this).data("id");

			// set the current photo to this photo
			current_photo = current_album.photos[index];
			
			// displays the single photo template
			showTemplate(photo_template, current_photo);
		});
	});

	// 
	//  clicking on the slideshow tab displays the
	//  current album as a slide show
	//
	

	// start the page by showing the albums view
	// we do this by virtually clicking on the 
	// albums tab
	$("#albums-tab").click();

});