import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

function Dashboard({ balance, income, expense }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
  };

  return (
    <div className="dashboard-grid">
      <div className="glass-card stat-card">
        <div className="stat-icon primary">
          <Wallet size={24} />
        </div>
        <div className="stat-info">
          <h3>Güncel Kasa</h3>
          <p className={balance >= 0 ? 'amount positive' : 'amount negative'}>
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      <div className="glass-card stat-card">
        <div className="stat-icon success">
          <TrendingUp size={24} />
        </div>
        <div className="stat-info">
          <h3>Toplam Gelir</h3>
          <p className="amount positive">{formatCurrency(income)}</p>
        </div>
      </div>

      <div className="glass-card stat-card">
        <div className="stat-icon danger">
          <TrendingDown size={24} />
        </div>
        <div className="stat-info">
          <h3>Toplam Gider</h3>
          <p className="amount negative">{formatCurrency(expense)}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
