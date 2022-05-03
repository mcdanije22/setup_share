import styles from "./sideNavbar.module.scss";
import Link from "next/link";
import { Menu } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const SideNavBar = ({ user }: any) => {
  const router = useRouter();
  return (
    <div
      id={styles.sideNavBarContainer}
      style={{
        height: "100%",
        backgroundColor: "#2F343B",
      }}
    >
      <div id={styles.logoSection}>
        <h1>ShareStation</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{
          backgroundColor: "#2F343B",
          height: "100vh",
        }}
      >
        <Menu.Item
          className={
            router.pathname === "/dashboard"
              ? "ant-menu-item-selected"
              : "ant-menu-item"
          }
          key="1"
          icon={<DashboardOutlined />}
        >
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default SideNavBar;
