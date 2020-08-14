import scoredSearch from "../scored-search";

describe('scoredSearch', () => {
    test('should return original array', () => {
        const emptyArray = [];

        expect(scoredSearch(emptyArray, 'picles')).toBe(emptyArray);

        const oneItemArray = ['picles'];

        expect(scoredSearch(oneItemArray, '')).toBe(oneItemArray);
    });

    test('should return filtered array', () => {
        const arr = [{name: 'picles'}, {name: 'gincobiloba'}];

        expect(scoredSearch(arr, 'picles', 'name')).toEqual([{name: 'picles'}]);
    });
});