export const objectToStringHomeAddress = (addressObject) => {

    const toTitleCase = (phrase) => {
        return phrase
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const { streetNumber, streetName, city, state } = addressObject;
    const fullAddress = `${streetNumber} ${streetName} ${city} ${state}`
    return toTitleCase(fullAddress);


}

export const objectToArray = (object) => {
    if (object) {
        return Object.entries(object).map(e => Object.assign({}, e[1], {id: e[0]}))
    }
}

//capitalize only the first letter of the string. 
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}