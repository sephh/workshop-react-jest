import { toast } from 'react-toastify';

export default function errorHandler(message) {
    toast(message,{
        type: 'error',
        position: 'top-center',
    });

    return message;
}