"use client";

import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, App, Drawer } from "antd";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const { Header, Sider, Content } = Layout;

const AppLayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const HandleClick = (key: string) => {
    router.push(key);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const menuItems = [
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
  ];

  const SidebarContent = () => (
    <>
      <Link href="/">
        <Image
          src="https://cdn.prod.website-files.com/66be4630db3d6b1bfd791b23/66be5673f24147259459348a_Logo.svg"
          width={70}
          height={70}
          className="w-auto h-auto"
          alt="logo"
          style={{
            margin: "10px",
            marginLeft: "10px",
            marginBottom: "50px",
          }}
        />
      </Link>

      <Menu
        style={{
          backgroundColor: "var(--color-myGrey)",
        }}
        className="font-semibold"
        mode="inline"
        defaultSelectedKeys={[pathname]}
        onClick={(e) => HandleClick(e.key)}
        items={menuItems}
      />
    </>
  );

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
          Button: {
            colorPrimary: "var(--color-myViolet)",
            colorPrimaryHover: "var(--color-myViolet)",
            colorPrimaryActive: "var(--color-myViolet)",
            colorBgContainer: "var(--color-myWhite)",
            colorText: "var(--color-myBlack)",
            colorBorder: "var(--color-myBlack)",
          },
          Spin: {
            colorPrimary: "var(--color-myViolet)",
            colorPrimaryHover: "var(--color-myViolet)",
            colorPrimaryActive: "var(--color-myViolet)",
            colorBgContainer: "var(--color-myWhite)",
            colorText: "var(--color-myBlack)",
          },
          Drawer: {
            colorBgElevated: "var(--color-myGrey)",
            colorText: "var(--color-myWhite)",
          },
        },
      }}
    >
      <App>
        <Layout className="h-screen w-screen">
          {/* Desktop Sidebar */}
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ backgroundColor: "var(--color-myGrey)" }}
            className="hidden md:block"
            width={250}
            collapsedWidth={80}
          >
            <SidebarContent />
          </Sider>

          {/* Mobile Drawer */}
          <Drawer
            title={
              <Link href="/">
                <Image
                  src="https://cdn.prod.website-files.com/66be4630db3d6b1bfd791b23/66be5673f24147259459348a_Logo.svg"
                  width={70}
                  height={70}
                  className="w-auto h-auto"
                  alt="logo"
                />
              </Link>
            }
            placement="left"
            onClose={() => setMobileOpen(false)}
            open={mobileOpen}
            width={250}
            styles={{
              body: { padding: 0, backgroundColor: "var(--color-myGrey)" },
              header: {
                backgroundColor: "var(--color-myGrey)",
                borderBottom: "1px solid var(--color-myBlack)",
              },
            }}
          >
            <div style={{ padding: "10px" }}>
              <Menu
                style={{
                  backgroundColor: "var(--color-myGrey)",
                }}
                className="font-semibold"
                mode="inline"
                defaultSelectedKeys={[pathname]}
                onClick={(e) => HandleClick(e.key)}
                items={menuItems}
              />
            </div>
          </Drawer>

          <Layout style={{ backgroundColor: "var(--color-myBlack)" }}>
            <Header
              style={{ padding: 0, backgroundColor: "var(--color-myGrey)" }}
            >
              <Button
                type="text"
                icon={
                  isMobile ? (
                    <MenuUnfoldOutlined />
                  ) : collapsed ? (
                    <MenuUnfoldOutlined />
                  ) : (
                    <MenuFoldOutlined />
                  )
                }
                onClick={() => {
                  if (isMobile) {
                    setMobileOpen(!mobileOpen);
                  } else {
                    setCollapsed(!collapsed);
                  }
                }}
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
                overflow: "auto",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </App>
    </ConfigProvider>
  );
};

export default AppLayoutProvider;
