import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "goods-list" },
    { path: "/goods/list", component: "goods-list" },
    { path: "/goods/details", component: "goods-details" },
    { path: "/shopping-cart", component: "shopping-cart" },
  ],
});
