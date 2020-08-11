export const arrayToObject = (arr, idAttribute = 'id') => {
    return arr.reduce((acc, item) => ({
            ...acc, [item[idAttribute]]: item
        }),
        {}
    );
}

export const getArrayIds = (arr, idAttribute = 'id') => {
    return arr.map(v => v[idAttribute]);
};