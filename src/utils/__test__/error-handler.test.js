import { toast } from 'react-toastify';
import errorHandler from "../error-handler";

jest.mock('react-toastify');

describe('errorHandler', () => {
    test('should emit', () => {
        const message = 'Mensagem de erro';

        errorHandler(message);

        expect(toast).toHaveBeenCalledWith(message, {
            type: 'error',
            position: 'top-center',
        });
    });
});
