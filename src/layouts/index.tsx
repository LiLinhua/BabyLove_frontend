import { Outlet } from "umi";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./index.less";

export default function Layout() {
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
