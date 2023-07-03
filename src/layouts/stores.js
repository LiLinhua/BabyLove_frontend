import { makeObservable, observable, action } from 'mobx';
import { getShoppingCartCode, isAdmin } from '../common/utils';
import { customQueryShoppingCartGoodsCount, adminQueryShoppingCartGoodsCount } from '../common/apis';
import request from '../common/http';

class ShoppingCartStore {
    @observable goodsCount = 0;

    constructor() {
        makeObservable(this);
    }

    @action
    flushShoppingCartGoodsCount = async () => {
        const shoppingCartCode = await getShoppingCartCode();

        const { data } = await request.get(isAdmin ? adminQueryShoppingCartGoodsCount : customQueryShoppingCartGoodsCount, {
            params: { shoppingCartCode },
        });

        !isNaN(data) && (this.goodsCount = data);
    }
}
export const ShoppingCart = new ShoppingCartStore();

export default {
    ShoppingCart
};