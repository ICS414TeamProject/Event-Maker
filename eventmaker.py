# Event-Maker
# This code by Team Lychee creates events in .ics file format. You are welcome to the party too!

from ics import icalendar, Calendar, Event

c = Calendar();
e = Event();

e.name = "Mars Landing Party"
e.location = "Huygens Crater Base"
e.begin = "20331106 22:00:00"
e.duration = 1/12
e.description = "Starlight Express landing party is a thrilling welcome for newcomers to Mars."
e.url = "M.starlightexpress"

a=[]; a.append(e)
c.events = a

# print(c)
open('my.ics', 'w').writelines(c)
