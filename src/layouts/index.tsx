import Footer from "@/components/footer";
import Header from "@/components/header";
import { Outlet } from "umi";
import "./index.less";

export default function Layout() {
  if (!location.pathname.startsWith("/admin/")) {
    return (
      <div className="baby-love">
        {/* 头部 */}
        <Header />
        {/* 页面内容 */}
        <div className="baby-love-body">
          <Outlet />
        </div>
        {/* 底部 */}
        <Footer />
      </div>
    );
  }

  return (
    <div className="baby-love-admin">
      {/* 头部 */}
      <Header />
      {/* 页面内容 */}
      <div className="baby-love-admin-body">
        <Outlet />
      </div>
      {/* 底部 */}
      <Footer />
    </div>
  );
}
