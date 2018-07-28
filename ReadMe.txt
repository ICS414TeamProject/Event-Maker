ICS414 Calendar Event Creator by Team Lychee, 2018.

Project by; Selim Karaoglu, Seth Kinel and Thinh Lam.

This web application is designed to generate event files with event information provided by the user.
This application is capable of create calendar event files with ".ics" extension that can be emailed or shared
and read into the recipient's calendar applications. Application provides a user to fill or select variables
including; Classification, Priority, Description, Summary, Location, Start Date, Start Time, End Date, End
Time and File Name. In the process, there are also features without user control including; Geolocation,
Timezone, UID and Date Time Stamp. At the end of the process, user downloads the event file.

With the Version 1.0, we achieved to get no error or warning from icalendar.org's validator.

Version 0.1 (Beta Version)
 - Event download script works with title, description, start date, start time, end date, end time, location variables.

Version 0.2
  - Labels changed to HTML objects
  - Change on design elements in HTML
  - CSS file added
  - Major design changes
  - Some changes on variables on HTML and JS file
  - Footer added

Version 0.2.1
  - Input types changed for Date and Time elements
  - Placeholders added
  - getNow() function added to JS to fill the Date with today's date on page load

Version 0.2.2
  - Time input fields changed
  - Major changes on CSS file and design elements

Version 0.3
  - New time inputs added
  - JS file changed with the new time inputs

Version 0.4
  - Google Maps Places API added
  - Location input now uses Google Places API to autocomplete the location
  - Team Lychee logo added

Version 0.5
  - Validations added
  - Design changes
  - Places API checkbox added
  - Code readability improvements
  - File Name (Optional) textbox added
  - Code improvements and Error fixes

Version 1.0 (Alpha Version)
  - Classification added with a select element
  - Geolocation added
  - Priority added
  - DTSTAMP added
  - UID added
  - TZID added
  * This Version's output file has no errors or warnings on icalendar validation.

  - To Do:
	(Done in V-0.2)- Styling the HTML. Adding a .css file to the source
	(Done in V-0.3)- Change the input style of Start-End Date and Time. (textboxes? pop-up calendar?)
	(Done in V-0.4)- Find location functionality?
	(Done in V-0.5)- Validations for inputs***** important!!!
	(Done in V-0.5)- Code readability improvements***** important!!!
	(Done in V-0.5)- Make Places API optional with a checkbox
	(Done in V-0.5)- Add File name input
	(Done in V-1.0)- Classification ****important
	(Done in V-1.0)- Priority ****important
	- Mailto functionality *****(No possible way to achieve it with HTML and JS only)
	- Help items
	- RRULE ******important
