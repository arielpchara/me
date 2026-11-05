---
title: A Fullstack JavaScript To-Do, from Node to React + Webpack — Part 2
pageTitle: A Fullstack JavaScript To-Do, from Node to React + Webpack (Part 2)
cardTitle: 'A Fullstack JavaScript To-Do — Part 2: the PUT method'
slug: todo-fullstack-js-parte-2
tags:
  - Node.js
  - REST API
  - JavaScript
excerpt: Implementing the PUT method in the Node.js microservice to edit MongoDB documents, completing the to-do API before moving on to the front end.
order: 6
medium:
  url: https://medium.com/@arielpchara/um-to-do-fullstack-javascript-do-node-ao-react-webpack-parte-2-4a3214360f3b
  notice: Originally published on Medium in September 2018
  badge: Medium · 2018
---

Continuing our saga, this article explains how to implement the PUT method in our service.

I hope you've already read and worked through the previous article. If not, check out [Part 1](/todo-fullstack-js-parte-1/).

Quick recap: our service accepts GET and POST methods, and we can insert new documents into the database and list all items in our collection.

---

### The PUT Method

> The PUT method replaces all current representations of the target resource with the request payload.

> [https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

A PUT request carries the document ID in the URL, like `/resource/document_id`. Since our service responds at the root URL `http://localhost:3000/`, the PUT will pass the ID like this: `http://localhost:3000/document_id`.

---

### Show me the code!

In the code, we import new libs and functions, parse the URL so the server can extract the id from the first URL parameter, and add PUT handling — checking for an existing id and running `replaceOne` on the database.

---

### Validating with Postman

First, hit the root endpoint with a GET to get the list of documents. If you don't have any yet, check Part 1 to see how to add one using POST.

From the list, copy a `_id` value — we'll use it in our PUT request.

The request targets `localhost:3000/5b8ee8833e2f3fbaa52acc45`, where that string is the document's `_id`. The request body is a JSON with the same keys as the document you want to update.

After sending the PUT, run GET again and confirm the document has been updated.

---

### Conclusion

We now have the three HTTP methods we need to build the React application: a to-do list where we can add a task string, toggle its done status, and soft-delete it.

Deletion will be handled logically — we will **not** remove the document from the database; instead we'll set a `removed` field to `true` and simply hide it on the front end. That's why we didn't implement DELETE on our service.

In the next article we'll configure *webpack* and render something on screen using React.

<p class="post-closing">Cheers.</p>
