import Layout from "./component/Layout";
import {Outlet, useLocation, useRoutes} from "react-router-dom";
import Login from "./page/Login/login.jsx";
import route from "./route/index.jsx";

function App() {
  const location = useLocation();
  const element = useRoutes(route);
  return (
    <>
      {location.pathname ==='/login' ? element : <Layout/>}
    </>
  )
}

export default App
