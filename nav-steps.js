import { LitElement, html, property } from '/node_modules/lit-element/lit-element.js';

class NavSteps extends LitElement {
  static get properties() {
    return {
      stateNumber: { type: Number },
      stateStrings: { type: Array},
      state: { type: Number },
      strBalls: { type: String }
    }
  }

  constructor() {
    super();
    this.stateNumber = 5;
    let strBalls = '';
    for (let i = 0; i < this.stateNumber; i++) {
      strBalls += '<div class="ball"></div>';
      if (i !== this.stateNumber - 1) {
        strBalls += '<div class="line"></div>';
      }
    }
    this.strBalls = `${strBalls}`;
    console.log(this.strBalls);
  }

  render() {
    return html`
      <style>
        button, p {
          display: inline-block;
        }
        .ball { border:1px solid #000; width:${this.size}px; height:${this.size}px; border-radius:50%; }
        .line { border-bottom:1px solid #000; width:${this.size}px; height:${this.size / 2}px; }
      </style>
      <div class="wrapper">
        ${this.strBalls}
      </div>

      <button @click="${() => this.decrement()}" aria-label="decrement">-</button>
      <p>${this.value}</p>
      <button @click="${() => this.increment()}" aria-label="increment">+</button>
    `;
  }

  decrement() {
    this.value--;
    this._valueChanged();
  }

  increment() {
    this.value++;
    this._valueChanged();
  }

  _valueChanged() {
    // Fire a custom event for others to listen to
    this.dispatchEvent(new CustomEvent('valueChange', { detail: this.value }));
  }
}

customElements.define('nav-steps', NavSteps);