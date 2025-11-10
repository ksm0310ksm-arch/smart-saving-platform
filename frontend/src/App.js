// App.js
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import SurveyForm from "./components/SurveyForm";
import RecommendResult from "./components/RecommendResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route
                path="/"
                element={
                  <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <h1>스마트 적금 플랫폼</h1>
                    <Link to="/survey">
                      <button style={{ padding: "10px 20px", marginTop: "20px" }}>
                        설문조사 하러가기
                      </button>
                    </Link>
                  </div>
                }
              />
        {/* ← npm start 하면 / 로 진입 → 설문 페이지 바로 뜸 */}
        /*<Route path="/" element={<SurveyForm />} />*/
        <Route path="/survey" element={<SurveyForm />} />

        {/* 추천 결과 페이지 */}
        <Route path="/recommend" element={<RecommendResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

