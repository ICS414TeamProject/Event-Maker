var ical = function (){
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
