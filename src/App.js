import { Route, Switch } from "react-router-dom";
import Tasks from "./_containers/Tasks/Tasks";
import Layout from "./_hoc/Layout/Layout";
import Auth from "./_containers/Auth/Auth";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/tasks" component={Tasks} />
          <Route path={["/login", "/signup"]} component={Auth} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
