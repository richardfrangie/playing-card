class PlayingCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
    :host {
    display: inline-grid;
    width: var(--size-width-card);
    height: var(--size-height-card);
    background: var(--color-card);
    border-radius: 5%;
    color: var(--red-card);
    margin: 1rem;
    border: 1px solid var(--color-border);
    user-select: none;
    align-items: center;

    &::before, &::after {
    content: var(--rank-suit);
    display: block;
    font-size: var(--size-text-rank);
    padding: 0 0.25rem;
    }

    &::after {
    justify-self: end;
    align-content: end;
    transform: rotate(180deg);
    }
    }

    :host([suit="club"]), :host([suit="spade"]) {
    color: var(--black-card);
    }

    .container {
    width: var(--size-width-chest);
    height: var(--size-height-chest);
    background: var(--color-card);
    position: relative;
    }

    :host([rank="1"]) .container {
    font-size: var(--size-text);
    text-align: center;
    line-height: var(--size-height-chest);
    cursor: default;
    }

    :host(:is([rank="11"], [rank="12"], [rank="13"])) .container {
    background-position: 50% 50%;
    background-size: 150%;
    clip-path: var(--rectangle);
    }

    :host([rank="11"]) .container {background-image: url("img/jack.png");}
    :host([rank="12"]) .container {background-image: url("img/queen.png");}
    :host([rank="13"]) .container {background-image: url("img/king.png");}

    .symbol {
    width: calc(var(--size-height-chest) / 4);
    height: calc(var(--size-height-chest) / 4);
    font-size: calc(var(--size-text) / 3);
    text-align: center;
    line-height: calc(var(--size-height-chest) / 4);
    }

    :host([suit="heart"]) .symbol::after {content: "♥";}
    :host([suit="club"]) .symbol::after {content: "♣";}
    :host([suit="spade"]) .symbol::after {content: "♠";}
    :host([suit="diamond"]) .symbol::after {content: "♦";}

    :host(:is([rank="2"], [rank="3"])) .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & :last-child {
    transform: rotate(180deg);
    }
    }

    :host(:is([rank="4"], [rank="5"], [rank="6"],
    [rank="7"], [rank="8"], [rank="9"], [rank="10"])) .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    justify-items: center;
    }

    :host(:is([rank="4"], [rank="5"])) .container :nth-child(n+3) {
    transform: rotate(180deg);
    }

    :host(:is([rank="6"], [rank="7"], [rank="8"],
    [rank="9"], [rank="10"])) .container :nth-child(n+5) {
    transform: rotate(180deg);
    }


    `;
  }

  static symbol(suit) {
    const suitSymbol = {diamond: '♦', club: '♣', spade: '♠', heart: '♥'};
    const normalizeSuit = suit?.toLowerCase();
    return suitSymbol[normalizeSuit] ?? '♦';
  }

  static normalizeRank(value) {
    const num = Number(value);
    if (Number.isFinite(num) && num >= 1 && num <= 13) return Math.trunc(num);
    return 1;
  }

  static getRankDisplay(rank) {
    const display = {1: 'A', 11: 'J', 12: 'Q', 13: 'K'};
    return display[rank] || rank.toString();
  }

  populateContainer(container) {
    if (this.rank == 1) container.textContent = this.suit;
    if (this.rank >= 2 && this.rank <= 10) {
      for (let i = 0; i < this.rank; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'symbol';
        container.appendChild(symbol);
      }
    }
  }

  createContainer() {
    const container = document.createElement('div');
    container.className = 'container';
    this.populateContainer(container);
    return container;
  }

  connectedCallback() {
    this.suit = PlayingCard.symbol(this.getAttribute('suit'));
    this.rank = PlayingCard.normalizeRank(this.getAttribute('rank'));
    this.setAttribute('rank', this.rank);
    this.rankDisplay = PlayingCard.getRankDisplay(this.rank)
    this.style.setProperty('--rank-suit',`"${this.rankDisplay}${this.suit}"`);
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PlayingCard.styles}</style>`;
    const container = this.createContainer();
    this.shadowRoot.appendChild(container);
    console.log(this);
  }
}

customElements.define("playing-card", PlayingCard);
