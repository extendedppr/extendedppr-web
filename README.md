# Extended Property Price Register

<img src="/assets/screenshot.png" alt="screenshot"/>

A UI that shows historical property listings (over 250k properties) along with a view that matches Property Price Register items with listings (only around 8% of PPR items are matched) so we can see undervalued properties.

Graphs of information also included, more work needed here to add more stats.

Still plenty of data to get, clean and add.

Mapbox used for geocoding with Arcgis being used on low scoring matches if possible. I will use something else in future since when matches are bad, they're very bad.

## Running Locally

```bash
npm install
npm start
```

## TODO
 * Include rentals / share
 * Upload listing scraper and ppr matching repo
 * Find a way to deal with overlapping properties
