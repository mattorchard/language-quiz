import { render, Fragment } from "preact";
import useHash from "./hooks/useHash";
import HomePage from "./components/HomePage";
import QuizPage from "./components/QuizPage";
import StatsPage from "./components/StatsPage";
import "./reset.css";
import "./global.css";
import Header from "./components/Header";

const App = () => {
  const hash = useHash();

  return (
    <Fragment>
      <Header />
      {(!hash || hash === "#home") && <HomePage />}
      {hash === "#quiz" && <QuizPage />}
      {hash === "#stats" && <StatsPage />}
    </Fragment>
  );
};

const AppWrapper = (
  <Fragment>
    <App />
  </Fragment>
);
render(AppWrapper, document.querySelector("#appRoot"));
