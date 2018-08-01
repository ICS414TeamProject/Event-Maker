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
      startHours = String('0'+ parseInt(startHours));
  }else if (startHours == 0){startHours = "00"}
  var startMinutes = String(document.getElementById('txtStartTimeMinutes').value);
  if(startMinutes<10) {
      startMinutes = String('0'+ parseInt(startMinutes));
  }else if (startMinutes == 0){startMinutes = "00"}
  var StartTime = startHours + startMinutes + '00';
  var endHours = String(document.getElementById('txtEndTimeHours').value);
  if(endHours<10) {
      endHours = String('0'+ parseInt(endHours));
  }else if (endHours == 0){endHours = "00"}
  var endMinutes = String(document.getElementById('txtEndTimeMinutes').value);
  if(endMinutes<10) {
      endMinutes = String('0'+ parseInt(endMinutes));
  }else if (endMinutes == 0){endMinutes = "00"}
  var EndTime = endHours + endMinutes + '00';

  if(document.getElementById("chcRrule").checked == false)
  {var theString = 'DTEND;VALUE=DATE:' + EndDate + "T" + EndTime;}
  else{var theString = rruleString();}

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
      '' + theString,
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
  document.getElementById('chcRrule').checked = false;
  document.getElementById('divRrule').style.display = 'none';
  document.getElementById('slcByWhat').style.display = 'none';
  document.getElementById('slcInterval').style.display = 'none';
  document.getElementById('slcBy2').style.display = 'none';
  document.getElementById('txtUntil').style.display = 'none';
  document.getElementById('txtCount').style.display = 'none';
  //Binds the autocomplete function to the input
  bindGeo();
  //Fills the File Name textbox' value with dummy text
  document.getElementById('txtFileName').value = "NewEvent";
  document.getElementById('slcClass').options[document.getElementById('slcClass').selectedIndex].value = 'PUBLIC';
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
      dd = String('0'+ parseInt(dd));
  }
  if(mm<10) {
      mm = String('0'+ parseInt(mm));
  }
  if(hour<10) {
    if(hour == 0){hour = "00"}
    else{
      hour = String('0'+ parseInt(hour));}
  }
  if(minute<10) {
    if(minute == 0){minute = "00"}
    else{
      minute = String('0'+ parseInt(minute));}
  }
  if(second<10) {
    if(second == 0){second = "00"}
    else{
      second = String('0'+ parseInt(second));}
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
    {errorflag = false;}
  }
  //Check if Start Time hours and End Time hours are empty or filled with wrong information
  else if (elem.id == "txtStartTimeHours" || elem.id == "txtEndTimeHours")
  {
    if (elem.value == "" || elem.value < 0 || elem.value > 23)
    {errorflag = false;}
  }
  //Check if Start Time minutes and End Time minutes are empty or filled with wrong information
  else if (elem.id == "txtStartTimeMinutes" || elem.id == "txtEndTimeMinutes")
  {
    var val = parseInt(elem.value);
    if (elem.value == "" || val < 0 || val > 59)
    {errorflag = false;}
  }
  //Check if Interval and Count are empty or filled with wrong information
  else if (elem.id == "txtInterval" || elem.id == "txtCount")
  {
    if(elem.value == "" || isNaN(elem.value) == true || elem.value <= 0)
    {errorflag = false;}
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
    else {errorflag = false;}
  }
  else if (elem.id == "txtUntil")
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
    else {errorflag = false;}
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
    {elem.value = String('0'+ parseInt(elem.value));}
    else if (elem.value == "0"){elem.value = "00"}
  }
  if (errorflag == true)
  {
    elem.style.borderColor="#CCCCCC";
  }
  else {
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

function rruleClick(){
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
    if(document.getElementById('chcRrule').checked == false)
    {document.getElementById('divRrule').style.display = 'none';}
    else{
    document.getElementById('divRrule').style.display = 'block';}
  }else{
    alert("Please check the information");
    document.getElementById('chcRrule').checked = false;
  }
}

