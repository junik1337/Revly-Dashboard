"use client";

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const { Header, Sider, Content } = Layout;

const AppLayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const HandleClick = (key: string) => {
    router.push(key);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemBg: "var(--color-myGrey)",
            itemHoverBg: "var(--color-myViolet)",
            itemSelectedBg: "var(--color-myViolet)",
            itemSelectedColor: "var(--color-myWhite)",
            iconSize: 16,
            itemColor: "var(--color-myWhite)",
            itemPaddingInline: 20,
          },
          Table: {
            headerBg: "var(--color-myGrey)",
            headerColor: "var(--color-myWhite)",
            colorBgContainer: "var(--color-myGrey)",
            colorText: "var(--color-myWhite)",
            borderColor: "var(--color-myBlack)",
            colorBorderSecondary: "var(--color-myBlack)",
            rowHoverBg: "var(--color-myBlack)",
          },
          Switch: {
            colorBgBase: "var(--color-myGrey)",
            colorPrimary: "var(--color-myViolet)",
            colorPrimaryHover: "var(--color-myViolet)",
          },
          Pagination: {
            colorPrimary: "var(--color-myViolet)",
            colorPrimaryHover: "var(--color-myViolet)",
            colorBgContainer: "var(--color-myWhite)",
            colorText: "var(--color-myWhite)",
            colorBorder: "var(--color-myBlack)",
          },
        },
      }}
    >
      <Layout className="h-screen w-screen">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: "var(--color-myGrey)" }}
        >
          <Image
            src="https://cdn.prod.website-files.com/66be4630db3d6b1bfd791b23/66be5673f24147259459348a_Logo.svg"
            width={70}
            height={70}
            alt="logo"
            style={{ margin: "10px", marginLeft: "10px", marginBottom: "50px" }}
          />

          <Menu
            style={{
              backgroundColor: "var(--color-myGrey)",
            }}
            className="font-semibold"
            mode="inline"
            defaultSelectedKeys={[pathname]}
            onClick={(e) => HandleClick(e.key)}
            items={[
              {
                key: "/vendors",
                icon: <ShopOutlined />,
                label: "Vendors",
              },
              {
                key: "/users",
                icon: <UserOutlined />,
                label: "Users",
              },
            ]}
          />
        </Sider>
        <Layout style={{ backgroundColor: "var(--color-myBlack)" }}>
          <Header
            style={{ padding: 0, backgroundColor: "var(--color-myGrey)" }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: "var(--color-myWhite)",
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "100%",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayoutProvider;
