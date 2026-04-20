import './style.css';

import { GlobalOutlined, MailOutlined, MenuOutlined, CodeOutlined } from '@ant-design/icons';
import { Button as AntdButton, Drawer, Grid, Layout, Menu, Space, Typography } from 'antd';
import { PropsWithChildren, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ThemeToggle } from '../../components/ThemeToggle';
import { BRAND_NAME, FOOTER_LINKS, FOOTER_ROLE, MAIN_LAYOUT_CONSTS, NAV_CTA, NAV_ITEMS } from './consts';

const { Header, Content, Footer } = Layout;

function getSelectedKey(pathname: string): string | undefined {
  if (pathname === '/') return 'home';
  const item = NAV_ITEMS.find((i) => i.path === pathname);
  return item?.key;
}

export function MainLayout({ children }: PropsWithChildren) {
  const screens = Grid.useBreakpoint();
  const isDesktop = Boolean(screens.lg);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = getSelectedKey(location.pathname);

  const menuItems = useMemo(
    () =>
      NAV_ITEMS.map((i) => ({
        key: i.key,
        label: i.label,
      })),
    [],
  );

  const onNavClick = (key: string) => {
    const item = NAV_ITEMS.find((i) => i.key === key);
    if (!item) return;
    navigate(item.path);
    setDrawerOpen(false);
  };

  return (
    <Layout className="MainLayout">
      <Header className="MainLayoutHeader">
        <span className="MainLayoutHeaderBorder" aria-hidden="true" />

        <Space size={12} align="center" className="MainLayoutHeaderLeft">
          {!isDesktop && (
            <AntdButton
              type="text"
              icon={<MenuOutlined />}
              aria-label={MAIN_LAYOUT_CONSTS.drawer.openAriaLabel}
              onClick={() => setDrawerOpen(true)}
            />
          )}
          <Typography.Text strong className="MainLayoutBrand">
            {BRAND_NAME}
          </Typography.Text>
        </Space>

        {isDesktop ? (
          <Space size={0} align="center" className="MainLayoutMenu">
            <Menu
              mode="horizontal"
              disabledOverflow
              selectedKeys={selectedKey ? [selectedKey] : []}
              items={menuItems}
              onClick={(e) => onNavClick(String(e.key))}
              className="MainLayoutMenuInner"
            />
            <AntdButton
              className="MainLayoutCtaBtn"
              onClick={() => navigate(NAV_CTA.path)}
            >
              {NAV_CTA.label}
            </AntdButton>
            <span className="MainLayoutDivider" aria-hidden="true" />
            <ThemeToggle />
          </Space>
        ) : (
          <Space size={8}>
            <AntdButton
              className="MainLayoutCtaBtn"
              onClick={() => navigate(NAV_CTA.path)}
            >
              {NAV_CTA.label}
            </AntdButton>
            <ThemeToggle />
          </Space>
        )}
      </Header>

      <Drawer
        title={MAIN_LAYOUT_CONSTS.drawer.title}
        placement="left"
        width={MAIN_LAYOUT_CONSTS.drawer.width}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : []}
          items={menuItems}
          onClick={(e) => onNavClick(String(e.key))}
        />
      </Drawer>

      <Content className="MainLayoutContent">
        <div className="MainLayoutContainer">{children}</div>
      </Content>

      <Footer className="MainLayoutFooter">
        <div className="MainLayoutFooterInner">
          <Typography.Text className="MainLayoutFooterText">
            © {new Date().getFullYear()} {BRAND_NAME} · {FOOTER_ROLE}
          </Typography.Text>
          <div className="MainLayoutFooterIcons">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.ariaLabel}
                className="MainLayoutFooterIconBtn"
              >
                {link.key === 'website' && <GlobalOutlined />}
                {link.key === 'terminal' && <CodeOutlined />}
                {link.key === 'email' && <MailOutlined />}
              </a>
            ))}
          </div>
        </div>
      </Footer>
    </Layout>
  );
}