function rruleString(){
  var slcF = document.getElementById('slcFreq');
  var slcB = document.getElementById('slcByWhat');
  var slcI = document.getElementById('slcInterval');
  var slcW = document.getElementById('slcBy2');
  var slcR = document.getElementById('slcRepeat');
  var rrule = 'RRULE:';
  rrule = rrule + 'FREQ=' + slcF.options[slcF.selectedIndex].value;
  if (slcF.options[slcF.selectedIndex].text == "Daily")
  {rrule = rrule + ';INTERVAL=' + slcI.options[slcI.selectedIndex].value;}
  else if (slcF.options[slcF.selectedIndex].text == "Weekly")
  {rrule = rrule + ';INTERVAL=' + slcI.options[slcI.selectedIndex].value + ';BYDAY=' + slcB.options[slcB.selectedIndex].value}
  else if (slcF.options[slcF.selectedIndex].text == "Monthly by Day")
  {rrule = rrule + ';INTERVAL=' + slcI.options[slcI.selectedIndex].value + ';BYDAY=' + slcB.options[slcB.selectedIndex].value}
  else if (slcF.options[slcF.selectedIndex].text == "Monthly by Date")
  {rrule = rrule + ';INTERVAL=' + slcI.options[slcI.selectedIndex].value + ';BYMONTHDAY=' + slcB.options[slcB.selectedIndex].value}
  else if (slcF.options[slcF.selectedIndex].text == "Yearly by Day")
  {rrule = rrule + ';INTERVAL=' + slcI.options[slcI.selectedIndex].value + ';BYDAY=' + slcB.options[slcB.selectedIndex].value + ';BYMONTHDAY=' + slcW.options[slcW.selectedIndex].value}
  else if (slcF.options[slcF.selectedIndex].text == "Yearly by Date")
  {rrule = rrule + ';INTERVAL=' + slcI.options[slcI.selectedIndex].value + ';BYMONTH=' + slcB.options[slcB.selectedIndex].value + ';BYMONTHDAY=' + slcW.options[slcW.selectedIndex].value}

  if(slcR.options[slcR.selectedIndex].value == "UNTIL")
  {
    var p = document.getElementById('txtUntil').value.split('-');
    rrule = rrule + ';UNTIL=' + p[0] + p[1] + p[2] + "T000000Z";
  }else if(slcR.options[slcR.selectedIndex].value == "OC")
  {
    rrule = rrule + ';COUNT=' + document.getElementById('txtCount').value;
  }

  return rrule;
}

