import { searchStatus } from "../data.js";

export const createHTML = ({ type, parent, classes=[], id, content, src }) => {
    const newElement = document.createElement(type);
    
    if (classes) classes.map((classes) => newElement.classList.add(classes))
    if (id) newElement.setAttribute('id', id);
    if (content) newElement.innerText = content;
    if (src) newElement.setAttribute('src', src);

    if (parent) parent.append(newElement);
    return newElement
}

export const removeSearchContent = () => {
    if (!searchStatus.onScreen) return;

    const searchTag = document.querySelector('.search-tag-value');
    searchTag.remove();

    document.querySelector('#city-tag').innerText = '';
    document.querySelector('#count').innerText = '';
    document.querySelector('#count-text').innerText = '';

    document.querySelectorAll('.property').forEach((node) => node.remove());

    searchStatus.onScreen = false;
};

export const removeError = () => {
    if (!searchStatus.error) return;
    document.querySelector('.error-container').remove();
    searchStatus.error = false;
};