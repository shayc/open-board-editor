[![Netlify Status](https://api.netlify.com/api/v1/badges/3ad9c31e-bfe8-4f4c-8d2b-c4a6327f82e3/deploy-status)](https://app.netlify.com/sites/obe/deploys) [![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/shayc/open-board-editor)

# Open-Board Editor

A progressive web app for viewing and editing [Open Board Format](https://www.openboardformat.org/) files. OBF files are used by [AAC](https://en.wikipedia.org/wiki/Augmentative_and_alternative_communication) applications to enable non-verbal people with speech impairment (Autism, ALS, etc.) to communicate by activating pictures that generate speech and sound.

## ⚠ Warning: Work-in-Progress.

If you're looking for a production ready, battle-tested AAC web app, checkout [Cboard](https://github.com/cboard-org/cboard) instead.

## Features

- Works off-line
- Mobile friendly
- Keyboard navigation (tab, arrow keys, etc.)
- Supports multiple languages (including RTL)
- Import and export `.obf`/`.obz` files
- Theme support
- Completly free - [MIT license](LICENSE)

## Technical Details

Built with [React](https://reactjs.org/) and [Fluent UI](https://www.microsoft.com/design/fluent/#/web).
Uses the browser's Speech Synthesis API to generate speech, IndexedDB to store boards and LocalStorage to store user preferences.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:integration`

Launches the browser integration test runner.

### `npm run test:integrationWithWatch`

Launches the browser integration test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Storybook

[Storybook](https://storybook.js.org/docs/react/get-started/introduction) is an open source tool for building UI components and pages in isolation

### `npm run start:storybook`

Starts Storybook locally and output the address. Depending on your system configuration, it will automatically open the address in a new browser tab and you'll be greeted by a welcome screen.

### `npm run build:storybook`

Builds Storybook as a static web application to the `storybook-static` folder.

## Additional Scripts

### `npm run plop`

Runs plop and shows an interactive menu of generators to pick from.

### `npm run extract-intl`

Runs the I18N extraction script that scans for `.messages.js` files, extract and merge their content to `src/i18n/extracted-messages/{lang-code}.json`.

### Analyze Build Size

```sh
npm run build
npm run analyze
```

### Advanced Configuration

https://facebook.github.io/create-react-app/docs/advanced-configuration
