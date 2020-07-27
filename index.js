import Cursor from './cursor.js';

const cursor = new Cursor(document.querySelector(".cursor"));

document.querySelectorAll('.item').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.emit('enter'));
    el.addEventListener('mouseleave', () => cursor.emit('leave'));
});