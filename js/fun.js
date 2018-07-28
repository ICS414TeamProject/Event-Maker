//The main function that creates the calendar file.
function createCalendar(){
  var tzid = getTZID();
  //Date and Time adjustments
  var n = getNow();
  var stamp = n[0];
  var yyyy = n[1];
  var mm = n[2];
  var dd = n[3];
  var hour = n[4];
  var minute = n[5];
  var second = n[6];
  var comp = stamp.toISOString();
  var p = comp.split('-');
  comp = p[0] + p[1] + p[2];
  //This part splits the date value from inputs into day, month and year.
  var par = String(document.getElementById('txtStartDate').value).split('-');
  var StartDate = par[0] + par[1] + par[2];
  var par = String(document.getElementById('txtEndDate').value).split('-');
  var EndDate = par[0] + par[1] + par[2];
  var startHours = String(document.getElementById('txtStartTimeHours').value);
  if(startHours<10) {
      startHours = '0'+ startHours
  }
  var startMinutes = String(document.getElementById('txtStartTimeMinutes').value);
  if(startMinutes<10) {
      startMinutes = '0'+ startMinutes
  }
  var StartTime = startHours + startMinutes + '00';
  var endHours = String(document.getElementById('txtEndTimeHours').value);
  if(endHours<10) {
      endHours = '0'+ endHours
  }
  var endMinutes = String(document.getElementById('txtEndTimeMinutes').value);
  if(endMinutes<10) {
      endMinutes = '0'+ endMinutes
  }
  var EndTime = endHours + endMinutes + '00';

  //Creating the content of the event file.
  var SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
  var calendarStart = [
      'BEGIN:VCALENDAR',
      'PRODID:Calendar',
      //The Version (section	3.7.4	of RFC	5545) is defined here
      'VERSION:2.0'
  ].join(SEPARATOR);
  var calendarEnd = SEPARATOR + 'END:VCALENDAR';
  var calendarEvent = [
      'BEGIN:VEVENT',
      'TZID:' + tzid,
      //Adding Classification from select element's selected value
      'CLASS:' + document.getElementById('slcClass').options[document.getElementById('slcClass').selectedIndex].value,
      'PRIORITY:' + document.getElementById('slcPriority').options[document.getElementById('slcPriority').selectedIndex].value,
      'UID:' + comp + "@domainname.here",
      'GEO:' + document.getElementById('lblGeolocation').innerHTML,
      //Adding the input values to corresponding positions
      'DESCRIPTION:' + document.getElementById('txtDescription').value,
      'DTSTAMP:' + yyyy + mm + dd + "T" + hour + minute + second,
      'DTSTART;VALUE=DATE:' + StartDate + "T" + StartTime,
      'DTEND;VALUE=DATE:' + EndDate + "T" + EndTime,
      'LOCATION:' + document.getElementById('txtLocation').value,
      'SUMMARY;LANGUAGE=en-us:' + document.getElementById('txtSummary').value,
      'TRANSP:TRANSPARENT',
      'END:VEVENT'
  ].join(SEPARATOR);
  var calendar = calendarStart + SEPARATOR + calendarEvent + calendarEnd;
  return calendar;
}

//bringElements function collects inputs in the page to an array for validation.
function bringElements(){
  var txtD = document.getElementById('txtDescription');
  var txtS = document.getElementById('txtSummary');
  var txtL = document.getElementById('txtLocation');
  var txtSD = document.getElementById('txtStartDate');
  var txtSTH = document.getElementById('txtStartTimeHours');
  var txtSTM = document.getElementById('txtStartTimeMinutes');
  var txtED = document.getElementById('txtEndDate');
  var txtETH = document.getElementById('txtEndTimeHours');
  var txtETM = document.getElementById('txtEndTimeMinutes');
  var elements = [txtD, txtS, txtL, txtSD, txtSTH, txtSTM, txtED, txtETH, txtETM];
  return elements;
}

//download function calls only from download button
function download(fname, ext){
  //All the validation is based on errorflag variable
  var errorflag = false;
  //errorflags array is used for validation off all inputs in the page
  var errorflags = [];
  var elements = bringElements();
  //Validate to see if there are any errors in inputs
  for (var i = 0; i < elements.length; i++) {
    errorflag = validation(elements[i]);
    if (errorflag == false)
    {errorflags.push(errorflag);}
  }
  //If there are no errors, download the file whether it has a filename or not
  if (errorflags.length == 0)
  {
    if(fname != "")
    {
      var name = fname + ".ics";
      var calendar = createCalendar();
      createLink(name, calendar);
    }else{
      var calendar = createCalendar();
      createLink('NewEvent.ics', calendar);
    }
  }
  //Validation alert
  else {
    alert("Please check the information");
  }
}

