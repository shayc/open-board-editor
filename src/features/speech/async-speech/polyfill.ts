function polyfillBoundaryCharLength(event: any) {
  const { charIndex, target, utterance } = event as SpeechSynthesisEvent;

  if (!event.charLength) {
    const utter = utterance || (target as SpeechSynthesisUtterance);
    const spaceIndex = utter.text.indexOf(' ', charIndex);

    const charLength =
      (spaceIndex !== -1 ? spaceIndex : utter.text.length) - charIndex;

    event.charLength = charLength;
  }
}

export { polyfillBoundaryCharLength };
