import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//Routing stuff for iron router
Router.route('/', function () {
	this.render('home');
});
Router.route('about', function() {
	this.render('about');
})
Router.route('calendar', function() {
	this.render('calendar');
})
Router.route('contact', function() {
	this.render('contact');
})
Router.route('subscribe', function() {
	this.render('subscribe')
})


let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};

Template.calendar.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});

Template.script_template.onRendered(() => {

});

Template.calendar.onRendered(() => {
	$('#events-calendar').fullCalendar('option', 'aspectRatio', 1);
	$.getScript("js/gcal.js"); //pull in gcal script for gcal shit
	$( '#events-calendar' ).fullCalendar({
		height: 650,
		aspectRatio: 1,
		defaultView:'month',
		showNonCurrentDates:false,
		fixedWeekCount:false,
		header: {
			center: 'title',
			left:'',
			right:  'today prev,next'
		},
		events: {
      		googleCalendarApiKey: 'AIzaSyCBgueczqFKs-EsvDL_cEVJ54Dsyk_UBxk',
     		googleCalendarId: 'greenyinzers@gmail.com',
    	},

    	eventClick: function(calEvent, jsEvent, view, event) {
    		alert('Event: ' + calEvent.title + '\n' +
    			  'Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY+'\n'+
    			  'Description: ' + calEvent.description + '\n' +
    			  'Location: ' + calEvent.location);
    		// change the border color just for fun
    		$(this).css('border-color', '#8ec36e');
		    if (calEvent.url) { //donot redirect
    			if (calEvent.url.includes('google.com')){
      				return false;
    			}
    			console.log(calEvent.url);
    		}
    		
  		}
	});
});

//if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
 // return false;
//}
Template.contact.onRendered(()=> {
	$.getScript("js/email.js");
});
Template.contact.events({
	'click .send': function (e) {
		  
		event.preventDefault();           // we are submitting via xhr below
		var data = getFormData();         // get the values submitted in the form

		//GET DATA HERE
		var form = document.getElementById("gform");
		var elements = form.elements; // all form elements
		var fields = Object.keys(elements).filter(function(k) {
		        // the filtering logic is simple, only keep fields that are not the honeypot
		      return (elements[k].name !== "honeypot");
		}).map(function(k) {
			if(elements[k].name !== undefined) {
		    	return elements[k].name;
		    // special case for Edge's html collection
		    }else if(elements[k].length > 0){
		    	return elements[k].item(0).name;
		    }
		}).filter(function(item, pos, self) {
		    return self.indexOf(item) == pos && item;
		});
		data = {};
		fields.forEach(function(k){
		    data[k] = elements[k].value;
		    var str = ""; // declare empty string outside of loop to allow
		                  // it to be appended to for each item in the loop
		    if(elements[k].type === "checkbox"){ // special case for Edge's html collection
		      	str = str + elements[k].checked + ", "; // take the string and append 
		                                              // the current checked value to 
		                                              // the end of it, along with 
		                                              // a comma and a space
		      	data[k] = str.slice(0, -2); // remove the last comma and space 
		                                  // from the  string to make the output 
		                                  // prettier in the spreadsheet
		    } else if(elements[k].length){
		      	for(var i = 0; i < elements[k].length; i++){
		        	if(elements[k].item(i).checked){
		          		str = str + elements[k].item(i).value + ", "; // same as above
		          		data[k] = str.slice(0, -2);
		        	}
		      	}
		    }
		});
		  // OPTION: Remove this comment to enable SPAM prevention, see README.md
		  if (data.honeypot) {  //if form is filled, form will not be submitted
		    return false;
		  }

		  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		  var validorno = re.test(data.email);
		console.log("Data=  " + data);
		if( data.email && !validorno ) {   // if email is not valid show error
			var invalidEmail = document.getElementById("email-invalid");
		    if (invalidEmail) {
		      invalidEmail.style.display = "block";
		      return false;
		    }
		  } else {
		    var url = "https://script.google.com/macros/s/AKfycbxgMpfeppDQGiy0qsTYGeIARAgRLHNufRVFWb-Q65XcJWpix4PH/exec";  //didnt pull properly manual
		    console.log("URL:  " + url);
		    var xhr = new XMLHttpRequest();
		    xhr.open('POST', url);
		    console.log(xhr);
		    // xhr.withCredentials = true;
		    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		    xhr.onreadystatechange = function() {
		        console.log( xhr.status, xhr.statusText )
		        console.log(xhr.responseText);
		        document.getElementById("gform").style.display = "none"; // hide form
		        document.getElementById("form-cont").style.display = "none";
		        document.getElementById("descript-cont").style.display = "none";
		        var thankYouMessage = document.getElementById("thankyou-message");
		        if (thankYouMessage) {
		          	thankYouMessage.style.display = "block";
		        }
		        return;
		    };
		    // url encode form data for sending as post data
		    var encoded = Object.keys(data).map(function(k) {
		        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
		    }).join('&')
		    xhr.send(encoded);
		  }
		function validateHuman(honeypot) {
		  if (honeypot) {  //if hidden form filled up
		    console.log("Robot Detected!");
		    return true;
		  } else {
		    console.log("Welcome Human!");
		  }}
		

	}
});

