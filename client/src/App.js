import "./App.scss";
import ForgetPassword from "./component/ForgetPassword/ForgetPassword";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import AuthPage from "./constants/Auth/AuthPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./constants/Home/HomePage";

function App() {
   return (
      <div className="App">
         <Router>
            <Switch>
               <Route exact path="/" component={HomePage} />
               <Route
                  path={["/home", "/books", "/staffs", "/readers", "/profile"]}
                  component={HomePage}
               />
               <Route path={["/login", "/register", "/forgetpassword"]}>
                  <AuthPage>
                     <Route path="/login" component={Login} />
                     <Route path="/register" component={Register} />
                     <Route path="/forgetpassword" component={ForgetPassword} />
                  </AuthPage>
               </Route>
            </Switch>
         </Router>
      </div>
   );
}

export default App;
