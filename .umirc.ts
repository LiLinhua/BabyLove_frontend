import { defineConfig } from "umi";

export default defineConfig({
  publicPath: '/public/babylove/',
  routes: [
    // { path: "/", component: "index" },
    { path: "/view", component: "index" },
    // { path: "/", component: "custom/goods-list" },
    { path: "/view/goods/list", component: "custom/goods-list" },
    { path: "/view/goods/details", component: "custom/goods-details" },
    { path: "/view/shopping-cart", component: "custom/shopping-cart" },

    { path: "/view/login", component: "login" },
    { path: "/view/admin/login", component: "login" },

    { path: "/view/admin", component: "admin/goods-list" },
    { path: "/view/admin/goods/list", component: "admin/goods-list" },
    { path: "/view/admin/goods/details", component: "admin/goods-details" },
    { path: "/view/admin/shopping-cart", component: "admin/shopping-cart" },
    { path: "/view/admin/goods/edit", component: "admin/goods-edit" },

    { path: "/view/admin/order/list", component: "admin/order-list" },
    { path: "/view/admin/order/details", component: "admin/order-details" },
  ],
  proxy: {
    '/admin': {
      'target': 'http://localhost:7001/',
      'changeOrigin': true,
    },
    '/custom': {
      'target': 'http://localhost:7001/',
      'changeOrigin': true,
    },
    '/user': {
      'target': 'http://localhost:7001/',
      'changeOrigin': true,
    },
    '/public': {
      'target': 'http://localhost:7001/',
      'changeOrigin': true,
    },
  },
});
