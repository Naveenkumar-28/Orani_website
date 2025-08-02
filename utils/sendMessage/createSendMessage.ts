import { AddNotifyMessage } from '@/app/redux/slices/NotifyMessageSlice';
import { useDispatch } from 'react-redux';

export const createSendMessage = () => {
    const dispatch = useDispatch()
    return {
        error: (msg: string) => {
            dispatch(AddNotifyMessage({ message: msg, type: 'error' }));
        },
        success: (msg: string) => {
            dispatch(AddNotifyMessage({ message: msg, type: 'success' }));
        },
        info: (msg: string) => {
            dispatch(AddNotifyMessage({ message: msg, type: 'info' }));
        },
        warning: (msg: string) => {
            dispatch(AddNotifyMessage({ message: msg, type: 'warning' }));
        },
    }
}
