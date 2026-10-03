import { Provider } from "react-redux";
import { store } from "../api/store";
import { AppToaster } from "../components/toaster";
import { AntdProvider } from "./components/AntdProvider";
import { Shell } from "./components/Shell";

export function App() {
  return (
    <Provider store={store}>
      <AntdProvider>
        <Shell />
        <AppToaster />
      </AntdProvider>
    </Provider>
  );
}
