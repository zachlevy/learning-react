# Learning Platform React Front End
Used for interacting with the api app.

## Getting Started (Development)
Untested** If you follow these, update this.

* Clone repository
* `$ npm i` to install dependencies, might have to work through some dependencies for bootstrap
* `$ npm run local` for the local development environment. Environment variables are set in here
* Make sure you have `learning-api` on port 3001 up and running, and potentially `learning-wikipedia-reverse-proxy` on port 3002


## Deployment
Currently hosted on Heroku app `learning-react-production`.

`$ git push heroku master`

## Analytics
Use `track` method from the `analytics` module as a wrapper for analytics libraries. See `track` method for details.

## Environment Variables
Set environment variables when you run in `packages.json` for development.

* `REACT_APP_API_URL` /api
* `PROX_API_URL` http://api.voralearning.com
* `REACT_APP_GA_ID` Google Analytics
* `REACT_APP_MIXPANEL_TOKEN` Mixpanel Analytics
* `REACT_APP_WIKIPEDIA_URL` https://en.m.wikipedia.org or proxy server

## Models

### Courses
Courses aka mini courses are a collection of challenges.
The course `flow` is an array of `Challenge` objects with `id` and `type`. `type` is required because we load the type before we load the challenge data for UX purposes. The flow may be altered while the user is in the mini course for Adaptive Learning. This is currently done through `Challenge dependencies`.

### Challenge
Challenges are displayed to the user as part of a Course.
The `Course flow` determines what order the user sees the challenges in. At the end of the challenges in the Course flow, a user has completed the course.

#### Challenge Types
* Content may be watching a YouTube video, reading Wikipedia, etc.
* Assessment may be being asked a short answer question, or multiple choice.
* Challenges may also be used as introduction or ending slides.

See `src/modules/defaults.js` for the default `body` templates of Challenge Type instances.

#### Adding a Challenge Type
When adding a challenge type on the `learning-api`, you'll need to add a corresponding Challenge Component in `src/Containers/Challenge/Components`. Make sure also to add the machine name to `src/Containers/Challenge/Components/index.js`. This helps load the right component based on the machine name in `learning-api`.

### User
The user model is quite simple, just a user `id`, which is used for all relations, and `email`. Everything else should be stored in `profile`.

#### Authentication
Authentication is handled with JWT. A user logs in which returns a jwt. The jwt is currently stored in the `user` Redux store. This should be moved to something more secure like a http cookie to avoid h4x0rs.

Authentication with the server is done through a `Authorization Bearer token` in the header of a request. The `apiRequest` function in `src/modules/data.js` adds the header to all requests to the API once a user is logged in.

### Profile
Profile is used to store any information related to the user beyond authentication.

### Feedback
Feedback is used for the user providing feedback to the platform owners.

Note: The term `feedback` is also used by the platform for giving `feedback` to the users when they are doing an assessment.

## Modularization
`src/modules/` is used for reusable functions that do not particularly relate with anything. For shared React components like navbars, footers, generic components used in many Containers, etc. there is the `src/Containers/Shared/` folder.

## Stores and Redux
Redux is included in the project. Anything ephemeral or mostly contained within components is stored in the Component states atm. Redux is used mostly for everything outside of Challenges. This is a possible refactor.

When adding a reducer for redux in `src/modules/redux/` make sure to include it in the index.

## Testing
There is currently no automated testing.

## User Experience / Design / UI

### Math Equations
TeX is used for displaying math equations. Wrap your TeX in `<t>` tags. Use the [TeX cheat sheet](https://www.math.brown.edu/~jhs/ReferenceCards/TeXRefCard.v1.5.pdf) and [KaTeX ](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX) for reference.

#### TeX Example
`<t>\sqrt{(1+2)}</t>`

KaTeX is used to render the TeX.

### Markdown
Markdown is used for display rich text. It is available in many fields. Use the [GitHub Markdown](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf) for reference.

### Palette
The site has no strict palette. It uses many subtle patterns on gradient backgrounds. [uigradients.com](uigradients.com) is a good source for new gradient backgrounds. Patterns are used in addition to gradients.

### Subtle Patterns
Patterns are made manually in photoshop, possible inspiration from [subtlepatterns](https://www.toptal.com/designers/subtlepatterns/). They are `.png` files in `public/subtle_patterns/`.

## Wikipedia Proxy
The wikipedia proxy is set with the environment variable `REACT_APP_WIKIPEDIA_URL`. It is a proxy layer between the user and the Wikipedia embeds so that we can insert some javascript into the page to manipulate and track the user's interactions.

`public/wikipedia.css` and `public/wikipedia.js` are the files inserted in the Wikipedia pages.

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
