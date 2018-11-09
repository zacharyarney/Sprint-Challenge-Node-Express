# Review Questions

## What is Node.js?

  - Node.js is a runtime environment that allows a computer to run JavaScript ouside of a web browser.

## What is Express?

  - Express is a backend framework for JavaScript that allows for things like routing and middleware.

## Mention two parts of Express that you learned about this week.

  - We learned about Router which allows you to consolidate endpoints into separate files.
  - We also learned about middleware which is just functions you can add into your endpoints to alter the data passing through.

## What is Middleware?

  - See above. It's just functions that allow you to manipulate the request and response objects from your endpoints.

## What is a Resource?

  - A resource is any identifiable thing on a network (i.e. the internet, or in our case the localhost network). A resource can be accessed via a URI/URL.

## What can the API return to help clients know if a request was successful?

  - The API can return a status code (200-something for success) and a JSON payload. 

## How can we partition our application into sub-applications?

  - You can use Routers to split things up into sub-applications. This allows for a more modular format which can be both more readble and more flexible.

## What is express.json() and why do we need it?

  - Adding `server.use(express.json())` gives us access to the built-in middleware in Express. Without it we cannot parse JSON payloads.
