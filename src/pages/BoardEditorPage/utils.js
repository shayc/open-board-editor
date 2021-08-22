export function share() {
  navigator.share?.({
    title: 'Open-Board Editor',
    text: 'Check out Open-Board Editor.',
    url: window.document.location.href,
  });
}

export function print() {
  window.print();
}

export function openFileDialog({ accept = '' } = {}) {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;

    input.onchange = (event) => {
      resolve(event.target.files);
    };

    input.click();
  });
}
