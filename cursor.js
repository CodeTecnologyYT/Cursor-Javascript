import EventEmitter from './event.js';
let move = { positionX: 0, positionY: 0 };
document.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    move = { positionX: posX, positionY: posY };
})
const learp = (start, end, interpolation) => (end - start) * interpolation + start;

export default class Cursor extends EventEmitter {
    constructor(el) {
        super();
        this.DOM = { el: el };
        this.DOM.circle = this.DOM.el.querySelector('.cursor__inner');
        this.bounds = this.DOM.el.getBoundingClientRect();
        this.renderStyle = {
            tx: { previous: 0, current: 0, interpolation: 0.2 },
            ty: { previous: 0, current: 0, interpolation: 0.2 },
            radius: { previous: 60, current: 60, interpolation: 0.2 }
        };
        this.listen();
        this.mouseMove = () => {
            this.renderStyle.tx.previous = this.renderStyle.tx.current = move.positionX - this.bounds.width / 2;
            this.renderStyle.ty.previous = this.renderStyle.ty.current = move.positionY - this.bounds.height / 2;
            requestAnimationFrame(() => this.render());
        };
        document.addEventListener('mousemove', () => this.mouseMove());
    }
    render() {
        this.renderStyle.tx.current = move.positionX - this.bounds.width / 2;
        this.renderStyle.ty.current = move.positionY - this.bounds.height / 2;
        this.renderStyle.tx.previous = learp(this.renderStyle.tx.previous, this.renderStyle.tx.current, this.renderStyle.tx.interpolation);
        this.renderStyle.ty.previous = learp(this.renderStyle.ty.previous, this.renderStyle.ty.current, this.renderStyle.ty.interpolation);
        this.DOM.el.style.transform = `translateX(${this.renderStyle.tx.previous}px) translateY(${this.renderStyle.ty.previous}px)`;
        requestAnimationFrame(() => this.render());
    }
    renderRadius() {
        this.renderStyle.radius.previous = learp(this.renderStyle.radius.previous, this.renderStyle.radius.current, this.renderStyle.radius.interpolation);
        this.DOM.circle.setAttribute('r', this.renderStyle.radius.previous);
        requestAnimationFrame(() => this.renderRadius());
    }
    enter() {
        this.renderStyle.radius.current = 40;
        requestAnimationFrame(() => this.renderRadius());
    }
    leave() {
        this.renderStyle.radius.current = 60;
        requestAnimationFrame(() => this.renderRadius());
    }
    listen() {
        this.on('enter', () => this.enter());
        this.on('leave', () => this.leave());
    }
}