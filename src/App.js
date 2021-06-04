import { Route, Switch } from "react-router-dom";
import Tasks from "./_containers/Tasks/Tasks";
import Layout from "./_hoc/Layout/Layout";
import Login from "./_containers/Login/Login";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/tasks" component={Tasks} />
          <Route path="/login" component={Login} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