function slcFreqChanged(elem){
  var sl = document.getElementById('slcByWhat');
  var sl2 = document.getElementById('slcInterval');
  var sl3 = document.getElementById('slcBy2');
  sl.innerHTML = "";
  sl2.innerHTML = "";
  sl3.innerHTML = "";
  var weekdays = [['Monday', 'MO'], ['Tuesday', 'TU'], ['Wednesday', 'WE'], ['Thursday', 'TH'], ['Friday', 'FR'],  ['Saturday', 'SA'], ['Sunday', 'SU']];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var prefix = [["First", "1"], ["Second", "2"], ["Third", "3"], ["Fourth", "4"], ["Last", "-1"]];
  if(elem.options[elem.selectedIndex].value == "DAILY")
  {
    sl.style.display = 'none';
    sl2.style.display = 'block';
    sl3.style.display = 'none';
    for (var i = 0; i < 30; i++) {
      var opt = document.createElement("option");
      if (i == 0){opt.text = "Every day"; opt.value = i + 1;}
      else if (i == 1){opt.text = "Every other day"; opt.value = i + 1;}
      else if (i == 2){opt.text = "Every 3rd day"; opt.value = i + 1;}
      else{opt.text = "Every " + (i + 1) + "th day"; opt.value = i + 1;}
      sl2.add(opt);
    }
  }
  else if(elem.options[elem.selectedIndex].value == "WEEKLY")
  {
    sl.style.display = 'block';
    sl2.style.display = 'block';
    sl3.style.display = 'none';
    for (var i = 0; i < 7; i++) {
      var opt = document.createElement("option");
      opt.text = weekdays[i][0];
      opt.value = weekdays[i][1];
      sl.add(opt);
    }
    for (var i = 0; i < 26; i++) {
      var opt = document.createElement("option");
      if (i == 0){opt.text = "Every week"; opt.value = i + 1;}
      else if (i == 1){opt.text = "Every other week"; opt.value = i + 1;}
      else if (i == 2){opt.text = "Every 3rd week"; opt.value = i + 1;}
      else{opt.text = "Every " + (i + 1) + "th week"; opt.value = i + 1;}
      sl2.add(opt);
    }
  }
  else if(elem.options[elem.selectedIndex].text == "Monthly by Day")
  {
    sl.style.display = 'block';
    sl2.style.display = 'block';
    sl3.style.display = 'none';
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 7; j++) {
        var opt = document.createElement("option");
        opt.text = prefix[i][0] + " " + weekdays[j][0];
        opt.value = prefix[i][1] + weekdays[j][1];
        sl.add(opt);
      }
    }
    for (var i = 0; i < 11; i++) {
      var opt = document.createElement("option");
      if (i == 0){opt.text = "Every month"; opt.value = i + 1;}
      else if (i == 1){opt.text = "Every other month"; opt.value = i + 1;}
      else if (i == 2){opt.text = "Every 3rd month"; opt.value = i + 1;}
      else{opt.text = "Every " + (i + 1) + "th month"; opt.value = i + 1;}
      sl2.add(opt);
    }
  }
  else if(elem.options[elem.selectedIndex].text == "Monthly by Date")
  {
    sl.style.display = 'block';
    sl2.style.display = 'block';
    sl3.style.display = 'none';
    for (var i = 0; i < 31; i++) {
      var opt = document.createElement("option");
      if (i == 0){opt.text = "1st day"; opt.value = i + 1;}
      else if (i == 1){opt.text = "2nd day"; opt.value = i + 1;}
      else if (i == 2){opt.text = "3rd day"; opt.value = i + 1;}
      else{opt.text = (i + 1) + "th day"; opt.value = i + 1;}
      sl.add(opt);
    }
    for (var i = 0; i < 11; i++) {
      var opt = document.createElement("option");
      if (i == 0){opt.text = "Every month"; opt.value = i + 1;}
      else if (i == 1){opt.text = "Every other month"; opt.value = i + 1;}
      else if (i == 2){opt.text = "Every 3rd month"; opt.value = i + 1;}
      else{opt.text = "Every " + (i + 1) + "th month"; opt.value = i + 1;}
      sl2.add(opt);
    }
  }
  else if(elem.options[elem.selectedIndex].text == "Yearly by Day")
  {
    sl.style.display = 'block';
    sl2.style.display = 'block';
    sl3.style.display = 'block';
    for (var i = 0; i < 10; i++) {
      var opt = document.createElement("option");
      if (i == 0){opt.text = "Every 1st year"; opt.value = i + 1;}
      else if (i == 1){opt.text = "Every other year"; opt.value = i + 1;}
      else if (i == 2){opt.text = "Every 3rd year"; opt.value = i + 1;}
      else{opt.text = "Every " + (i + 1) + "th year"; opt.value = i + 1;}
      sl2.add(opt);
    }
    for (var i = 0; i < 12; i++) {
      var opt = document.createElement("option");
      opt.text = months[i]; opt.value = i + 1;
      sl3.add(opt);
    }
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 7; j++) {
        var opt = document.createElement("option");
        opt.text = prefix[i][0] + " " + weekdays[j][0];
        opt.value = prefix[i][1] + weekdays[j][1];
        sl.add(opt);
      }
    }
  }
  else if(elem.options[elem.selectedIndex].text == "Yearly by Date")
  {
    sl.style.display = 'block';
    sl2.style.display = 'block';
    sl3.style.display = 'block';
    for (var i = 0; i < 10; i++) {
      var opt = document.createElement("option");
      if (i == 0){opt.text = "Every year"; opt.value = i + 1;}
      else if (i == 1){opt.text = "Every other year"; opt.value = i + 1;}
      else if (i == 2){opt.text = "Every 3rd year"; opt.value = i + 1;}
      else{opt.text = "Every " + (i + 1) + "th year"; opt.value = i + 1;}
      sl2.add(opt);
    }
    for (var i = 0; i < 12; i++) {
      var opt = document.createElement("option");
      opt.text = months[i]; opt.value = i + 1;
      sl.add(opt);
    }
    for (var i = 0; i < 31; i++) {
      var opt = document.createElement("option");
      if (i == 0){opt.text = "1st day"; opt.value = i + 1;}
      else if (i == 1){opt.text = "2nd day"; opt.value = i + 1;}
      else if (i == 2){opt.text = "3rd day"; opt.value = i + 1;}
      else{opt.text = (i + 1) + "th day"; opt.value = i + 1;}
      sl3.add(opt);
    }
  }
}

function sclRepeatChanged(e){
  if(e.options[e.selectedIndex].value == "UNTIL")
  {
    document.getElementById('txtUntil').style.display = 'inline';
    document.getElementById('txtCount').style.display = 'none';
  }
  else if(e.options[e.selectedIndex].value == "OC")
  {
    document.getElementById('txtUntil').style.display = 'none';
    document.getElementById('txtCount').style.display = 'inline';
  }
  else {
    document.getElementById('txtUntil').style.display = 'none';
    document.getElementById('txtCount').style.display = 'none';
  }
}
