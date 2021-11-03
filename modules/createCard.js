import { createHTML, removeSearchContent } from "./functionsHTML.js";
import { getAddressAndTitle, getPropertyDetails } from "./parseDataFunctions.js";
import { AMENITIES_DICT, searchStatus } from "../data.js";
import { getInitials } from "./helperFunctions.js";
import { addRemoveListener } from "./eventListeners.js";

const parent = document.querySelector('.properties');

const addImage = (container, property) => {
    const { medias } = property;
    const { url } = medias[0];
    createHTML({type: 'img', parent: container, classes: ['property-image'], src: url})
}

const createSizeElement = (data) => {
    return `${data.area[0]} m² ${data.bedrooms[0]} Quartos ${data.bathrooms[0]} Banheiros ${data.vacancies[0] || '--'} ${data.vacancies[0] === 1 ? 'Vaga' : 'Vagas'}`
}

const createAddressAndTitle = (container, property) => {
    const {address, title} = getAddressAndTitle(property)
    
    const addressElement = createHTML({type: 'div', parent: container, classes: ['address']})
    createHTML({type: 'h2', parent: addressElement, classes: ['address-text'], content: address})
    
    const titleElement = createHTML({type: 'div', parent: container, classes: ['title']})
    createHTML({type: 'h1', parent: titleElement, classes: ['title-text'], content: title})
}

const appendAmenities = (data, parent) => {
    data.amenities.forEach((item) => {
        const amenitie = createHTML({type: 'div', parent: parent, classes: ['amenitie']});
        createHTML({type: 'p', parent: amenitie, classes: ['amenitie-text'], content: AMENITIES_DICT[item]});
    })
}

const createPriceElement = (property, parent) => {
    const {listing: {pricingInfos}} = property;
    const container = createHTML({type: 'div', parent: parent, classes: ['price-container']});

    const propertyPrice = parseInt(pricingInfos[0].price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'});
    const priceContainer = createHTML({type: 'div', parent: container, classes: ['price-value']});
    createHTML({type: 'h2', parent: priceContainer, content: propertyPrice});
    
    if (pricingInfos[0].monthlyCondoFee) {
        const propertyCondo = parseInt(pricingInfos[0].monthlyCondoFee).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'});
        const condoContainer = createHTML({type: 'div', parent: container, classes: ['price-condo']});
        const condoText = createHTML({type: 'h2', parent: condoContainer, content: 'Condomínio: '});
        createHTML({type: 'span', parent: condoText, content: propertyCondo});
    }
};

const createContact = (parent) => {
    const contactContainer = createHTML({type: 'div', parent: parent, classes: ['contact-container']});
    createHTML({type: 'p', parent: createHTML({type: 'div', parent: contactContainer}), content: 'TELEFONE'});
    createHTML({type: 'p', parent: createHTML({type: 'div', parent: contactContainer}), content: 'ENVIAR MENSAGEM'});
}


const createPropertyDetails = (container, property) => {
    const data = getPropertyDetails(property);
    
    const sizeElement = createHTML({type: 'div', parent: container, classes: ['size']});
    createHTML({type: 'p', parent: sizeElement, classes: ['size-details'], content: createSizeElement(data)});

    const amenitiesElement = createHTML({type: 'div', parent: container, classes: ['amenities']});
    appendAmenities(data, amenitiesElement);

    const priceAndContactElement = createHTML({type: 'div', parent: container, classes: ['price']});
    createPriceElement(property, priceAndContactElement);
    createContact(priceAndContactElement);
}

const addTags = (city, state) => {
    const cityTag = document.querySelector('#city-tag')
    cityTag.innerText = `${city} - ${getInitials(state)}`
    addRemoveListener(cityTag);

    const tag = document.querySelector('#search-tag');
    const searchTag = createHTML({type: 'p', parent: tag, classes: ['search-tag-value'], content: `${city} - ${getInitials(state)}`});
    addRemoveListener(searchTag);
}

const createSearchResultHeader = async (data, listings) => {
    const {totalCount} = await data;
    const {link: {data: {city}}} = await listings[0];
    const {link: {data: {state}}} = await listings[0];
    document.querySelector('#count').innerText = `${totalCount}`;
    document.querySelector('#count-text').innerText = `Imóveis à venda em ${city} - ${getInitials(state)}`;
    addTags(city, state);
}

export const createCard = async (data) => {
    removeSearchContent();

    try {
        const {result:{listings}} = await data;
        createSearchResultHeader(data, listings);
    
        listings.forEach((property) => {
            const propertyBlock = createHTML({type: 'div', parent: parent, classes: ['property']})
            const imageBlock = createHTML({type: 'div', parent: propertyBlock, classes: ['property-images']});
            const descriptionBlock = createHTML({type: 'div', parent: propertyBlock, classes: ['property-description']});
            addImage(imageBlock, property);
            createAddressAndTitle(descriptionBlock, property);
            createPropertyDetails(descriptionBlock, property);
        });
    
        searchStatus.onScreen = true;
    } catch(error) {
        console.log(error);
        return;
    }
}