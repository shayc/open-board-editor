/**
 * This script will extract the internationalization messages from all components
 * and package them in the translation json files in the translations folder.
 */

import shell from 'shelljs';
import fs from 'fs';
import nodeGlob from 'glob';
import { transform } from '@babel/core';
import { get } from 'lodash-es';

import { APP_LOCALES, DEFAULT_LOCALE } from '../../src/i18n/i18n.js';
import animateProgress from './helpers/progress.js';
import addCheckmark from './helpers/checkmark.js';

process.env.NODE_ENV = 'production';

const FILES_TO_PARSE = 'src/**/*.messages.js';

const newLine = () => process.stdout.write('\n');

// Progress Logger
let progress;
const task = (message) => {
  progress = animateProgress(message);
  process.stdout.write(message);

  return (error) => {
    if (error) {
      process.stderr.write(error);
    }
    clearTimeout(progress);
    return addCheckmark(() => newLine());
  };
};

// Wrap async functions below into a promise
const glob = (pattern) =>
  new Promise((resolve, reject) => {
    nodeGlob(pattern, (error, value) =>
      error ? reject(error) : resolve(value)
    );
  });

const readFile = (fileName) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (error, value) =>
      error ? reject(error) : resolve(value)
    );
  });

// Store existing translations into memory
const oldLocaleMappings = [];
const localeMappings = [];

for (const locale of APP_LOCALES) {
  oldLocaleMappings[locale] = {};
  localeMappings[locale] = {};

  const translationFileName = `src/i18n/extracted-messages/${locale}.json`;

  try {
    const messages = JSON.parse(fs.readFileSync(translationFileName));
    const messageKeys = Object.keys(messages);

    for (const messageKey of messageKeys) {
      oldLocaleMappings[locale][messageKey] = messages[messageKey];
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      process.stderr.write(
        `There was an error loading this translation file: ${translationFileName}
        \n${error}`
      );
    }
  }
}

const extractFromFile = async (filename) => {
  try {
    const code = await readFile(filename);
    const output = await transform(code, {
      filename,
      presets: ['react-app'],
      plugins: ['react-intl'],
    });

    const messages = get(output, 'metadata.react-intl.messages', []);

    for (const message of messages) {
      for (const locale of APP_LOCALES) {
        const oldLocaleMapping = oldLocaleMappings[locale][message.id];
        const newMsg = locale === DEFAULT_LOCALE ? message.defaultMessage : '';

        localeMappings[locale][message.id] = oldLocaleMapping || newMsg;
      }
    }
  } catch (error) {
    process.stderr.write(`\nError transforming file: ${filename}\n${error}\n`);
  }
};

const memoryTask = glob(FILES_TO_PARSE);
const memoryTaskDone = task('Storing language files in memory');

memoryTask.then((files) => {
  memoryTaskDone();

  const extractTask = Promise.all(
    files.map((fileName) => extractFromFile(fileName))
  );
  const extractTaskDone = task('Run extraction on all files');

  extractTask.then(() => {
    extractTaskDone();

    // Make the directory if it doesn't exist, especially for first run
    shell.mkdir('-p', 'src/i18n/extracted-messages');

    let localeTaskDone;
    let translationFileName;

    for (const locale of APP_LOCALES) {
      translationFileName = `src/i18n/extracted-messages/${locale}.json`;
      localeTaskDone = task(
        `Writing translation messages for ${locale} to: ${translationFileName}`
      );

      // Sort the translation JSON file so that git diffing is easier
      // Otherwise the translation messages will jump around every time we extract
      const messages = {};
      Object.keys(localeMappings[locale])
        .sort()
        .forEach((key) => {
          messages[key] = localeMappings[locale][key];
        });

      // Write to file the JSON representation of the translation messages
      const prettified = `${JSON.stringify(messages, null, 2)}\n`;

      try {
        fs.writeFileSync(translationFileName, prettified);
        localeTaskDone();
      } catch (error) {
        localeTaskDone(
          `There was an error saving this translation file: ${translationFileName}
          \n${error}`
        );
      }
    }

    process.exit();
  });
});
