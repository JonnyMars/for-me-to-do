import { Redirect, Route, Switch } from "react-router-dom";
import Tasks from "./_containers/Tasks/Tasks";
import Layout from "./_hoc/Layout/Layout";
import Auth from "./_containers/Auth/Auth";
import { AuthProvider } from "./_contexts/AuthContext";
import PrivateRoute from "./_components/PrivateRoute/PrivateRoute";

function App() {
  
  return (
    <AuthProvider>
      <div className="App">
        <Layout>
          <Switch>
            <PrivateRoute exact path="/tasks" component={Tasks} />
            <Route path={["/login", "/signup"]} component={Auth} />
            {/* <Route path="/tasks" component={Tasks} /> */}
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Layout>
      </div>
    </AuthProvider>
  );
}

export default App;
