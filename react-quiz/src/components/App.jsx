import { useReducer, useEffect } from "react";
import Header from "./Header";
import MainComponent from "./MainComponent";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
const initialState = {
  questions: [],
  status: "loading",
  error: "",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReady":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataError":
      return { ...state, error: action.payload, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "next":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("Unknown action");
  }
}
export default function App() {
  const [{ questions, status, error, index, answer, points }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
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
          {status === "active" && (
            <>
              <Progress
                index={index}
                numQuestions={numQuestions}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                answer={answer !== null}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <NextQuestion dispatch={dispatch} answer={answer} />
            </>
          )}
        </MainComponent>
      </div>
    </div>
  );
}
