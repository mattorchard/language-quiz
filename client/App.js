import {render, Fragment} from "preact";
import useHash from "./hooks/useHash";
import HomePage from "./components/HomePage";
import QuizPage from "./components/QuizPage";
import StatsPage from "./components/StatsPage";


const App = () => {
  const hash = useHash();

  return <Fragment>
    <header>
      <h1>Word Variations</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#quiz">Quiz</a>
        <a href="#stats">Stats</a>
      </nav>
    </header>
    {(!hash || hash === "#home") && <HomePage/>}
    {hash === "#quiz" && <QuizPage/>}
    {hash === "#stats" && <StatsPage/>}
  </Fragment>;
};

const AppWrapper = <Fragment><App/></Fragment>
render(AppWrapper, document.querySelector("#appRoot"));