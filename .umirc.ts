import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "custom/goods-list" },
    { path: "/goods/list", component: "custom/goods-list" },
    { path: "/goods/details", component: "custom/goods-details" },
    { path: "/shopping-cart", component: "custom/shopping-cart" },

    { path: "/admin", component: "admin/goods-list" },
    { path: "/admin/goods/list", component: "admin/goods-list" },
    { path: "/admin/goods/details", component: "admin/goods-details" },
    { path: "/admin/shopping-cart", component: "admin/shopping-cart" },
    { path: "/admin/goods/edit", component: "admin/goods-edit" },
  ],
});
