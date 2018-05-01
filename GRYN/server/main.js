import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	process.env.MAIL_URL = 'smtp://greenyinzers:$Greenyn22@smtp.gmail.com:587/'
});



Meteor.methods({
});

/*function updateMongo() {
	try {
      return Events.removeAllEvent();
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }

    $.getJSON('contacts.json', function (json) {
	var array = [];
	for (var key in json) {
    	if (json.hasOwnProperty(key)) {
        	var event = json[key];
        	array.push({
            	title: event.title,
            	start: item.start,
            	end: item.end,
            	location: item.location
        	});            
    	}		
	} 
	/* Example data set --note they are all vevents

	{
	    "":{
	        "Name":"Jhon",
	        "Surname":"Kenneth",
	        "mobile":329129293,
	        "email":"jhon@gmail.com"
	    },
	    "ppl2":{
	        "Name":"Thor",
	        "Surname":"zvalk",
	        "mobile":349229293,
	        "email":"thor@gmail.com"
	    },
	    "ppl3":{
	        "Name":"Mila",
	        "Surname":"Kvuls",
	        "mobile":329121293,
	        "email":"mila@gmail.com"
	    }
	}
	*/

 /*

});

	"../server/calendars/current.json"
*/
//}
