# Extended Property Price Register

<img src="/assets/screenshot.png" alt="screenshot"/>

A UI that shows historical property listings (~300k properties) along with a view that matches Property Price Register items with listings (only around 9% of PPR items are matched) so we can see undervalued properties.

Also shows historical shared properties and rental properties.

Graphs of information also included, more work needed here to add more stats.

Still plenty of data to get, clean and add.

Multiple services used for geocoding. I will use something else in future since when matches are bad, they're very bad.

## Running Locally

```bash
npm install
npm start
```

## TODO
 * Upload listing scraper and ppr matching repo
 * Find a way to deal with overlapping properties
