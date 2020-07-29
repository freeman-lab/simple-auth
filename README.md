# simple-auth

Example of relatively simple password protection with `next.js`

## motivation

There are a lot of good libraries and examples for doing user authentication with `next.js`. Most of these use cases involve authenatication against third-party services (like Auth0) which in turn assume fairly complex user models, and the need to store user sessions in local storage or cookies.

In many cases, it's useful to have something much simpler and more transient, and more analogous to [HTTP Basic Authentication] -- for example, sharing early versions of a site with users or clients. You want the content behind a password, but it's for one-time viewing, and you don't have or want any user management.

Unfortunately, due to its limitations around custom servers, combining HTTP basic auth with `next.sj` and `vercel` is tricky.

## approach

This repo documents a relatively simple approach to password based auth. There are just three components that should be easy to add to any app.

`pages/api/auth.js`

An tiny API for requesting a temporary token given a password via a `POST`, and then confirming authentication status via a `GET`. Predetermined username/password combinations are stored on the server and specified via environmental variables.

`pages/login.js`

A page for logging in using the above API.

`lib/auth.js`

A `useAuth` hook for accessing the current authentication state, which uses `swr` under the hood. Also includes a higher-order-component `withAuth` for wrapping any page that needs authentication to view.

`lib/session.js`

A react `context` for storing and setting a session token across components.

## usage

This is not a library, but rather a pattern you could use in your own app. Genreally, it should be as easy as 
- adding the `lib` and the `api` to your app exactly as they are
- wrapping the top-level app in `_app.js` with the `SessionProvider`
- adding (and possibly customizing) the `login` page to your pages

Then, for any page you want authenticated, just wrap the exported component inside a `withAuth`.

## inspiration

I spent a lot of time looking at the following libraries and examples to figure this out, thanks to all those contributing to them
- https://github.com/nextauthjs/next-auth
- https://github.com/vvo/next-iron-session
- https://github.com/vercel/next.js/discussions/10724#discussioncomment-726
