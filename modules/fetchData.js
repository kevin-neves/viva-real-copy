import { searchStatus } from "../data.js";
import { createError } from "./createError.js";


export const fetchData = async({ state, city }) => {
    const url = `https://private-9e061d-piweb.apiary-mock.com/venda?state=${state}&city=${city}`
    try {
        const response = await fetch(url);
        const {search} = await response.json();
        return search;
    } catch (error) {
        searchStatus.error = true;
        createError()
        return;
    }
}