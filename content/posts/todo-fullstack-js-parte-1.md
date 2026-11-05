---
title: A Fullstack JavaScript To-Do, from Node to React + Webpack — Part 1
pageTitle: A Fullstack JavaScript To-Do, from Node to React + Webpack (Part 1)
cardTitle: 'A Fullstack JavaScript To-Do — Part 1: the Node.js API'
slug: todo-fullstack-js-parte-1
tags:
  - Node.js
  - MongoDB
  - JavaScript
excerpt: Building a bare-bones HTTP microservice with Node.js and MongoDB — no frameworks, CORS-ready, handling GET and POST — the starting point for a 100% JavaScript application.
order: 5
medium:
  url: https://medium.com/@arielpchara/um-to-do-fullstack-javascript-do-node-ao-react-webpack-parte-1-8bbca286715
  notice: Originally published on Medium in September 2018
  badge: Medium · 2018
---

A basic understanding of JavaScript is required to follow this tutorial. It's aimed at anyone who wants to learn about the complete cycle of a 100% JavaScript application.

---

### Node.js

We'll build a very simple microservice application — no frameworks — connecting to a MongoDB database and handling CORS requests (for when the interface runs on a different domain than the API).

**IMPORTANT:** To start this project you need Node installed. My recommendation is to install it via NVM, which helps you manage Node versions.

> NVM: [https://github.com/creationix/nvm](https://github.com/creationix/nvm)

### Why React?

It's a very versatile library for building dynamic web interfaces. We'll cover some concepts like: containers, HOC and code splitting.

To get started I set up a repository with several branches, each one containing a step of the app build.

> [https://github.com/arielpchara/full-stack-javascript](https://github.com/arielpchara/full-stack-javascript)

---

### Starting with the API

Like any modern JavaScript application, it needs to be set up as an NPM module. This API requires Node version 8.11.4 — use NVM to update yours.

> NPM is a package manager for JavaScript.

```bash
# create the project folder
mkdir fullstack_javascript
# enter the project folder
cd fullstack_javascript
# create the API folder
mkdir api
# enter the API folder
cd api
# initialize as an NPM module
npm init -y
```

This will create a `package.json` file containing module information such as name, version, and description — and it lets you run scripts as well.

Now add a file called `index.js` with a simple HTTP server that accepts GET and POST methods.

To make development easier, it's useful to install `nodemon`, which detects every code change and restarts the server automatically.

```bash
npm i -D nodemon
```

To run the locally installed nodemon, add a script to `package.json`:

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

```bash
npm run dev
```

---

### Connecting to MongoDB

With MongoDB properly installed, let's make the server connect to the database. If you don't have it installed yet, follow the instructions at:

> [https://www.mongodb.com/download-center#community](https://www.mongodb.com/download-center#community)

Update `index.js` to connect to MongoDB, import the driver, and handle each HTTP method. Read the comments in the code to understand what each part does.

---

### Handling the POST method

To add new documents to our collection, we'll make a POST request. Use Postman to test it:

> [https://www.getpostman.com/](https://www.getpostman.com/)

Our service will receive the POST and insert the request body as a new document in the collection. Remember: the POST body must be in JSON format.

The code also handles unexpected cases, returning a JSON response with an `invalid request` message.

---

### Conclusion

We wrapped up this first part with a simple HTTP server that accepts GET and POST — where GET returns all items in the collection and POST creates a new document.

In the next article we'll add the PUT method to edit documents in the database.

<p class="post-closing">Cheers!</p>