Template.subscribe.events({
	'click .subscribe': function (e) {
		  
		event.preventDefault();           // we are submitting via xhr below
		var data = getFormData();         // get the values submitted in the form

		//GET DATA HERE
		var form = document.getElementById("gform");
		var elements = form.elements; // all form elements
		var fields = Object.keys(elements).filter(function(k) {
		        // the filtering logic is simple, only keep fields that are not the honeypot
		      return (elements[k].name !== "honeypot");
		}).map(function(k) {
			if(elements[k].name !== undefined) {
		    	return elements[k].name;
		    // special case for Edge's html collection
		    }else if(elements[k].length > 0){
		    	return elements[k].item(0).name;
		    }
		}).filter(function(item, pos, self) {
		    return self.indexOf(item) == pos && item;
		});
		data = {};
		fields.forEach(function(k){
		    data[k] = elements[k].value;
		    var str = ""; // declare empty string outside of loop to allow
		                  // it to be appended to for each item in the loop
		    if(elements[k].type === "checkbox"){ // special case for Edge's html collection
		      	str = str + elements[k].checked + ", "; // take the string and append 
		                                              // the current checked value to 
		                                              // the end of it, along with 
		                                              // a comma and a space
		      	data[k] = str.slice(0, -2); // remove the last comma and space 
		                                  // from the  string to make the output 
		                                  // prettier in the spreadsheet
		    } else if(elements[k].length){
		      	for(var i = 0; i < elements[k].length; i++){
		        	if(elements[k].item(i).checked){
		          		str = str + elements[k].item(i).value + ", "; // same as above
		          		data[k] = str.slice(0, -2);
		        	}
		      	}
		    }
		});
		  // OPTION: Remove this comment to enable SPAM prevention, see README.md
		  if (data.honeypot) {  //if form is filled, form will not be submitted
		    return false;
		  }

		  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		  var validorno = re.test(data.email);
		console.log("Data=  " + data);
		if( data.email && !validorno ) {   // if email is not valid show error
			var invalidEmail = document.getElementById("email-invalid");
		    if (invalidEmail) {
		      invalidEmail.style.display = "block";
		      return false;
		    }
		  } else {
		    var url = "https://script.google.com/macros/s/AKfycbza-iNGJ91OdEcXfUuJ_QDp_4gx7Sy0MrlosLycpw/exec";  //didnt pull properly manual
		    console.log("URL:  " + url);
		    var xhr = new XMLHttpRequest();
		    xhr.open('POST', url);
		    console.log(xhr);
		    // xhr.withCredentials = true;
		    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		    xhr.onreadystatechange = function() {
		        console.log( xhr.status, xhr.statusText )
		        console.log(xhr.responseText);
		        console.log("PING");
		        return;
		    };

		    document.getElementById("sub-form-cont").style.display = "none";
	        document.getElementById("descript-cont").style.display = "none";
	        var thankYouMessage = document.getElementById("thankyou-message");
	        if (thankYouMessage) {
	          	thankYouMessage.style.display = "block";
	        }
		    // url encode form data for sending as post data
		    var encoded = Object.keys(data).map(function(k) {
		        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
		    }).join('&')
		    xhr.send(encoded);
		  }
		function validateHuman(honeypot) {
		  if (honeypot) {  //if hidden form filled up
		    console.log("Robot Detected!");
		    return true;
		  } else {
		    console.log("Welcome Human!");
		  }}
		

	}
});




/* sub menu shit
						<li class="nav-option col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
							<!-- <div class="menu-itm-cont"> -->
								<a class="nav-option-text" href="#">About</a>
									<!--<div class="sub-menu">
										<a href="#">Something</a>
									</div> 
							</div> -->
							*/