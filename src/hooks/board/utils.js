function getAvailableName(name, list) {
  const re = new RegExp(`^${name}(?:\\s\\((\\d+)\\))?`, 'i');

  const items = list
    .filter((i) => {
      const matches = re.test(i);
      return matches;
    })
    .map((i) => {
      const matches = re.exec(i);
      const num = matches[1] ? Number(matches[1]) : 0;
      return num;
    })
    .sort((a, b) => a - b);

  let filename = name;
  let shouldIncrement = false;

  for (let i = 0; i < items.length; i++) {
    if (items[0] !== 0) {
      break;
    }

    if (items[i] - items[i + 1] < -1 || items.length - 1 === i) {
      shouldIncrement = true;
      filename = `${name} (${items[i]})`;
      break;
    }
  }

  const availableName = shouldIncrement
    ? incrementFilename(filename)
    : filename;

  return availableName;
}

function incrementFilename(name) {
  const isIncremented = isFilenameIncremented(name);

  const filename = isIncremented
    ? name.replace(/\d+(?=\)$)/, (m) => +m + 1)
    : `${name} (1)`;

  return filename;
}

function isFilenameIncremented(name) {
  const m = /\s\((\d+)\)$/.exec(name);

  return m && m[1];
}

export { getAvailableName };
