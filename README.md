# TOPSpot

**_Web app for Spotify Premium users to see their most listened to tracks and artists_**

Check out the live site [**here**](https://tinyurl.com/topspot-spotify).

## Project Overview

TOPSpot is a web app for Spotify Premium users to see their
most listened to tracks and artists.

Users can see their top artists and tracks from the past month, past 6 months and from all time. Additionally, users can create a playlist of their top tracks and save it directly to their Spotify account.

### Stack

- React
- SASS
- React Query (now TanStack Query)

## Purpose and Goal

One of the perks of being a Spotify Premium user is the annual Wrapped experience, which celebrates the music you've been listening to all year. I was inspired to create an experience using the Spotify API that presented this information all year round.

For this project I wanted to focus on building reusable React components that presented data clearly, using SASS to create a style that feels like an extension of Spotify's own UI. Additionally, I wanted to ensure the site had a responsive design across multiple viewport sizes.

## Implementation & Features

#### STACK

The front-end was built with React and SASS. Asynchronous Spotify API requests were made using the React Query library, which makes fetching and caching data, as well as error handling, an easier task.

#### STATE & APIs

When deciding how to manage application statem, it is important to distinguish between state that is owned and managed by the application (e.g. UI state - `isOpen`) and server state (state persisted remotely and/or managed by someone else). The data being used in this app is **server state** and so rather than manually storing and updating using `useState` or `useReducer`, it is best stored in a cache using a library such as React Query that will handle caching, background updates and stale data for you.

One disadvantage of the Spotify REST API is unnecessary overfetching. A GraphQL API would allow for more flexibility in the data being fetched and negate the need to manipulate data before presenting it to the user in the app.

#### ANIMATION

To achieve a fluid look of elements fading into view once they enter the screen, I used the Intersection Observer API to detect when elements enter and intersect the parent element or the device's viewport. At that point an animation, created with Framer Motion, is triggered to move the element up the y-axis and change the opacity from 0 to 1.

#### AUTHORIZATION

The most complex part of the build was secure authorization - implementing the Authorization Code flow with PKCE (Proof Key for Code Exchange). The initial build of the app used Implicit Grant flow, where an access token for the API is granted for a short period of time and received in the browser's address bar. This has some disadvantages such as a lack of refresh token, which requires requesting user authorization again once the access token expires, and unsecured access tokens.

Authorization Code flow with PKCE is recommended for client-side rendered apps, such as React apps, where client secrets cannot be safely stored. It also provides protection against attacks where the authorization code may be intercepted.

It was important to create a loop that checks if the access token is still valid before every API request, and if not, the refresh token is used to create and store the new access token in local storage. This means further user input is not required every time an access token is required, which lends itself to a better user experience.

## Lessons Learned

TOPSpot was a fun project to build, mostly due to the subject matter. Using React Query and SASS really helps cut down on repetitive boilerplate code and CSS respectively. This was the first time I had learned and implemented OAuth 2.0 Authorization Code with PKCE Flow and will be sure to use it in future builds.

Additional features that could be added include: Spotify recommendations, a built in music player, and interpreting and displaying the results in different ways, e.g. showing the user the most common genre they listen to or when their top tracks were released.
