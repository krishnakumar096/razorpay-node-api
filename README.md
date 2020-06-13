# Razorpay Using TypeScript+Node
The main purpose of this repository is to show a working of Node.js API Server using razorpay library.

Read up here for getting started and understanding the payment flow with Razorpay: https://docs.razorpay.com/docs/getting-started

Official  [nodejs](https://razorpay.com/docs/server-integration/nodejs/) library available for Razorpay so we can directly use in our node project.


# Pre-requisites
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [PostgreSQL](https://www.postgresql.org/download/)
- Install [VS Code](https://code.visualstudio.com/)

# Setup
- Clone the repository
```
git clone https://gitlab.com/simpragma/starters/TypeScript-Node-Starter.git
```
- Install dependencies
```
cd <project_name>
npm install
```
- Run project
```
npm start
```

Finally, you will get [Swagger Document](http://localhost:3000/api-docs) for this project.

# Code Structure
The most obvious difference in a TypeScript + Node project is the folder structure.
In a TypeScript project, it's best to have separate _source_  and _distributable_ files.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.

The full folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | This contains the TypeScript build code that we deploy in the server.                         |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/config**           | This contains the mongodb connection, swagger document and other config code related to App   |
| **src/controllers**      | Controllers define functions that respond to various http requests                            |
| **src/models**           | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB  |
| **src/payload-schema**   | This contains the API payload schema                                                          |
| **src/route**            | This contains the All end point                                                               |
| **src/util**             | This contains token validation, schema validation, logger, other validation related to APP    |
| **src**/server.ts        | Entry point to your express app                                                               |
| **test**                 | Contains your tests. Separate from source because there is a different build process.         |
| .env.example             | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| .gitignore               | This contains the ignore files and folders                                                    |
| package.json             | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)                          |
| tsconfig.json            | Config settings for compiling server code written in TypeScript                               |
| nodemon.json             | Config settings for automatically restart the server                                          |

### Running command
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:


| Npm Script | Description  |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `build`                   | Full build. Runs ALL build tasks.                                                                 |
| `dev`                     | Runs node on dev server                                                                           |
| `prod`                    | Runs node on production server                                                                    |
| `test`                    | Runs tests using mocha and chai                                                                   |
| `lint`                    | Runs ESLint on project files                                                                      |

# Environment specific configuration

An environment variable is a KEY=value pair that is stored on the system where your code/app is being run and is accessible from within your code.

Create a .env file in the root of your project and insert your key/value pairs in the following format of KEY=VALUE:

```.env
SECRET_KEY=ashdfjhasdlkjfhalksdjhflak
PORT=3000
```

Node.js gives you access to the variables defined in your environment in the process.env global object.

We can directly use this env var in our project

```js
let PORT = process.env.PORT
```

# Build

- To Build this project, We just need to run this command
```
    npm run build
```
- After build, dist folder will create automatically which contains js files. 
- We need to create .env file inside the dist folder with all key and values.

# Test

For this project, I chose [Mocha and chai](https://mochajs.org/) as our test framework.
It provides functionality for testing both synchronous and asynchronous code with a very simple and similar interface

### Install the components
To add TypeScript + Mocha and chai support, first install a few npm packages:
```
npm install -D mocha chai @types/mocha @types/chai
```
`Mocha` is the testing framework, and `chai` is a assertion library to make running TypeScript tests a little easier.

### Configure Mocha & chai
We need to atach this command in scripts of package.json
```js
"test": "mocha -r ts-node/register test/**/*.test.ts"
```
Basically we are telling that we want it to consume all files that match the pattern `"**/test/**/*.test.(ts|js)"` (all `.test.ts`/`.test.js` files in the `test` folder), but we want to preprocess the `.ts` files first.
This preprocess step is very flexible, but in our case, we just want to compile our TypeScript to JavaScript using our `tsconfig.json`.
This all happens in memory when you run the tests, so there are no output `.js` test files for you to manage.

### Running tests

Write testcase inside test folder.

Simply run this command `npm run test` for unit testing.

## ESLint
ESLint is a code linter which mainly helps catch quickly minor code quality and style issues.

### ESLint rules
Like most linters, ESLint has a wide set of configurable rules as well as support for custom rule sets.
All rules are configured through `.eslintrc` configuration file.
In this project, we are using a fairly basic set of rules with no additional custom rules.

### Running ESLint
Like the rest of our build steps, we use npm scripts to invoke ESLint.
To run ESLint you can call the main build script or just the ESLint task.
```
npm run build   // runs full build including ESLint
npm run lint    // runs only ESLint
```
Notice that ESLint is not a part of the main watch task.

If you are interested in seeing ESLint feedback as soon as possible, I strongly recommend the [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).