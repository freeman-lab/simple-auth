# simple-auth

Example of relatively simple password protection with `next.js`

Try the [demo](https://simple-auth-ten.vercel.app/)

## motivation

There are a lot of good libraries and examples for doing user authentication with `next.js`. Most of these use cases involve authenatication against third-party services (like Auth0) which in turn assume fairly complex user models, and assume you want to store user sessions in local storage or cookies.

In many cases, it's useful to have something much simpler and more transient, and more analogous to [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) — for example, sharing early versions of a site privately with users or clients. You want the content behind a password, but it's for previewing, with no user data, and you don't have or want any user management.

Unfortunately, combining HTTP basic auth with `next.sj` and `vercel` is tricky, due to its (understandable) limitations around custom servers. And while `vercel` offers a [paid option](https://vercel.com/blog/protecting-deployments) for adding simple password protection, it's expensive at $150/mo, and only applies to the site as a whole, not to individual pages.

## approach

This repo documents a relatively simple approach to password authentication. It's based entirely on basic `next.js` features and the really nice [`swr`](https://github.com/vercel/swr) library. There are just three components that should be easy to add to any `next.js` app.

`pages/api/auth.js`

An tiny API for requesting a temporary token given a password via a `POST`, and then confirming authentication status via a `GET`. Predetermined username/password combinations are stored on the server and specified via environmental variables.

`pages/login.js`

A page for logging in using the above API.

`lib/auth.js`

A `useAuth` hook for accessing the current authentication state, which uses `swr` under the hood. Also includes a higher-order-component `withAuth` for wrapping any page that needs authentication to view.

`lib/session.js`

A react `context` for storing and setting a session token across components.

## usage

This repo is not a library, but rather a pattern you could use in your own app. Genreally, adding auth with this approach should be as easy as 
- adding `lib/auth` and `lib/session` and the `api` to your app exactly as they are here
- wrapping the top-level app by adding `SessionProvider` to your `_app.js` 
- adding (and possibly customizing) the `login` page to your pages directory

Then, for any page you want authenticated, just wrap the exported component inside a `withAuth`.

## inspiration

I spent a lot of time looking at the following libraries and examples, thanks to all those contributing to them!
- https://github.com/nextauthjs/next-auth
- https://github.com/vvo/next-iron-session
- https://github.com/vercel/next.js/discussions/10724#discussioncomment-726
