import { toast } from 'react-toastify';

const successHandler = (message = 'Item atualizado com sucesso.') => {
	toast(message,{
		type: 'success',
		position: 'top-center',
	});
};

export default successHandler;
