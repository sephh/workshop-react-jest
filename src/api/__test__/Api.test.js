import axiosMock from 'axios';

import '../Api';

import getEnv from "../../environment";

const {API, API_VERSION} = getEnv();

jest.mock('axios');

describe('Api', () => {
    test('should create Api', () => {
        expect(axiosMock.create).toHaveBeenCalledWith(
            {
                baseURL: `${API}/${API_VERSION}`,
            }
        );
    });
});
