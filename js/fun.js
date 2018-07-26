var createCalendar = function (){
  var par = String(document.getElementById('txtStartDate').value).split('-');
  var StartDate = par[0] + par[1]-1 + par[2];
  var par = String(document.getElementById('txtEndDate').value).split('-');
  var EndDate = par[0] + par[1]-1 + par[2];
  var startHours = String(document.getElementById('txtStartTimeHours').value);
  if(startHours<10) {
      startHours = '0'+startHours
  }
  var startMinutes = String(document.getElementById('txtStartTimeMinutes').value);
  if(startMinutes<10) {
      startMinutes = '0'+startMinutes
  }
  var StartTime = startHours + startMinutes + '00';
  var endHours = String(document.getElementById('txtEndTimeHours').value);
  if(endHours<10) {
      endHours = '0'+endHours
  }
  var endMinutes = String(document.getElementById('txtEndTimeMinutes').value);
  if(endMinutes<10) {
      endMinutes = '0'+endMinutes
  }
  var EndTime = endHours + endMinutes + '00';

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

var download = function (){
  var calendar = createCalendar();
  createLink('NewEvent.ics', calendar);
}

var createLink = function(filename, text){
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/calendar;charset=utf8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

var getNow = function(){
  var now = new Date();
  var dd = now.getDate();
  var mm = now.getMonth()+1; //January is 0!
  var yyyy = now.getFullYear();
  if(dd<10) {
      dd = '0'+dd
  }
  if(mm<10) {
      mm = '0'+mm
  }
  var hour = now.getHours();
  var minute = now.getMinutes();
  today = mm + '/' + dd + '/' + yyyy;
  document.getElementById('txtStartDate').value = today;
  document.getElementById('txtEndDate').value = today;
  document.getElementById('txtStartTimeHours').placeholder = hour;
  document.getElementById('txtStartTimeMinutes').placeholder = minute;
  document.getElementById('txtEndTimeHours').placeholder = hour;
  document.getElementById('txtEndTimeMinutes').placeholder = minute + 1;
}
