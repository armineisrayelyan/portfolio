import { App as AntdApp, ConfigProvider, theme as antdTheme } from 'antd';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from './components/ThemeProvider';
import { useThemeMode } from './hooks/useThemeMode';
import { MainLayout } from './layout/MainLayout';
import { About } from './pages/About';
import { AiChat } from './pages/AiChat';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';

function AntdProvider({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode();

  const config = useMemo(() => {
    const isDark = mode === 'dark';
    return {
      theme: {
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
          borderRadius: 10,
          colorPrimary: '#1677ff',
        },
      },
    } as const;
  }, [mode]);

  return (
    <ConfigProvider {...config}>
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AntdProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ai" element={<AiChat />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </AntdProvider>
    </ThemeProvider>
  );
}

