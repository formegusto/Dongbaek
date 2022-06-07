import { Provider } from "mobx-react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import RootStore from "./store";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import Preview from "./components/Preview";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const store = new RootStore();
const token = localStorage.getItem("token");
if (token) {
  store.auth.initCheck(token);
}

root.render(
  <Provider {...store}>
    <Router>
      <GlobalStyles />
      <App />
      <Preview />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
