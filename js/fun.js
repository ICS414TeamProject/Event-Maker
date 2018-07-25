var createCalendar = function (){
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
  console.write(calendar);
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
