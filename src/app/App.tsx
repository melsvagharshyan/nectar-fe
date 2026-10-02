import { Provider } from "react-redux";
import { store } from "../api/store";
import { AntdProvider } from "./components/AntdProvider";
import { Shell } from "./components/Shell";

export function App() {
  return (
    <Provider store={store}>
      <AntdProvider>
        <Shell />
      </AntdProvider>
    </Provider>
  );
}
