# Shop API

A simple Shop API

## Table Of Contents

*   [Tech Stack](#tech-stack)
*   [Documentation](#documentation)
*   [Demo](#demo)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Environment Variables](#environment-variables)
    *   [Run Locally](#run-locally)
*   [Contributing](#contributing)
*   [Appendix](#appendix)
*   [License](#license)
*   [Authors](#authors)

## Tech Stack

*   [Node.js](https://nodejs.org) - a JavaScript runtime environment for building and running server-side web applications
*   [Express.js](http://expressjs.com) - a web application framework for Node.js
*   [Mongodb](https://mongodb.com) - a NoSQL database
*   [OpenAPI 3.0](https://openapis.org) - an API description format for REST APIs

## Documentation

[Documentation](https://shop-api.iran.liara.run/api/v1/docs/redoc)

## Demo

[Shop API](https://shop-api.iran.liara.run) hosted on [Liara](http://liara.ir/)

## Getting Started

### Prerequisites

You need to install:

*   [Node.js](https://nodejs.org)
*   [Mongodb](https://www.mongodb.com/try/download/community)

Upgrade npm to the latest version:

```sh
npm install npm@latest -g
```

### Installation

Clone the repository and open project directory

```sh
git clone https://github.com/AriaRahmati/shop-api.git
cd shop-api
```

Install dependencies and run build command

```sh
npm install
npm run build
```

Create `.env` file

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.

`PORT = 'SERVER_PORT' # Default: 3000`

`DATABASE_URI = 'YOUR_MONGODB_URI'`

`JWT_SECRET = 'YOUR_JWT_SECRET'`

`JWT_LIFETIME = 'PREFERRED_JWT_LIFETIME' # Example: '60', '120ms', '2 days', '10h', '7d'`

### Run Locally

```sh
npm start
```

##### Development:

```sh
npm run dev
```

Console output should look like this:

```sh
connecting to database...
connected to database successfully
server is listening on port {PORT}
```

Then you can see the docs at `http://localhost:{PORT}/api/v1/docs`

and start working with the api at `http://localhost:{PORT}/api/v1`
## Contributing

Based on [commitlint](https://commitlint.js.org) documents:

#### Activate hooks

```sh
npx husky install
```

#### Add hook

```sh
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

See [Conventional Commits](https://www.conventionalcommits.org) for more info.

| Type     | Description                                                                      |
| :------- | :------------------------------------------------------------------------------- |
| feat     | A new feature                                                                    |
| fix      | A bug fix                                                                        |
| docs     | Documentation only changes                                                       |
| style    | Changes that do not affect the meaning of the code (white-space, formatting etc) |
| refactor | A code change that neither fixes a bug nor adds a feature                        |
| perf     | A code change that improves performance                                          |
| test     | Adding missing tests or correcting existing tests                                |
| build    | Changes that affect the build system or external dependencies                    |
| ci       | Changes to our CI configuration files and scripts                                |
| chore    | Other changes that don't modify src or test files                                |
| revert   | Reverts a previous commit                                                        |

## Appendix

Shop API uses [module-alias](https://github.com/ilearnio/module-alias) to make it easier to work with complex directory structures.

In order to make your intellisense to function, you need to add these `paths` to `compilerOptions` in `jsconfig.json`.

###### jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "module": "commonjs",
    "target": "es6",
    "paths": {
      "@root/*": ["*"],
      "@src/*": ["src/*"],
      "@routes/*": ["src/routes/*"],
      "@configs/*": ["configs/*"],
      "@middlewares/*": ["src/http/middlewares/*"],
      "@controllers/*": ["src/http/controllers/*"],
      "@validators/*": ["src/http/validators/*"],
      "@models/*": ["src/models/*"],
      "@errors/*": ["src/errors/*"]
    }
  }
}
```

## License

[MIT](https://github.com/AriaRahmati/shop-api/blob/main/LICENSE)

## Authors

- [@AriaRahmati](https://github.com/AriaRahmati)
