# Guest Management System (Backend)

Developed with 💙 by [Furation Tech Solutions][furation_tech_link] 🚀

A Furation Backend Starter Project created by the [Furation Tech Solutions Team][furation_tech_link].

---

<p align="center">
  <a href="https://www.furation.tech/">
   <img src="https://lh3.googleusercontent.com/p/AF1QipPV1Mbi1rrai_q7YYFbVYI5vSEK_xz4MDr6JgIJ=s1360-w1360-h1020" alt="Logo">
  </a>

  <h3 align="center">GMS (Furation Tech Solutions)</h3>

  <p align="center">
    We love to find solutions.
    <br />
    <a href="https://www.furation.tech/"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="https://in.linkedin.com/company/furation-tech-solutions">Linkedin</a>
  </p>
</p>


## About the Project

# The Versatile Role of a Guest Management System

A guest management system is a sophisticated software application that plays a pivotal role in ensuring the smooth and organized handling of guests or visitors across different industries and institutions. 

It is a versatile tool that can be customized to meet the specific needs and requirements of the establishment it serves.

### Built With

- [NodeJs](https://nodejs.org/en/docs)
- [ExpressJs](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)


## Getting Started 🚀

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need to be able to run Cal.com.

- Node.js (Version: >=18.x)
- MongoDB
- Yarn _(recommended)_
# Install Node.js , npm and yarn

[Install Node.js & npm][install_node]
[Install Yarn][install_yarn]


## Development

### Setup

1. Clone the repo into a public GitHub repository (or fork https://github.com/Furation-Tech-Solutions/GMS-BE.git).

   ```sh
   git clone https://github.com/Furation-Tech-Solutions/GMS-BE.git
   ```

1. Go to the project folder

   ```sh
   cd GMS-BE
   ```

1. Install packages with yarn

   ```sh
   yarn
   ```

1. Set up your `.env` file
   - Duplicate `.env.example` to `.env`


1. Run (in development mode)

   ```sh
   yarn run dev
   ```



Note: Delete package-lock.json and maintain yarn.lock

# Commit Lint

Follow [Commit Lint][commint_lint] to follow conventional commits:

### Type of commits

```sh
feat:     The new feature being added to a particular application

fix:       A bug fix (this correlates with PATCH in SemVer)

style:    Feature and updates related to styling

refactor: Refactoring a specific section of the codebase

test:     Everything related to testing

docs:     Everything related to documentation

chore:    Regular code maintenance
```

# Manage dependencies via yarn ONLY

This project manages dependencies via yarn:

Basic commands to install & remove dependency is provided below:
1. Add dependency via the following command:
```yarn add express```
2. Remove dependency via the following command:
```yarn remove express```

# Running tests 🧪

Run tests by running the following command:
```yarn run test```

## Code Overview

# Dependencies

* [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests.
* [module-alias](https://github.com/ilearnio/module-alias) - Create aliases for directories to easily import modules in Node.js.
* [mongodb](https://github.com/mongodb/node-mongodb-native) - MongoDB driver for Node.js. Used for modeling and mapping MongoDB data to JavaScript.
* [nodemon](https://github.com/remy/nodemon) - Utility that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.    

# Dev dependencies

* [@commitlint/cli](https://github.com/conventional-changelog/commitlint) - Lint commit messages.
* [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint) - Shareable commitlint configuration to enforce conventional commit messages.
* [@shelf/jest-mongodb](https://github.com/shelfio/jest-mongodb) - Jest preset for MongoDB to facilitate testing.
* [@types/jest](https://www.npmjs.com/package/@types/jest) - Provides TypeScript type definitions for Jest testing framework.
* [@types/node](https://www.npmjs.com/package/@types/node) - Provides TypeScript type definitions for Node.js.
* [@types/supertest](https://www.npmjs.com/package/@types/supertest) - Provides TypeScript type definitions for Supertest library.
[@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) - ESLint plugin for TypeScript-specific linting rules.
* [eslint](https://eslint.org/) - Pluggable and configurable JavaScript linter.
* [eslint-config-standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript) - ESLint shareable config for TypeScript with StandardJS style.
* [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) - ESLint plugin for linting ES6 import/export syntax.
* [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n) - ESLint plugin for linting Node.js code.
* [eslint-plugin-promise](https://github.com/eslint-community/eslint-plugin-promise) - ESLint plugin for linting Promise-related code.
* [husky](https://github.com/typicode/husky) - Git hooks made easy. Enables running scripts before commits and pushes.
* [jest](https://jestjs.io/) - JavaScript testing framework with a focus on simplicity.
[lint-staged](https://github.com/okonet/lint-staged) - Run linters on pre-committed files.
* [supertest](https://github.com/ladjs/supertest) - Provides a high-level abstraction for testing HTTP.
* [ts-jest](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/) - Allows running TypeScript tests with Jest.
* [typescript](https://www.typescriptlang.org/) - TypeScript is a language for application-scale JavaScript development.

[commint_lint]: https://www.conventionalcommits.org/en/v1.0.0/
[ts_jest_doc]: https://jestjs.io/docs/getting-started
[clean_architecture]: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
[install_yarn]: https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
[install_node]: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm  
[logo_black]: ./furation-logo.png
[logo_white]: ./furation-logo.png
[furation_tech_link]: https://furation.tech/?utm_source=github&utm_medium=banner&utm_campaign=core
[furation_tech_link_dark]: https://furation.tech/?utm_source=github&utm_medium=banner&utm_campaign=core#gh-dark-mode-only
[furation_tech_link_light]: https://furation.tech/?utm_source=github&utm_medium=banner&utm_campaign=core#gh-light-mode-only
[husky]: [https://typicode.github.io/husky/]
