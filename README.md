# Movie Reviews API
## An example of using Auth0 to access an API with client authorization

Based on https://scotch.io/tutorials/building-and-securing-a-modern-backend-api

Many modern applications separate the backend services from the frontend user interface. In this type of architecture, the backend will expose a web based API that the frontend client consumes. Typically, the backend will handle incoming requests and return a JSON or XML encoded response. The frontend will then be in charge of formatting, styling, and displaying this response to the user. We’ve all heard the term “separation of concerns” and applying it at this scale has many benefits.

The backend services can grow and evolve independent of the frontend client. New APIs, if properly versioned, can provide new features and functionality without breaking existing integrations. A single backend can interface with multiple clients and the frontend clients will not be limited to any specific framework or programming language. This means that your single backend can work with your app for both a web based implementation, your mobile app, and even with IoT devices.

This example uses two front-end clients, also with NodeJS, that are going that consume the API. The API is going to be protected with Auth0. In addition to protecting the API endpoints, this example uses specific roles to each of our clients and show how to give granular access to the API.


## Public Facing Clients

User Client- https://github.com/JohnAntonusMaximus/movie-analyst-client

Admin Client - https://github.com/JohnAntonusMaximus/movie-analyst-admin

## API 

API - https://github.com/JohnAntonusMaximus/movie-analyst-api