//createLink function creates the downloadable .ics file with element "a" of HTML.
function createLink(filename, text){
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/calendar;charset=utf8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

//Function for body element's onload event
function bodyOnload(){
  //getNow fills the responsible inputs with current time.
  getNow();
  document.getElementById('chcGeolocation').checked = true;
  //Binds the autocomplete function to the input
  bindGeo();
  //Fills the File Name textbox' value with dummy text
  document.getElementById('txtFileName').value = "NewEvent";
  document.getElementById('slcClass').options[document.getElementById('slcClass').selectedIndex].value = 'PUBLIC'
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }else {
        document.getElementById('lblGeolocation').innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById('lblGeolocation').innerHTML = position.coords.latitude + ";"+ position.coords.longitude;
}

//getNow function fills the time input placeholders with current time.
function getNow(){
  var now = new Date();
  var dd = now.getDate();
  var mm = now.getMonth() + 1; //January is 0!
  var yyyy = now.getFullYear();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if(dd<10) {
      dd = '0'+ dd
  }
  if(mm<10) {
      mm = '0'+ mm
  }
  if(hour<10) {
    if(hour == 0){hour = "00"}
    else{
      hour = '0'+ hour}
  }
  if(minute<10) {
    if(minute == 0){minute = "00"}
    else{
      minute = '0'+ minute}
  }
  if(second<10) {
    if(second == 0){second = "00"}
    else{
      second = '0'+ second}
  }
  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById('txtStartDate').placeholder = today;
  document.getElementById('txtEndDate').placeholder = today;
  document.getElementById('txtStartTimeHours').placeholder = hour;
  document.getElementById('txtEndTimeHours').placeholder = hour;
  if(minute<9) {
    document.getElementById('txtEndTimeMinutes').placeholder = "0" + String(parseInt(minute) + 1);
  } else if (parseInt(minute) == 59){
    document.getElementById('txtEndTimeHours').placeholder = String(parseInt(hour) + 1);
    document.getElementById('txtEndTimeMinutes').placeholder ="00"
  }
  else {document.getElementById('txtEndTimeMinutes').placeholder = String(parseInt(minute) + 1);}
  document.getElementById('txtStartTimeMinutes').placeholder = minute;
  return [now, yyyy, mm, dd, hour, minute, second];
}

//validation function validates the inputs in the form with designed rules.
function validation(elem){
  var errorflag = true;
  //Check if Description, Summary, Location or Start Date is empty.
  if (elem.id == "txtDescription" || elem.id == "txtSummary" || elem.id == "txtLocation" || elem.id == "txtStartDate")
  {
    if (elem.value == "")
    {
      errorflag = false;
    }
  }
  //Check if Start Time hours and End Time hours are empty or filled with wrong information
  else if (elem.id == "txtStartTimeHours" || elem.id == "txtEndTimeHours")
  {
    if (elem.value == "" || elem.value < 0 || elem.value > 23)
    {
      errorflag = false;
    }
  }
  //Check if Start Time minutes and End Time minutes are empty or filled with wrong information
  else if (elem.id == "txtStartTimeMinutes" || elem.id == "txtEndTimeMinutes")
  {
    var val = parseInt(elem.value);
    if (elem.value == "" || val < 0 || val > 59)
    {
      errorflag = false;
    }
  }
  //Check to see if End Date is later or equal to Start Date
  else if (elem.id == "txtEndDate")
  {
    if(elem != "" && document.getElementById('txtStartDate').value != "")
    {
      var par = String(document.getElementById('txtStartDate').value).split('-');
      var syear = parseInt(par[0]);
      var smonth = parseInt(par[1]);
      var sday = parseInt(par[2]);
      var par = String(elem.value).split('-');
      var eyear = parseInt(par[0]);
      var emonth = parseInt(par[1]);
      var eday = parseInt(par[2]);
      if (eyear > syear)
      {errorflag = true;}
      else if (eyear == syear)
      {
        if (emonth > smonth)
        {errorflag = true;}
        else if (emonth == smonth)
        {
          if (eday >= sday)
          {errorflag = true;}
          else {errorflag = false;}
        }
        else{errorflag = false;}
      }
      else{errorflag = false;}
    }
    else {
      errorflag = false;
    }
  }
  if(errorflag == true)
  {elem.style.borderColor="#CCCCCC";}
  else {elem.style.borderColor="#EC3C3C";}
  return errorflag;
}

//inputs' onfocus event
function focused(elem){
  elem.style.borderColor="#4CAF50";
}

//inputs' onblur event
function blurred(elem){
  var errorflag = validation(elem);
  if (elem.id == "txtStartDate")
  {
    errorflag = validation(document.getElementById('txtEndDate'));
  }
  if (elem.id == "txtStartTimeHours" || elem.id == "txtStartTimeMinutes" || elem.id == "txtEndTimeHours" || elem.id == "txtEndTimeMinutes")
  {
    if(elem.value < 10 && elem.value != "" && elem.value > 0)
    {elem.value = "0" + elem.value;}
  }
  if (errorflag == true)
  {
    elem.style.borderColor="#CCCCCC";
  }else {
    if (elem.id == "txtStartDate")
    {
      document.getElementById('txtEndDate').style.borderColor="#EC3C3C";
    }
    else{
    elem.style.borderColor="#EC3C3C";}
  }
}

//Checkbox validation to make Google Maps autocomplete on or off
function checkGeo(){
  var chc = document.getElementById("chcGeolocation");
  if(chc.checked == true)
  {
    var asd = document.getElementById('txtLocation');
    var autocomplete = new google.maps.places.Autocomplete(asd);
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
       var place = autocomplete.getPlace();})
  }
  else {
    var asd = document.getElementById('txtLocation');
    google.maps.event.clearInstanceListeners(asd);
  }
}

//bindGeo binds the Google Maps Places API to autocomplete the Location input
function bindGeo(){
  var asd = document.getElementById('txtLocation');
  var autocomplete = new google.maps.places.Autocomplete(asd);
  google.maps.event.addListener(autocomplete, 'place_changed', function(){
     var place = autocomplete.getPlace();})
}

function getTZID(){
  var tz = jstz.determine(); // Determines the time zone of the browser client
  var timezone = tz.name();
  return timezone;
}
