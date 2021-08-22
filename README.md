[![Netlify Status](https://api.netlify.com/api/v1/badges/3ad9c31e-bfe8-4f4c-8d2b-c4a6327f82e3/deploy-status)](https://app.netlify.com/sites/obe/deploys) [![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/shayc/open-board-editor)

# Open-Board Editor

A progressive web app for editing and viewing [Open Board Format](https://www.openboardformat.org/) (OBF) files. OBF files are used within [AAC](https://en.wikipedia.org/wiki/Augmentative_and_alternative_communication) applications to help non-verbal people (with Autism, ALS, etc.) to communicate with others by clicking on pictures to produce speech and sound.

## Features

- Works off-line
- Mobile friendly
- Keyboard navigation (tab, arrow keys, etc.)
- Supports multiple languages (including RTL)
- Import and export .obf/.obz files
- Theme support
- Completly free, [MIT license](LICENSE)

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

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Additional Scripts

### `npm run plop`

Runs plop and shows an interactive menu of generators to pick from.

### `npm run extract-intl`

Runs the I18N extraction script to merge translation messages defined in `.messages.js` files to `src/i18n/extracted-messages/{lang-code}.json`.

### `npm run storybook`

Starts [Storybook](https://storybook.js.org/docs/react/get-started/introduction) locally and output the address. Depending on your system configuration, it will automatically open the address in a new browser tab and you'll be greeted by a welcome screen.

### `npm run build-storybook`

### Analyze the app's build size

```sh
npm run build
npm run analyze
```

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Technical Details

Built with [React](https://reactjs.org/) and [Fluent UI](https://www.microsoft.com/design/fluent/#/web).
Uses the browser's Speech Synthesis API to generate speech, IndexedDB to store boards and LocalStorage to store user preferences.

### Speech Synthesis API

The application uses the browser's [Speech Synthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) to generate speech. Different voices (and languages) are available depending on the operating system (OS). In most OS You can install additional voices. Some browsers (e.g. Chrome) come with an additional set of voices.
