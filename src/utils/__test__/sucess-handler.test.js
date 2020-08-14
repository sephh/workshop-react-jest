import { toast } from 'react-toastify';
import successHandler from "../sucess-handler";

jest.mock('react-toastify');

describe('successHandler', () => {
	test('should emit', () => {
		const message = 'Mensagem de sucesso!';

		successHandler(message);

		expect(toast).toHaveBeenCalledWith(message, {
			type: 'success',
			position: 'top-center',
		});
	});
});