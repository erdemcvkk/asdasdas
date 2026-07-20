import React from 'react';
import { Trash2 } from 'lucide-react';

function TransactionList({ transactions, onDelete }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(Math.abs(amount));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBadgeClass = (type) => {
    switch(type) {
      case 'dues': return 'badge dues';
      case 'income': return 'badge income';
      case 'expense': return 'badge expense';
      default: return 'badge';
    }
  };

  const getBadgeText = (type) => {
    switch(type) {
      case 'dues': return 'Aidat';
      case 'income': return 'Gelir';
      case 'expense': return 'Gider';
      default: return type;
    }
  };

  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>İşlem Geçmişi</h2>
      
      {transactions.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>
          Henüz hiç işlem kaydı bulunmuyor.
        </p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Tarih</th>
                <th>Tür</th>
                <th>Açıklama</th>
                <th style={{ textAlign: 'right' }}>Tutar</th>
                <th style={{ textAlign: 'center' }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {formatDate(t.date)}
                  </td>
                  <td>
                    <span className={getBadgeClass(t.type)}>
                      {getBadgeText(t.type)}
                    </span>
                  </td>
                  <td>{t.description}</td>
                  <td style={{ textAlign: 'right' }} className={t.amount >= 0 ? 'amount positive' : 'amount negative'}>
                    {t.amount >= 0 ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      onClick={() => onDelete(t.id)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--danger)', 
                        cursor: 'pointer',
                        padding: '0.25rem'
                      }}
                      title="Sil"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
