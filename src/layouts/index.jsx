import { isAdmin, isLoginPage, isLogined, toLogin } from "@/common/utils";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Provider } from "mobx-react";
import { Outlet } from "umi";
import "./index.less";
import shores from "./stores";

export default function Layout() {
  const isLogin = isLoginPage || !isAdmin || (isAdmin && isLogined);
  if (!isLogin) {
    return toLogin();
  }
  return (
    <Provider {...shores}>
      <div className={isAdmin ? "baby-love-admin" : "baby-love"}>
        {/* 头部 */}
        <Header />
        {/* 页面内容 */}
        <div className={isAdmin ? "baby-love-admin-body" : "baby-love-body"}>
          <Outlet />
        </div>
        {/* 底部 */}
        {isLoginPage ? null : <Footer />}
      </div>
    </Provider>
  );
}
