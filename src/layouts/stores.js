import { makeObservable, observable, action } from 'mobx';
import { getShoppingCartCode } from '../common/utils';
import { customQueryShoppingCartGoodsCount } from '../common/apis';
import request from '../common/http';

class ShoppingCartStore {
    @observable goodsCount = 0;

    constructor() {
        makeObservable(this);
    }

    @action
    flushShoppingCartGoodsCount = async () => {
        const shoppingCartCode = await getShoppingCartCode();

        const { data } = await request.get(customQueryShoppingCartGoodsCount, {
            params: { shoppingCartCode },
        });

        !isNaN(data) && (this.goodsCount = data);
    }
}
export const ShoppingCart = new ShoppingCartStore();

export default {
    ShoppingCart
};