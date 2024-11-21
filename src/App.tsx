// import './App.css'
import Regsitration from "./components/Registration";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <Regsitration></Regsitration>
      </PrimeReactProvider>
    </Provider>
  );
}

export default App;
