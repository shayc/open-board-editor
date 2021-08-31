import { useState } from 'react';

function useOutput(params) {
  const { playAudio, speak } = params;
  const [values, setValues] = useState([]);

  function addValue(value) {
    setValues((values) => [...values, value]);
  }

  function addSpace() {
    addValue({});
  }

  function clear() {
    setValues([]);
  }

  function clearLastValue() {
    setValues((values) => values.slice(0, values.length - 1));
  }

  function spellValue(string) {
    const newValues = modifyLastValue(values, (value) => {
      return {
        ...value,
        label: `${value?.label || ''}${string}`,
      };
    });

    setValues(newValues);
  }

  async function activateOutput() {
    const outputByType = groupValuesByType(values);

    for (const output of outputByType) {
      if (output.type === 'text') {
        await speak(output.value);
      }

      if (output.type === 'sound') {
        await playAudio(output.value);
      }
    }
  }

  const outputCtrl = {
    activateOutput,
    addSpace,
    addValue,
    clear,
    clearLastValue,
    setValues,
    spellValue,
  };

  return [values, outputCtrl];
}

function modifyLastValue(values, fn) {
  const lastValue = values[values.length - 1];
  const modifiedValue = fn(lastValue);

  const newValues = values.length
    ? [...values.slice(0, values.length - 1), modifiedValue]
    : [modifiedValue];

  return newValues;
}

function groupValuesByType(values) {
  const valuesByType = [];

  values.forEach(({ vocalization, label, sound }) => {
    const text = vocalization || label;

    if (sound) {
      valuesByType.push({ type: 'sound', value: sound });
    } else if (text) {
      const lastOutput = valuesByType[valuesByType.length - 1];

      if (lastOutput?.type === 'text') {
        lastOutput.value = `${lastOutput.value} ${text}`;
      } else {
        valuesByType.push({ type: 'text', value: text });
      }
    }
  });

  return valuesByType;
}

export default useOutput;
