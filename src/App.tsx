// import './App.css'
import Regsitration from "./components/Registration";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import { store } from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Success from "./pages/Success";
import 'remixicon/fonts/remixicon.css'

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Regsitration />,
      },
      { path: "success", element: <Success /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <RouterProvider router={Router} />
      </PrimeReactProvider>
    </Provider>
  );
}

export default App;
