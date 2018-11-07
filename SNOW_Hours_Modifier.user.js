// ==UserScript==
// @name         SNOW Fix hours
// @namespace    http://tampermonkey.net/
// @version      1.1
// @updateURL    https://github.com/techslogi/SnowHoursModifier/raw/master/SNOW_Hours_Modifier.user.js
// @downloadURL	 https://github.com/techslogi/SnowHoursModifier/raw/master/SNOW_Hours_Modifier.user.js
// @description  Reduces hours from a snow incident;
// @author       Gabriel Vicente
// @match        *://itsmgbpeu.service-now.com/*
// @require      https://code.jquery.com/jquery-3.3.1.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.js
// @run-at       document-idle
// ==/UserScript==

(function() {

	var currentURL = window.location.href.toString();
	if(currentURL.includes("incident.do") || currentURL.includes("incident_list.do")){
		try{
			var dateTime;
			var i;
			var hoursIncident;
			var hoursList;
			var hoursToReduce = 3;
			hoursIncident = document.getElementsByClassName("activity_date");
			hoursList = document.getElementsByClassName("datex date-calendar");
			if(hoursIncident[0] != undefined){
				for(i=0;i<hoursIncident.length;i++){
					dateTime = moment(hoursIncident[i].textContent.toString().replace(/ /g, "T")).subtract(hoursToReduce, 'hours').format("HH:mm:ss[ ]DD/MM/YYYY");
					hoursIncident[i].textContent = dateTime;
				}
			}
			if(hoursList[0] != undefined){
				for(i=0;i<hoursList.length;i++){
					dateTime = moment(hoursList[i].textContent.toString().replace(/ /g, "T")).subtract(hoursToReduce, 'hours').format("HH:mm:ss[ ]DD/MM/YYYY");
					hoursList[i].textContent = dateTime;
				}
			}
		}catch(e){
			alert("error: " + e.message);
		}
	}

})();

