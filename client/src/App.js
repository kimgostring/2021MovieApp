import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import MovieDetail from "./components/views/MovieDetail/MovieDetail";
import FavoritePage from "./components/views/FavoritePage.js/FavoritePage";
import NavBar from "./components/views/NavBar/NavBar";

function App() {
  return (
    <Router>
      <div>
        <NavBar />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}> {/* NavBar 부분이 보이려면 공백 설정해주어야 함 */}
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            {/* :movieId, 꼭 콜론 넣기, 뒤에 오는 값을 props.match.params.movieId로 얻을 수 있음 */}
            <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
            <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
