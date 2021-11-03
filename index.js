import { addSearchListener, manageRender } from "./modules/eventListeners.js";

manageRender('São Paulo');

const search = document.querySelector('#location');
addSearchListener(search);
