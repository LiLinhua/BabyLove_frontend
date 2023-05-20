import { history } from 'umi';
import request from './http';
import { Toast } from 'antd-mobile';

export const addShoppingCartCode = async () => {
    const { data } = await request.post(adminAddShoppingCart);

    return data ? data.shoppingCartCode : null;
}

export const getShoppingCartCode = async () => {
    let shoppingCartCode = localStorage.getItem('babyloveShoppingCartCode');
    if (!shoppingCartCode) {
        shoppingCartCode = await addShoppingCartCode();
    }
    if (!shoppingCartCode) {
        return Toast.show({
            icon: 'fail',
            content: '添加失败，请稍后再试',
        });
    }
    localStorage.setItem('babyloveShoppingCartCode', shoppingCartCode);
    return shoppingCartCode;
}

export const setShoppingCartCode = (shoppingCartCode) => {
    if (!shoppingCartCode) {
        return;
    }

    localStorage.setItem('babyloveShoppingCartCode', shoppingCartCode);
}

export const goTo = (url) => {
    if (!url) {
        return;
    }

    if (location.pathname.startsWith('/view/admin/')) {
        url = `/view/admin${url}`;
    } else {
        url = `/view${url}`;
    }

    history.push(url);
}
