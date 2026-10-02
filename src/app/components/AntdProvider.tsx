import type { ReactNode } from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import { useTheme } from "../../utils/hooks";
import { ANTD_THEMES } from "../utils/constants";
import { getPopupContainer } from "../utils/helpers";

export function AntdProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <StyleProvider layer>
      <ConfigProvider
        locale={ruRU}
        theme={ANTD_THEMES[theme]}
        getPopupContainer={getPopupContainer}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
