/*import React, { useEffect, useState } from "react";
import axios from "axios";

const RecommendResult = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    console.log("✅ RecommendResult - Loaded userId from localStorage:", userId);

    axios
      .get(`http://localhost:8080/api/survey/recommend/top3/${userId}`)
      .then((res) => {
        console.log("✅ API Response data:", res.data);
        setRecommendations(res.data);
      })
      .catch((err) => console.error("❌ Recommend API Error:", err));
  }, []);


    return (
      <div style={styles.pageWrapper}>
        <h2 style={styles.pageTitle}>🔥 당신에게 가장 잘 맞는 적금 TOP 3</h2>

        <div style={styles.cardGrid}>
          {recommendations.map((item, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.18)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.12)";
              }}
            >
              <div style={styles.rankCircle}>{index + 1}</div>
              <h3 style={styles.productName}>{item.productName}</h3>
              <p style={styles.bankName}>{item.bankName}</p>

              <div style={styles.infoLine}>
                <span>기간</span>
                <strong>{item.period}개월</strong>
              </div>

              <div style={styles.infoLine}>
                <span>금리</span>
                <strong>{item.interestRate}%</strong>
              </div>

              <div style={styles.barWrapper}>
                <div
                  style={{
                    ...styles.barFill,
                    width: `${item.interestRate * 10}%`,
                  }}
                ></div>
              </div>
              <p style={styles.percentLabel}>{item.interestRate}% 금리점수</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

const styles = {
  pageWrapper: {
    padding: "50px 80px",
    background: "linear-gradient(135deg, #f0f4ff, #e8eeff)",
    minHeight: "100vh",
    textAlign: "center",
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "50px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
    gap: "30px",
    paddingBottom: "60px",
  },
  card: {
    background: "#fff",
    borderRadius: "22px",
    padding: "32px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    transition: "all 0.25s",
    cursor: "pointer",
  },
  rankCircle: {
    width: "42px",
    height: "42px",
    background: "#4c74ff",
    color: "#fff",
    borderRadius: "50%",
    fontWeight: "bold",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
  },
  productName: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "4px",
  },
  bankName: {
    fontSize: "15px",
    color: "#666",
    marginBottom: "18px",
  },
  infoLine: {
    display: "flex",
    justifyContent: "space-between",
    margin: "6px 0",
    fontSize: "16px",
  },
  barWrapper: {
    width: "100%",
    height: "14px",
    background: "#ebebeb",
    borderRadius: "12px",
    marginTop: "14px",
    overflow: "hidden",
  },
  barFill: {
    height: "14px",
    background: "#4c74ff",
    borderRadius: "12px",
    transition: "width 0.3s",
  },
  percentLabel: {
    marginTop: "6px",
    fontSize: "12px",
    color: "#333",
    textAlign: "right",
  },
};

export default RecommendResult;
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecommendResult = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [survey, setSurvey] = useState(null);
  const navigate = useNavigate();

  const calcScore = (p) => {
    if (!survey) return 0;
    let score = 0;
    score -= Math.abs(p.period - survey.savingPeriod);
    score += parseInt(p.interestRate * 10);
    return score;
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios.get(`http://localhost:8080/api/survey/user/${userId}`)
      .then(res => setSurvey(res.data));

    axios.get(`http://localhost:8080/api/survey/recommend/top3/${userId}`)
      .then(res => setRecommendations(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.pageWrapper}>
      <h2 style={styles.pageTitle}>🔥 당신에게 가장 잘 맞는 적금 TOP 3</h2>

      <div style={styles.cardGrid}>
        {recommendations.map((item, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.18)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.12)";
            }}
          >
            <div style={styles.rankCircle}>{index + 1}</div>
            <h3 style={styles.productName}>{item.productName}</h3>
            <p style={styles.bankName}>{item.bankName}</p>

            <div style={styles.infoLine}>
              <span>기간</span>
              <strong>{item.period}개월</strong>
            </div>

            <div style={styles.infoLine}>
              <span>금리</span>
              <strong>{item.interestRate}%</strong>
            </div>

            {survey && (
              <>
                <div style={styles.barWrapper}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: `${calcScore(item) * 3}%`,
                    }}
                  ></div>
                </div>
                <p style={styles.percentLabel}>
                  추천점수 {calcScore(item)} pts
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ✅ 다시 설문하기 버튼 */}
      <button
        style={styles.reSurveyBtn}
        onClick={() => navigate("/")}
      >
        다시 설문하기
      </button>
    </div>
  );
};


const styles = {
  pageWrapper: {
    padding: "50px 80px",
    background: "linear-gradient(135deg, #f0f4ff, #e8eeff)",
    minHeight: "100vh",
    textAlign: "center",
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "50px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
    gap: "40px",
    paddingBottom: "60px",
  },
  card: {
    background: "#fff",
    borderRadius: "22px",
    padding: "36px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    transition: "all 0.25s",
    cursor: "pointer",
  },
  rankCircle: {
    width: "48px",
    height: "48px",
    background: "#4c74ff",
    color: "#fff",
    borderRadius: "50%",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 18px",
  },
  productName: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "6px",
  },
  bankName: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "22px",
  },
  infoLine: {
    display: "flex",
    justifyContent: "space-between",
    margin: "8px 0",
    fontSize: "17px",
  },
  barWrapper: {
    width: "100%",
    height: "14px",
    background: "#ebebeb",
    borderRadius: "12px",
    marginTop: "18px",
    overflow: "hidden",
  },
  barFill: {
    height: "14px",
    background: "#4c74ff",
    borderRadius: "12px",
    transition: "width 0.3s",
  },
  percentLabel: {
    marginTop: "8px",
    fontSize: "13px",
    color: "#333",
    textAlign: "right",
  },

  // ✅ 버튼 스타일
  reSurveyBtn: {
    marginTop: "40px",
    padding: "16px 34px",
    background: "#4c74ff",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    transition: "0.2s",
  },
};

export default RecommendResult;
