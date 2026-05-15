(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();class i extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
    :host {
    --card-field-clip-path: polygon(15% 0, 15% 100%, 85% 100%, 85% 0);

    display: inline-grid;
    width: var(--card-width);
    height: var(--card-height);
    background: var(--card-bg);
    border-radius: 5%;
    color: var(--card-color-red);
    margin: 1rem;
    border: 1px solid var(--card-border-color);
    user-select: none;
    align-items: center;

    &::before, &::after {
    content: var(--rank-suit);
    display: block;
    font-size: var(--card-rank-font-size);
    padding: 0 0.25rem;
    }

    &::after {
    justify-self: end;
    align-content: end;
    transform: rotate(180deg);
    }
    }

    :host([suit="club"]), :host([suit="spade"]) {
    color: var(--card-color-black);
    }

    .container {
    width: var(--card-field-width);
    height: var(--card-field-height);
    background: var(--card-bg);
    position: relative;
    }

    :host([rank="1"]) .container {
    font-size: var(--card-font-size);
    text-align: center;
    line-height: var(--card-field-height);
    cursor: default;
    }

    :host(:is([rank="11"], [rank="12"], [rank="13"])) .container {
    background-position: 50% 50%;
    background-size: 150%;
    clip-path: var(--card-field-clip-path);
    }

    :host([rank="11"]) .container {background-image: url("img/jack.png");}
    :host([rank="12"]) .container {background-image: url("img/queen.png");}
    :host([rank="13"]) .container {background-image: url("img/king.png");}

    .symbol {
    width: calc(var(--card-field-height) / 4);
    height: calc(var(--card-field-height) / 4);
    font-size: calc(var(--card-font-size) / 3);
    text-align: center;
    line-height: calc(var(--card-field-height) / 4);
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
    transform: scale(1, -1);
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
    transform: scale(1, -1);
    }

    :host(:is([rank="6"], [rank="7"], [rank="8"],
    [rank="9"], [rank="10"])) .container :nth-child(n+5) {
    transform: scale(1, -1);
    }

    :host(:is([rank="4"], [rank="5"])) :is(.symbol:nth-child(3),
    .symbol:nth-child(4)),
    :host(:is([rank="6"], [rank="7"], [rank="8"])) :is(.symbol:nth-child(5),
    .symbol:nth-child(6)) {
    align-self: end;
    }

    :host(:is([rank="6"], [rank="7"], [rank="8"])) :is(.symbol:nth-child(3),
    .symbol:nth-child(4)) {
    align-self: center;
    }

    :host(:is([rank="5"], [rank="7"], [rank="8"], [rank="9"], [rank="10"]))
    .symbol:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    }

    :host([rank="9"]) .symbol:last-child {
    transform: translate(-50%,-50%) scale(1, -1);
    }

    :host(:is([rank="7"], [rank="8"])) .symbol:last-child {top: 32%;}

    :host([rank="8"]) .symbol:nth-child(7) {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%,-50%) scale(1, -1);
    }

    :host([rank="10"]) .symbol:nth-child(9) {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%,-50%) scale(1, -1);
    }

    :host([rank="10"]) .symbol:last-child {top: 25%;}

    :host([flipped]) {
    background:
    repeating-linear-gradient(45deg, var(--card-color-red),
    var(--card-color-black) 10%);

    & .container {
    visibility: hidden;
    }

    &::before, &::after {
    visibility: hidden;
    }
    }

    `}static symbol(t){const r={diamond:"♦",club:"♣",spade:"♠",heart:"♥"},a=t==null?void 0:t.toLowerCase();return r[a]??"♦"}static normalizeRank(t){const r=Number(t);return Number.isFinite(r)&&r>=1&&r<=13?Math.trunc(r):1}static getRankDisplay(t){return{1:"A",11:"J",12:"Q",13:"K"}[t]||t.toString()}static get observedAttributes(){return["rank"]}populateContainer(t){if(this.rank==1&&(t.textContent=this.suit),this.rank>=2&&this.rank<=10)for(let r=0;r<this.rank;r++){const a=document.createElement("div");a.className="symbol",t.appendChild(a)}}createContainer(){const t=document.createElement("div");return t.className="container",this.populateContainer(t),t}setSuit(){const t=this.getAttribute("suit")||"diamond";this.setAttribute("suit",t),this.suit=i.symbol(t)}setRank(){const t=this.getAttribute("rank");this.rank=i.normalizeRank(t),this.setAttribute("rank",this.rank),this.rankDisplay=i.getRankDisplay(this.rank),this.style.setProperty("--rank-suit",`"${this.rankDisplay}${this.suit}"`)}connectedCallback(){this.setSuit(),this.setRank(),this.render()}attributeChangedCallback(t,r,a){r!==a&&(this.setRank(),this.render())}render(){this.shadowRoot.innerHTML=`
    <style>${i.styles}</style>`;const t=this.createContainer();this.shadowRoot.appendChild(t)}}customElements.define("playing-card",i);
