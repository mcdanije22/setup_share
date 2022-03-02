import styles from "./sideNavbar.module.scss";
import Link from "next/link";
import { Menu } from "antd";
import {
  DashboardOutlined,
  FileOutlined,
  HeartOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

const SideNavBar: React.FC = ({ user }: any) => {
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
        <h1>Plan Code</h1>
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
          <Link href={`/dashboard/${user?.user.user_id}`}>
            <a>Dashboard</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FileOutlined />}>
          <Link href="/overview">
            <a>Overview</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="3" icon={<HeartOutlined />}>
          <Link href="/inspiration">
            <a>Inspiration</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="4" icon={<CodeOutlined />}>
          <Link href="/codesnippets">
            <a>Code Snippets</a>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default SideNavBar;
