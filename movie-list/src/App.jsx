import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import TabPanel from "./components/Header/TabPanel";

export default function App() {
  return (
    <Provider store={store}>
      <>
      <TabPanel/>
      </>
    </Provider>
  );
}


