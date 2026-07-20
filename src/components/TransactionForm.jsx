import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

function TransactionForm({ onAdd }) {
  const [type, setType] = useState('dues');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    let finalAmount = parseFloat(amount);
    if (type === 'expense') {
      finalAmount = -Math.abs(finalAmount);
    } else {
      finalAmount = Math.abs(finalAmount);
    }

    onAdd({ type, description, amount: finalAmount });
    
    // Reset form
    setDescription('');
    setAmount('');
  };

  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <PlusCircle size={20} />
        Yeni İşlem Ekle
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>İşlem Türü</label>
          <select 
            className="form-control" 
            value={type} 
            onChange={(e) => setType(e.target.value)}
          >
            <option value="dues">Aidat Ödemesi</option>
            <option value="income">Diğer Gelir</option>
            <option value="expense">Gider / Harcama</option>
          </select>
        </div>

        <div className="form-group">
          <label>Açıklama (Örn: Daire 5 Ahmet Bey, Asansör Bakımı)</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Açıklama giriniz..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Tutar (TL)</label>
          <input 
            type="number" 
            className="form-control" 
            placeholder="0.00"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-full">
          İşlemi Kaydet
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
