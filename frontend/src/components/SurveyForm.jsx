/*import React, { useState } from "react";
import axios from "axios";
import "./SurveyForm.css";
import { useNavigate } from "react-router-dom";

function SurveyForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: 3,
    job: "",
    age: "",
    income: "",  // ← annualIncome 이 아니라 Income 으로 통일
    savingGoal: "",
    savingPeriod: "",
    riskPreference: "",
    financialKnowledge: "",
    preferredBank: "",
  });

  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recommended, setRecommended] = useState([]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");


    try {
      const res = await axios.post(
        "http://localhost:8080/api/survey/submit",
        form,
        { withCredentials: true }
      );

      setMessage("✅ " + res.data);

      // 로그인 시 저장돼있음 (로그인 기능 붙으면 주석 해제)const userId = localStorage.getItem("userId");
      const resultRes = await axios.get(
        `http://localhost:8080/api/survey/user/${form.userId}`,
        { withCredentials: true }
      );

      setResult(resultRes.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="survey-container">
      <div className="survey-card">
        <h2 className="survey-title">📋 스마트 적금 설문조사</h2>
        <p className="survey-subtext">
          당신의 성향에 맞는 맞춤형 적금 상품을 추천받아보세요!
        </p>

        <form className="survey-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>직업</label>
            <input
              type="text"
              name="job"
              value={form.job}
              onChange={handleChange}
              placeholder="예: 사무직"
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>나이</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="예: 29"
              />
            </div>
            <div className="form-group half">
              <label>연소득 (만원)</label>
              <input
                type="number"
                name="income"
                value={form.income}
                onChange={handleChange}
                placeholder="예: 4500"
              />
            </div>
          </div>

          <div className="form-group">
            <label>적금 목적</label>
            <input
              type="text"
              name="savingGoal"
              value={form.savingGoal}
              onChange={handleChange}
              placeholder="예: 결혼, 여행, 자동차 구입 등"
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>목표 기간 (개월)</label>
              <input
                type="number"
                name="savingPeriod"
                value={form.savingPeriod}
                onChange={handleChange}
                placeholder="예: 12"
              />
            </div>
            <div className="form-group half">
              <label>위험 성향</label>
              <select
                name="riskPreference"
                value={form.riskPreference}
                onChange={handleChange}
              >
                <option value="">선택</option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>금융지식 수준 (1~5)</label>
              <input
                type="number"
                name="financialKnowledge"
                min="1"
                max="5"
                value={form.financialKnowledge}
                onChange={handleChange}
              />
            </div>
            <div className="form-group half">
              <label>선호 은행</label>
              <input
                type="text"
                name="preferredBank"
                value={form.preferredBank}
                onChange={handleChange}
                placeholder="예: 국민은행"
              />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "처리 중..." : "설문 제출"}
          </button>
        </form>

        {message && <p className="survey-message">{message}</p>}

        {result && (
          <div className="survey-result fade-in">
            <h3>📊 나의 설문 결과</h3>
            <ul>
              <li><strong>직업:</strong> {result.job}</li>
              <li><strong>나이:</strong> {result.age}</li>
              <li><strong>연소득:</strong> {result.income} 만원</li>
              <li><strong>적금 목적:</strong> {result.savingGoal}</li>
              <li><strong>목표 기간:</strong> {result.savingPeriod} 개월</li>
              <li><strong>위험 성향:</strong> {result.riskPreference}</li>
              <li><strong>금융지식:</strong> {result.financialKnowledge}</li>
              <li><strong>선호 은행:</strong> {result.preferredBank}</li>
            </ul>
          </div>
        )}

        <div className="btn-area">
          <button onClick={handleGoHome} className="btn-home">
            🏠 메인 페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default SurveyForm;*/

import React, { useState } from "react";
import axios from "axios";
import "./SurveyForm.css";
import { useNavigate } from "react-router-dom";

function SurveyForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: 3,
    job: "",
    age: "",
    income: "",
    savingGoal: "",
    savingPeriod: "",
    riskPreference: "",
    financialKnowledge: "",
    preferredBank: "",
  });

  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [recommended, setRecommended] = useState([]);   // ← TOP3 리스트 저장

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 1) 설문 저장
      const res = await axios.post(
        "http://localhost:8080/api/survey/submit",
        form,
        { withCredentials: true }
      );
      setMessage("✅ 설문이 저장되었습니다!");

      localStorage.setItem("userId", form.userId);
      console.log("✅ userId saved:", form.userId);

      // 2) 저장된 설문 데이터 조회
      const resultRes = await axios.get(
        `http://localhost:8080/api/survey/user/${form.userId}`,
        { withCredentials: true }
      );
      setResult(resultRes.data);

    } catch (err) {
      console.error(err);
      setMessage("❌ 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGetRecommendation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/survey/recommend/top3/${form.userId}`,
        { withCredentials: true }
      );

      navigate("/recommend", { state: { recommended: res.data } });

    } catch (err) {
      console.error(err);
      alert("추천 조회 실패");
    }
  };

  return (
    <div className="survey-container">
      <div className="survey-card">
        <h2 className="survey-title">📋 스마트 적금 설문조사</h2>
        <p className="survey-subtext">당신의 성향에 맞는 맞춤형 적금 상품을 추천받아보세요!</p>

        <form className="survey-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>직업</label>
            <input name="job" value={form.job} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>나이</label>
              <input type="number" name="age" value={form.age} onChange={handleChange} />
            </div>
            <div className="form-group half">
              <label>연소득 (만원)</label>
              <input type="number" name="income" value={form.income} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>적금 목적</label>
            <input name="savingGoal" value={form.savingGoal} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>목표 기간 (개월)</label>
              <input type="number" name="savingPeriod" value={form.savingPeriod} onChange={handleChange} />
            </div>
            <div className="form-group half">
              <label>위험 성향</label>
              <select name="riskPreference" value={form.riskPreference} onChange={handleChange}>
                <option value="">선택</option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>금융지식 (1~5)</label>
              <input type="number" name="financialKnowledge" value={form.financialKnowledge} onChange={handleChange} />
            </div>
            <div className="form-group half">
              <label>선호 은행</label>
              <input name="preferredBank" value={form.preferredBank} onChange={handleChange} />
            </div>
          </div>

          <button className="btn-submit" disabled={loading}>
            {loading ? "처리 중..." : "설문 제출"}
          </button>
        </form>

        {message && <p className="survey-message">{message}</p>}

        {result && (
          <div className="survey-result fade-in">
            <h3>📊 나의 설문 결과</h3>
            <ul>
                          <li><strong>직업:</strong> {result.job}</li>
                          <li><strong>나이:</strong> {result.age}</li>
                          <li><strong>연소득:</strong> {result.income} 만원</li>
                          <li><strong>적금 목적:</strong> {result.savingGoal}</li>
                          <li><strong>목표 기간:</strong> {result.savingPeriod} 개월</li>
                          <li><strong>위험 성향:</strong> {result.riskPreference}</li>
                          <li><strong>금융지식:</strong> {result.financialKnowledge}</li>
                          <li><strong>선호 은행:</strong> {result.preferredBank}</li>
                        </ul>
          </div>
        )}

        {result && (
          <div className="btn-area fade-in">
            <button onClick={handleGoHome} className="btn-home">🏠 메인으로</button>
            <button onClick={handleGetRecommendation} className="btn-recommend">
              ⭐ 나에게 맞는 적금 상품 추천받기
            </button>
          </div>
        )}

        {recommended.length > 0 && (
          <div className="recommend-list fade-in">
            <h3>🔥 TOP3 추천 적금</h3>
            <ul>
              {recommended.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.productName}</strong> ({item.bankName}) - 금리 {item.interestRate}%
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}

export default SurveyForm;



