import { Redirect, Route, Switch } from "react-router-dom";
import Tasks from "./_containers/Tasks/Tasks";
import Layout from "./_hoc/Layout/Layout";
import Auth from "./_containers/Auth/Auth";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";

function App() {

  const {authCheckState} = useAuth();

  useEffect(() => {
    authCheckState();
  }, [authCheckState])
  
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path={["/login", "/signup"]} component={Auth} />
          <Route path="/tasks" component={Tasks} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
