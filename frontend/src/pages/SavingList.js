import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../App.css';

const SavingList = () => {
  const navigate = useNavigate(); // ✅ 위치 수정
  const [savings, setSavings] = useState([]);
  const [filters, setFilters] = useState({
    bankName: '',
    minRate: '',
    maxPeriod: '',
  });
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    axios
      .get('/api/savings', { params: { ...filters, sortBy } })
      .then((res) => setSavings(res.data))
      .catch((err) => console.error('API 오류:', err));
  }, [filters, sortBy]);

  return (
    <div className="saving-page">
      <header className="saving-header">
        <h1>💰 적금 상품 소개</h1>
        <p className="sub-text">당신에게 맞는 최적의 적금 상품을 찾아보세요</p>
      </header>

      <section className="filter-bar">
        <input
          type="text"
          placeholder="은행명 검색"
          onChange={(e) => setFilters({ ...filters, bankName: e.target.value })}
        />
        <input
          type="number"
          placeholder="최소 금리"
          onChange={(e) => setFilters({ ...filters, minRate: e.target.value })}
        />
        <input
          type="number"
          placeholder="최대 기간(개월)"
          onChange={(e) => setFilters({ ...filters, maxPeriod: e.target.value })}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">정렬 없음</option>
          <option value="rate">금리 높은 순</option>
          <option value="period">기간 짧은 순</option>
        </select>
      </section>

      <section className="saving-list">
        {savings.map((s) => (
          <div key={s.id} className="saving-card">
            <div className="card-top">
              <h3>{s.bankName}</h3>
              <span className="tag">{s.period}개월</span>
            </div>
            <h2 className="product-name">{s.productName}</h2>
            <div className="rate-info">
              <strong>{s.interestRate}%</strong>
              {s.maxInterestRate && (
                <span className="max-rate">최대 {s.maxInterestRate}%</span>
              )}
            </div>
            <p className="condition">{s.condition}</p>

            {/* ✅ 내부 페이지 이동용 버튼 */}
            <button
              className="detail-btn"
              onClick={() => navigate(`/savings/${s.id}`)}
            >
              상품 자세히 보기 →
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SavingList;
