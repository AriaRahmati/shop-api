
# Shop API

A simple Shop API

## Table Of Contents

*   [Built With](#built-with)
*   [Documentation](#documentation)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Environment Variables](#environment-variables)
    *   [Run Locally](#run-locally)
*   [Contributing](#contributing)
*   [License](#license)
*   [Authors](#authors)

## Built With

*   `Node.js`
*   `Express`
*   `Mongodb`
*   Documented with `OpenAPI 3.0` specification.

## Documentation

[Documentation](https://shop-api.iran.liara.run/api/v1/docs/redoc)

## Getting Started

### Prerequisites

You need to install:

*   [node.js](https://nodejs.org)
*   [mongodb](https://www.mongodb.com/try/download/community)

Upgrade npm to the latest version:

```html
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

`PORT = 'SERVER_PORT'`

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

## License

[MIT](https://github.com/AriaRahmati/shop-api/blob/main/LICENSE)


## Authors

- [@AriaRahmati](https://github.com/AriaRahmati)
