import Layout from "./component/Layout";
import {useLocation, useNavigate, useRoutes} from "react-router-dom";
import route from "./route/index.jsx";
import {routeMap} from "./route/route-map.jsx";
import {useSelector} from "react-redux";
import {useEffect} from "react";


function App() {
  const location = useLocation();
  const element = useRoutes(route);
  const navigate = useNavigate();
  const {remoteMenuMap, loadComplete} = useSelector(state => state.menu);
  useEffect(() => {
    if (loadComplete && !remoteMenuMap[location.pathname] && routeMap[location.pathname]?.verify) {
      navigate('/403', {replace: true})
    }
  }, [location.pathname, loadComplete])

  return (
    <>
      {!routeMap[location.pathname]?.layout ? element : <Layout/>}
    </>
  )
}

export default App
