import { getInitials } from "./helperFunctions.js";

export const getAddressAndTitle = (property) => {
    const { link } =  property;
    const { name } = link;
    const {data: { street, streetNumber, neighborhood, city, state }} = link;
    const address = `${street}, ${streetNumber} - ${neighborhood}, ${city} - ${getInitials(state)}`;
    return {address, title: name};
}

export const getPropertyDetails = (property) => {
    const {listing: {bathrooms}} = property;
    const {listing: {amenities}} = property;
    const {listing: {bedrooms}} = property;
    const {listing: {parkingSpaces}} = property;
    const {listing: {usableAreas}} = property;

    return {amenities, area: usableAreas, bedrooms, bathrooms, vacancies: parkingSpaces}
}

export const parseSearchString = (str) => {
    let newStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // REMOVE ACCENTS
    newStr = newStr.replace(/\s+/g, '-').toLowerCase(); // UPPERCASE TO LOWERCASE AND SPACE TO DASH
    return newStr;
}