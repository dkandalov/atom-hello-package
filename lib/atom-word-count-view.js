'use babel';

export default class AtomWordCountView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-word-count');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The AtomWordCount package is Alive! It\'s ALIVE!1111';
    message.classList.add('message');
    this.element.appendChild(message);
  }

  setCount(count) {
    this.element.children[0].textContent = `There are ${count} words.`;
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
