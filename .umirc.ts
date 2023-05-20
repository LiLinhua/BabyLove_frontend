import { defineConfig } from "umi";

export default defineConfig({
  publicPath: '/public/babylove/',
  routes: [
    { path: "/", component: "custom/goods-list" },
    { path: "/view/goods/list", component: "custom/goods-list" },
    { path: "/view/goods/details", component: "custom/goods-details" },
    { path: "/view/shopping-cart", component: "custom/shopping-cart" },

    { path: "/view/admin", component: "admin/goods-list" },
    { path: "/view/admin/goods/list", component: "admin/goods-list" },
    { path: "/view/admin/goods/details", component: "admin/goods-details" },
    { path: "/view/admin/shopping-cart", component: "admin/shopping-cart" },
    { path: "/view/admin/goods/edit", component: "admin/goods-edit" },
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
