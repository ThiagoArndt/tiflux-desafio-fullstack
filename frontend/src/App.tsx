import { ConfigProvider } from "antd";
import MainView from "./views/MainView";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            contentPadding: "0px 0px",
            margin: 0,
          },
        },
      }}
    >
      <MainView />
    </ConfigProvider>
  );
}

export default App;
