import { useReducer, useEffect } from "react";
import Header from "./Header";
import MainComponent from "./MainComponent";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
const initialState = { questions: [], status: "loading", error: "" };
function reducer(state, action) {
  switch (action.type) {
    case "dataReady":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataError":
      return { ...state, error: action.payload, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      throw new Error("Unknown action");
  }
}
export default function App() {
  const [{ questions, status, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReady", payload: data }))
      .catch((err) => dispatch({ type: "dataError", payload: err.message }));
  }, []);
  return (
    <div className="App">
      <div className="app">
        <Header />
        <MainComponent>
          {status === "loading" && <Loader />}
          {status === "error" && <Error error={error} />}
          {status === "ready" && (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          )}
          {status === "active" && <Question />}
        </MainComponent>
      </div>
    </div>
  );
}
