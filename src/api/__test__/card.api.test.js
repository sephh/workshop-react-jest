import axiosMock from '../../__mocks__/axios-mock';
import {getCards} from "../card.api";

describe('Card Api', () => {
    beforeEach(() => {
        axiosMock.get.mockResolvedValue({
            data: {
                cards: []
            }
        });
    });

    test('should call getCards', () => {
        getCards();

        expect(axiosMock.get).toHaveBeenCalledWith('/cards?page=1&name=&pageSize=27');

        getCards(2, 'picles', 32);

        expect(axiosMock.get).toHaveBeenCalledWith(`/cards?page=2&name=picles&pageSize=32`);
    });
});