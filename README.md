# Dutch Blitz Calculator

An online calculator for my friends and I to use to help keep score when we play the card game [Dutch Blitz](https://www.dutchblitz.com/). The current iteration of the app is still untested and requires plenty of UX and UI improvements.

Repo based off my [React Starter App](https://github.com/peetjvv/react-starter-app).

## Software requirements

- node 18
- npm

## Running locally

1. Clone the repo
2. cd into the repo root directory
3. Install dependencies with `npm ci`
4. Start by running `npm start`.
5. Navigate to `localhost:8080` in your browser.

## Tech stack

- React.js (including React Reducer)
- Firebase Hosting
- TypeScript
- Sass
- [Google Workbox](https://developer.chrome.com/docs/workbox)

## Caching

Game data (the react reducer state) is cached in `localstorage` and the webpage is cached using Google Workbox. The aim is that all data will be stored on the device's browser and that the webapp can be used while offline (thanks [load shedding](https://theculturetrip.com/africa/south-africa/articles/load-shedding-what-it-is-and-why-is-it-affecting-south-africa)!)
