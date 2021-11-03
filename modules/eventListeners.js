import { createCard } from "./createCard.js";
import { fetchData } from "./fetchData.js";
import { ACCEPTABLE_ENTRIES_DICT, searchStatus, STATES_DICT } from "../data.js";
import { parseSearchString } from "./parseDataFunctions.js";
import { removeError, removeSearchContent } from "./functionsHTML.js";

export const manageRender = (str) => {
    if (searchStatus.error) removeError();

    if (!str) return;

    let city = parseSearchString(str);
    if (city in ACCEPTABLE_ENTRIES_DICT) city = ACCEPTABLE_ENTRIES_DICT[city];

    const data = fetchData({state: STATES_DICT[city], city});
    createCard(data);
};

export const addSearchListener = (search) => {
    search.addEventListener('blur', () => manageRender(search.value));
};

export const addRemoveListener = (tag) => {
    tag.addEventListener('click', removeSearchContent);
};