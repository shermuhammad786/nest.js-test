export const sendMessage = (status: boolean, message?: any, data?: any,) => {
    return {
        status: status,
        message: message,
        data: data
    }
};
