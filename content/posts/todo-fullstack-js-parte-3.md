---
title: A Fullstack JavaScript To-Do, from Node to React + Webpack — Part 3
pageTitle: A Fullstack JavaScript To-Do, from Node to React + Webpack (Part 3)
cardTitle: 'A Fullstack JavaScript To-Do — Part 3: React + Webpack'
slug: todo-fullstack-js-parte-3
tags:
  - React
  - Webpack
  - JavaScript
excerpt: 'Setting up Webpack from scratch with Babel and React: from npm init to the first Hello World in the browser, as the foundation for the to-do API interface.'
order: 7
medium:
  url: https://medium.com/@arielpchara/um-to-do-fullstack-javascript-do-node-ao-react-webpack-parte-3-1716a5d49840
  notice: Originally published on Medium in September 2018
  badge: Medium · 2018
---

We're back!

Now that we have our microservice to persist the to-do list data, let's build the interface for this API with the following features: add a new task, toggle its status, remove a task, and filter the list.

In this article we'll learn how to set up webpack with the bare minimum for a stress-free dev experience, and render a Hello World in React.

---

### Setting up the front-end project

```bash
# enter the project folder
cd fullstack_javascript
# create the front folder
mkdir front
# enter the front folder
cd front
# initialize as an NPM module
npm init -y
```

Install the first webpack packages:

```bash
npm i -D webpack webpack-cli
# i = install
# -D = development-only packages
```

Since webpack is installed locally, run it through *npm scripts* configured in `package.json`.

---

### Configure Webpack

Writing "modern" JavaScript requires a transpiler — browsers can't read it natively. The most widely used transpiler is **Babel**, which turns React code into plain JavaScript the browser understands.

**Webpack** doesn't translate the code itself — it orchestrates the translation, optimizes the bundle, handles images, processes CSS, and much more. Check the Plugins list to see what it can do.

Create `webpack.config.js` at the root of the front project with the `entry`, `output`, and `mode` fields. The comments in the code explain what each piece does for Webpack.

---

### First build

Create a file `./src/index.js` with just `console.log('hello')` and run:

```bash
npm run build
```

At the project root create an `index.html` that references the generated bundle. Open it in the browser, open *devtools* (<kbd>opt + cmd + i</kbd>), and check the console tab for the `"hello"` message.

---

### Adding Babel and React

Install the Babel packages for React support:

```bash
npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react
```

In `webpack.config.js`, add the `module` configuration to process `.js` files with `babel-loader`.

Now install the React packages:

```bash
npm i -S react react-dom
# -S to save in package.json
```

Rewrite `./src/index.js` with a basic React component using `ReactDOM.render` and run again:

```bash
npm run build
```

Open `index.html` in the browser — you should see a glorious **Hello World** on screen.

---

### Conclusion

Our application now has two packages: one for the microservice and one for the front end, already powered by webpack for React transpilation.

We covered how to configure webpack at a minimum — generating browser-readable JavaScript and interpreting React code.

In the next article we'll build our first component and make the first API request.

<p class="post-closing">Cheers</p>
