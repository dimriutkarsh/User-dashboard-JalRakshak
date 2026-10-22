import { createContext, useContext, useState, useEffect } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setToasts((prev) => prev.filter((t) => Date.now() - t.createdAt < 8000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, createdAt: Date.now() }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.message}
          <button onClick={() => removeToast(t.id)} style={{background:'none',border:'none',color:'#94a3b8',cursor:'pointer',marginLeft:'auto'}}>×</button>
        </div>
      ))}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
