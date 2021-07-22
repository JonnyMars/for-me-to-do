import { Redirect, Route, Switch } from "react-router-dom";
import Tasks from "./_containers/Tasks/Tasks";
import Layout from "./_hoc/Layout/Layout";
import Auth from "./_containers/Auth/Auth";
import { AuthProvider } from "./_contexts/AuthContext";
import PrivateRoute from "./_components/PrivateRoute/PrivateRoute";
import LazyRoute from "./_components/LazyRoute/LazyRoute";
import { lazy } from "react";

function App() {

  const PrivacyPolicy = lazy(() => import("./_containers/PrivacyPolicy/PrivacyPolicy"))

  return (
    <AuthProvider>
      <div className="App">
        <Layout>
          <Switch>
            <PrivateRoute exact path="/tasks" component={Tasks} />
            <Route path={["/login", "/signup"]} component={Auth} />
            <LazyRoute component={PrivacyPolicy} path="/privacy-policy" />
            <Route render={() => <Redirect to="/tasks" />} />
          </Switch>
        </Layout>
      </div>
    </AuthProvider>
  );
}

export default App;
