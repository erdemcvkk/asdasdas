import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState([]);
  
  // Load initial data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('apartment_transactions');
    if (saved) {
      setTransactions(JSON.parse(saved));
    } else {
      // Demo data for initial wow factor
      const demoData = [
        { id: '1', type: 'dues', description: 'Ahmet Yılmaz (Daire 5) Aidat', amount: 500, date: new Date().toISOString() },
        { id: '2', type: 'expense', description: 'Asansör Bakımı', amount: -1200, date: new Date(Date.now() - 86400000).toISOString() },
        { id: '3', type: 'income', description: 'Ortak Alan Kira Geliri', amount: 2000, date: new Date(Date.now() - 172800000).toISOString() }
      ];
      setTransactions(demoData);
      localStorage.setItem('apartment_transactions', JSON.stringify(demoData));
    }
  }, []);

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('apartment_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Calculate totals
  const totalIncome = transactions.filter(t => t.type === 'income' || t.type === 'dues').reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="app-container">
      <header className="header">
        <h1>
          <Building2 size={32} />
          Apartman Yönetimi
        </h1>
        <div className="admin-badge">Admin Paneli</div>
      </header>

      <main>
        <Dashboard balance={balance} income={totalIncome} expense={totalExpense} />
        
        <div className="main-grid" style={{ marginTop: '2rem' }}>
          <div className="sidebar">
            <TransactionForm onAdd={addTransaction} />
          </div>
          
          <div className="content">
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
