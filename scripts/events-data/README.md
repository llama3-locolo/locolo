`eventbrite-huge.json` contains all events from the crawler Jolene and Sean used to get events from Eventbrite

Replace this file with a new file you export from the crawler.

Run all cells in the `events.ipynb` notebook to convert events to the format we decided to use for LLM. Converted events will be stored in `events` folder. Each file will contain information for 1 event.

Example:
```
Event Name: RIOT! AT THE DISCO [POP PUNK PARTY]
Description: Saturday June 8 at Rickshaw Stop, SF
Date and Time: Starts on June 08, 2024, at 09:00 PM and ends on June 09, 2024, at 02:00 AM (Pacific Time).
Location: 155 Fell Street, San Francisco, CA 94102
URL: https://www.eventbrite.com/e/riot-at-the-disco-pop-punk-party-tickets-859701970737
Image: https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F715179969%2F5617198057%2F1%2Foriginal.20240308-205655?w=1000&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=451c14d9280233cd9ca4bd4823810a28
Organizer: GBH

```

You should copy all files from `events` folder to `data` folder before running `npm run generate`.

Note: when converting new events, you need clean up `events` folder before you run the script.