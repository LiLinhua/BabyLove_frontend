import Footer from "@/components/footer";
import Header from "@/components/header";
import Login from "@/components/login";
import { Provider } from "mobx-react";
import { Outlet } from "umi";
import "./index.less";
import shores from "./stores";

export default function Layout() {
  const handleToPage = (url) => {
    if (location.pathname === url) {
      return;
    }
    location.href = url;
    // history.push(url);
  };

  // 客户侧
  if (!location.pathname.startsWith("/view/admin")) {
    const data = [
      {
        title: "商品",
        onClick: () => handleToPage("/view/goods/list"),
      },
      {
        title: "购物车",
        onClick: () => handleToPage("/view/shopping-cart"),
      },
    ];
    return (
      <Provider {...shores}>
        <div className="baby-love">
          {/* 头部 */}
          <Header />
          {/* 页面内容 */}
          <div className="baby-love-body">
            <Outlet />
          </div>
          {/* 底部 */}
          <Footer data={data} />
        </div>
      </Provider>
    );
  }

  // 管理后台
  // 登录校验
  const isLogined = sessionStorage.getItem("babyLoveToken");
  const data = [
    {
      title: "商品",
      onClick: () => handleToPage("/view/admin/goods/list"),
    },
    {
      title: "购物车",
      onClick: () => handleToPage("/view/admin/shopping-cart"),
    },
  ];

  return (
    <Provider {...shores}>
      <div className="baby-love-admin">
        {/* 头部 */}
        <Header />
        {/* 页面内容 */}
        {isLogined ? (
          <>
            <div className="baby-love-admin-body">
              <Outlet />
            </div>
            {/* 底部 */}
            <Footer data={data} />
          </>
        ) : (
          <Login />
        )}
      </div>
    </Provider>
  );
}
