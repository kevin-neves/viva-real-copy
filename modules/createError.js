import { searchStatus } from "../data.js"
import { createHTML } from "./functionsHTML.js"

export const createError = () => {
    if (!searchStatus.error) return

    const errorParent = document.querySelector('.properties')
    const errorContainer = createHTML({type: 'div', parent: errorParent, classes: ['error-container']})
    createHTML({type: 'h1', parent: errorContainer, classes: ['error-text'], content: 'OOOOPS!'})
    createHTML({type: 'h1', parent: errorContainer, classes: ['error-text'], content: 'ALGO DEU ERRADO NA SUA BUSCA.'})
    createHTML({type: 'h1', parent: errorContainer, classes: ['error-status'], content: 'status 500'})
    createHTML({type: 'h1', parent: errorContainer, classes: ['error-text'], content: 'POR FAVOR, TENTE NOVAMENTE.'})

    console.log(searchStatus.error);
    searchStatus.error = true;
}   