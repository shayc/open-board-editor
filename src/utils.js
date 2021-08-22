export function debounce(callback, wait) {
  let timeoutId;

  return (...args) => {
    function next() {
      callback.apply(this, args);
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(next, wait);
  };
}

export function playAudio(src) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(src);

    audio.onended = (event) => {
      resolve(event);
    };

    audio.onerror = (event) => {
      reject(event);
    };

    audio.play();
  });
}
