//The main function that creates the calendar file.
var createCalendar = function (){
  //Date and Time adjustments
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

  //Creating the index of the event file.
  var SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
  var calendarStart = [
      'BEGIN:VCALENDAR',
      'PRODID:Calendar',
      'VERSION:2.0'
  ].join(SEPARATOR);
  var calendarEnd = SEPARATOR + 'END:VCALENDAR';
  var calendarEvent = [
      'BEGIN:VEVENT',
      'CLASS:PUBLIC',
      'DESCRIPTION:' + document.getElementById('txtDescription').value,
      'DTSTART;VALUE=DATE:' + StartDate + "T" + StartTime,
      'DTEND;VALUE=DATE:' + EndDate + "T" + EndTime,
      'LOCATION:' + document.getElementById('txtLocation').value,
      'SUMMARY;LANGUAGE=en-us:' + document.getElementById('txtSummary').value,
      'TRANSP:TRANSPARENT',
      'END:VEVENT'
  ].join(SEPARATOR);
  var calendar = calendarStart + SEPARATOR + calendarEvent + SEPARATOR + calendarEnd;
  return calendar;
}

//bringElements function collects inputs in the page to an array for validation.
var bringElements = function(){
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
var download = function (fname, ext){
  var errorflag = false;
  var errorflags = [];
  var elements = bringElements();
  //Validate to see if there are any errors in inputs
  for (var i = 0; i < elements.length; i++) {
    errorflag = validation(elements[i]);
    if (errorflag == false)
    {errorflags.push(errorflag);}
  }
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
  else {
    alert("Please check the information");
  }
}

//createLink function creates the downloadable .ics file with element "a" of HTML.
var createLink = function(filename, text){
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/calendar;charset=utf8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

//getNow function fills the time input placeholders with current time.
var getNow = function(){
  var now = new Date();
  var dd = now.getDate();
  var mm = now.getMonth() + 1; //January is 0!
  var yyyy = now.getFullYear();
  if(dd<10) {
      dd = '0'+ dd
  }
  if(mm<10) {
      mm = '0'+ mm
  }
  var hour = now.getHours();
  var minute = now.getMinutes();
  today = mm + '/' + dd + '/' + yyyy;
  document.getElementById('txtStartDate').value = today;
  document.getElementById('txtEndDate').value = today;
  if(hour<10) {
      hour = '0'+ hour
  }
  document.getElementById('txtStartTimeHours').placeholder = hour;
  document.getElementById('txtEndTimeHours').placeholder = hour;
  if(minute<9) {
      minute = '0'+ minute
      document.getElementById('txtEndTimeMinutes').placeholder = "0" + String(parseInt(minute) + 1);
  } else {document.getElementById('txtEndTimeMinutes').placeholder = String(parseInt(minute) + 1);}
  document.getElementById('txtStartTimeMinutes').placeholder = minute;

  document.getElementById('chcGeolocation').checked = true;
  bindGeo();

  document.getElementById('txtFileName').value = "NewEvent";
}

//validation function validates the inputs in the form with designed rules.
var validation = function(elem){
  var errorflag = true;
  //Check if Description, Summary, Location or Start Date is empty.
  if (elem.id == "txtDescription" || elem.id == "txtSummary" || elem.id == "txtLocation" || elem.id == "txtStartDate")
  {
    if (elem.value == "")
    {
      elem.style.borderColor="#EC3C3C";
      errorflag = false;
    }
  }
  //Check if Start Time hours and End Time hours are empty or filled with wrong information
  else if (elem.id == "txtStartTimeHours" || elem.id == "txtEndTimeHours")
  {
    if (elem.value == "" || elem.value < 0 || elem.value > 23)
    {
      elem.style.borderColor="#EC3C3C";
      errorflag = false;
    }
  }
  //Check if Start Time minutes and End Time minutes are empty or filled with wrong information
  else if (elem.id == "txtStartTimeMinutes" || elem.id == "txtEndTimeMinutes")
  {
    var val = parseInt(elem.value);
    if (elem.value == "" || val < 0 || val > 59)
    {
      elem.style.borderColor="#EC3C3C";
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
      else if (emonth > smonth)
      {errorflag = true;}
      else if (eday >= sday)
      {errorflag = true;}
      else {errorflag = false;}
    }
    else {
      elem.style.borderColor="#EC3C3C";
      errorflag = false;
    }
  }
  return errorflag;
}

//inputs' onfocus event
var focused = function(elem){
  elem.style.borderColor="#4CAF50";
}

//inputs' onblur event
var blurred = function(elem){
  var errorflag = validation(elem);
  if (elem.id == "txtStartTimeHours" || elem.id == "txtStartTimeMinutes" || elem.id == "txtEndTimeHours" || elem.id == "txtEndTimeMinutes")
  {
    if(elem.value < 10)
    {elem.value = "0" + elem.value;}
  }
  if (errorflag == true)
  {
    elem.style.borderColor="#CCCCCC";
  }else {
    elem.style.borderColor="#EC3C3C";
  }
}

//Checkbox validation to make Google Maps autocomplete on or off
var checkGeo = function(){
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
var bindGeo = function(){
  var asd = document.getElementById('txtLocation');
  var autocomplete = new google.maps.places.Autocomplete(asd);
  google.maps.event.addListener(autocomplete, 'place_changed', function(){
     var place = autocomplete.getPlace();})
}
