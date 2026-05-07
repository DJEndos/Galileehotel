import { useState, useEffect } from "react";
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #C9A84C;
    --gold-light: #E8CC80;
    --gold-dim: rgba(201,168,76,0.15);
    --dark: #0A0C0F;
    --surface: #111418;
    --surface2: #181C22;
    --surface3: #1E242C;
    --border: rgba(201,168,76,0.2);
    --text: #F0EAD6;
    --text-muted: #7A8090;
    --green: #4CAF7D;
    --red: #E05252;
    --blue: #5B9BD5;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--dark); color: var(--text); }

  .auth-bg {
    min-height: 100vh;
    background: var(--dark);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .auth-bg::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
    top: -100px; right: -100px;
    pointer-events: none;
  }

  .auth-bg::after {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(91,155,213,0.06) 0%, transparent 70%);
    bottom: -100px; left: -100px;
    pointer-events: none;
  }

  .auth-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 48px 44px;
    width: 100%;
    max-width: 440px;
    position: relative;
    z-index: 1;
    box-shadow: 0 40px 80px rgba(0,0,0,0.5);
    animation: fadeUp 0.5s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .hotel-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 36px;
  }

  .logo-icon {
    width: 56px; height: 56px;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    margin-bottom: 12px;
    box-shadow: 0 8px 24px rgba(201,168,76,0.3);
  }

  .hotel-name {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: 0.02em;
  }

  .hotel-sub {
    font-size: 12px;
    color: var(--gold);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .auth-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .auth-subtitle {
    color: var(--text-muted);
    font-size: 14px;
    margin-bottom: 32px;
  }

  .field-group {
    margin-bottom: 20px;
  }

  .field-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  .field-input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 13px 16px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .field-input:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
  }

  .field-input::placeholder { color: var(--text-muted); }

  .btn-primary {
    width: 100%;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: #0A0C0F;
    border: none;
    border-radius: 10px;
    padding: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
    margin-top: 8px;
    letter-spacing: 0.02em;
  }

  .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-primary:active { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .auth-switch {
    text-align: center;
    margin-top: 24px;
    font-size: 14px;
    color: var(--text-muted);
  }

  .auth-switch span {
    color: var(--gold);
    cursor: pointer;
    font-weight: 500;
  }

  .auth-switch span:hover { text-decoration: underline; }

  .error-msg {
    background: rgba(224,82,82,0.1);
    border: 1px solid rgba(224,82,82,0.3);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    color: var(--red);
    margin-bottom: 16px;
  }

  .success-msg {
    background: rgba(76,175,125,0.1);
    border: 1px solid rgba(76,175,125,0.3);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    color: var(--green);
    margin-bottom: 16px;
  }

  /* DASHBOARD */
  .dashboard {
    min-height: 100vh;
    display: flex;
    animation: fadeUp 0.4s ease;
  }

  .sidebar {
    width: 260px;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 28px 0;
    position: fixed;
    top: 0; left: 0;
    height: 100vh;
    z-index: 100;
  }

  .sidebar-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 24px 28px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 20px;
  }

  .sidebar-logo-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .sidebar-logo-text { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; }
  .sidebar-logo-sub { font-size: 10px; color: var(--gold); letter-spacing: 0.12em; text-transform: uppercase; }

  .nav-section-label {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
    padding: 0 24px;
    margin: 16px 0 8px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 24px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-muted);
    margin: 1px 10px;
    border-radius: 10px;
  }

  .nav-item:hover { background: var(--surface2); color: var(--text); }
  .nav-item.active { background: var(--gold-dim); color: var(--gold); }
  .nav-item .nav-icon { font-size: 17px; width: 20px; text-align: center; }

  .sidebar-bottom {
    margin-top: auto;
    padding: 20px 24px;
    border-top: 1px solid var(--border);
  }

  .user-pill {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .user-avatar {
    width: 36px; height: 36px;
    background: var(--gold-dim);
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    color: var(--gold);
    font-weight: 600;
    flex-shrink: 0;
  }

  .user-name { font-size: 13px; font-weight: 600; }
  .user-role { font-size: 11px; color: var(--text-muted); }

  .logout-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 18px;
    margin-left: auto;
    padding: 4px;
    transition: color 0.2s;
  }
  .logout-btn:hover { color: var(--red); }

  .main-content {
    margin-left: 260px;
    flex: 1;
    padding: 36px 40px;
    min-height: 100vh;
  }

  .page-header {
    margin-bottom: 32px;
  }

  .page-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .page-subtitle { color: var(--text-muted); font-size: 14px; }

  /* STATS GRID */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 22px 24px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .stat-card:hover { border-color: var(--gold); }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 80px; height: 80px;
    border-radius: 0 16px 0 80px;
    opacity: 0.07;
  }

  .stat-card.gold::before { background: var(--gold); }
  .stat-card.green::before { background: var(--green); }
  .stat-card.blue::before { background: var(--blue); }
  .stat-card.red::before { background: var(--red); }

  .stat-icon { font-size: 22px; margin-bottom: 14px; }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; margin-bottom: 4px; }
  .stat-label { font-size: 12px; color: var(--text-muted); font-weight: 500; }
  .stat-change { font-size: 11px; margin-top: 6px; }
  .stat-change.up { color: var(--green); }
  .stat-change.down { color: var(--red); }

  /* CONFIRM PANEL */
  .confirm-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 32px 36px;
    margin-bottom: 28px;
  }

  .panel-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .panel-subtitle { font-size: 13px; color: var(--text-muted); margin-bottom: 28px; }

  .confirm-form {
    display: flex;
    gap: 14px;
    align-items: flex-end;
  }

  .confirm-form .field-group { flex: 1; margin-bottom: 0; }

  .btn-confirm {
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: #0A0C0F;
    border: none;
    border-radius: 10px;
    padding: 13px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .btn-confirm:hover { opacity: 0.88; }

  .result-card {
    margin-top: 24px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--border);
    animation: fadeUp 0.3s ease;
  }

  .result-header {
    padding: 18px 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .result-header.confirmed { background: rgba(76,175,125,0.12); border-bottom: 1px solid rgba(76,175,125,0.2); }
  .result-header.pending { background: rgba(201,168,76,0.1); border-bottom: 1px solid rgba(201,168,76,0.2); }
  .result-header.not-found { background: rgba(224,82,82,0.1); border-bottom: 1px solid rgba(224,82,82,0.2); }

  .result-status-icon { font-size: 28px; }

  .result-status-text .label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
  .result-status-text .value { font-size: 17px; font-weight: 600; margin-top: 2px; }
  .result-status-text .value.confirmed { color: var(--green); }
  .result-status-text .value.pending { color: var(--gold); }
  .result-status-text .value.not-found { color: var(--red); }

  .result-body {
    background: var(--surface2);
    padding: 24px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .result-field .label { font-size: 11px; color: var(--text-muted); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 4px; }
  .result-field .value { font-size: 15px; font-weight: 500; }

  .result-actions {
    background: var(--surface2);
    padding: 16px 24px;
    border-top: 1px solid var(--border);
    display: flex;
    gap: 10px;
  }

  .btn-action {
    padding: 9px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: opacity 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .btn-action:hover { opacity: 0.85; }

  .btn-action.approve { background: var(--green); color: #fff; }
  .btn-action.checkin { background: var(--blue); color: #fff; }
  .btn-action.cancel { background: rgba(224,82,82,0.15); color: var(--red); border: 1px solid rgba(224,82,82,0.3); }

  /* RESERVATIONS TABLE */
  .table-wrap {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
  }

  .table-head-row {
    display: flex;
    align-items: center;
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
  }

  .table-head-row .panel-title { margin-bottom: 0; }

  .table-search {
    margin-left: auto;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 14px;
    color: var(--text);
    font-size: 13px;
    outline: none;
    width: 200px;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s;
  }

  .table-search:focus { border-color: var(--gold); }
  .table-search::placeholder { color: var(--text-muted); }

  table { width: 100%; border-collapse: collapse; }

  thead tr { background: var(--surface2); }
  thead th {
    padding: 12px 20px;
    text-align: left;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
    font-weight: 600;
  }

  tbody tr { border-bottom: 1px solid rgba(201,168,76,0.07); transition: background 0.15s; }
  tbody tr:hover { background: var(--surface2); }
  tbody tr:last-child { border-bottom: none; }

  td {
    padding: 14px 20px;
    font-size: 14px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .badge.confirmed { background: rgba(76,175,125,0.15); color: var(--green); }
  .badge.pending { background: rgba(201,168,76,0.15); color: var(--gold); }
  .badge.checked-in { background: rgba(91,155,213,0.15); color: var(--blue); }
  .badge.cancelled { background: rgba(224,82,82,0.1); color: var(--red); }

  .res-num { font-family: monospace; color: var(--gold); font-size: 13px; font-weight: 600; }

  .empty-state {
    padding: 60px;
    text-align: center;
    color: var(--text-muted);
  }

  .empty-icon { font-size: 40px; margin-bottom: 12px; }
  .empty-text { font-size: 15px; }

  /* TAB */
  .tabs {
    display: flex;
    gap: 4px;
    background: var(--surface2);
    padding: 4px;
    border-radius: 10px;
    margin-bottom: 24px;
    width: fit-content;
  }

  .tab {
    padding: 8px 20px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    color: var(--text-muted);
    transition: background 0.15s, color 0.15s;
    border: none;
    background: none;
    font-family: 'DM Sans', sans-serif;
  }

  .tab.active { background: var(--surface); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
`;

// ── Mock data ──────────────────────────────────────
// const MOCK_RESERVATIONS = [
//   { id: "GLH-2025-0091", guest: "Emeka Okonkwo", room: "Deluxe Suite 301", checkIn: "2025-05-02", checkOut: "2025-05-05", nights: 3, amount: "₦180,000", status: "confirmed", email: "emeka@email.com", phone: "+234 801 234 5678" },
//   { id: "GLH-2025-0088", guest: "Ngozi Adeyemi", room: "Standard Room 112", checkIn: "2025-05-01", checkOut: "2025-05-03", nights: 2, amount: "₦72,000", status: "pending", email: "ngozi@email.com", phone: "+234 802 345 6789" },
//   { id: "GLH-2025-0085", guest: "Chukwuemeka Eze", room: "Executive Room 205", checkIn: "2025-04-28", checkOut: "2025-04-30", nights: 2, amount: "₦96,000", status: "checked-in", email: "emeka.eze@email.com", phone: "+234 803 456 7890" },
//   { id: "GLH-2025-0079", guest: "Amara Obi", room: "Presidential Suite 501", checkIn: "2025-04-25", checkOut: "2025-04-29", nights: 4, amount: "₦520,000", status: "confirmed", email: "amara@email.com", phone: "+234 804 567 8901" },
//   { id: "GLH-2025-0074", guest: "Bola Fashola", room: "Standard Room 108", checkIn: "2025-04-20", checkOut: "2025-04-22", nights: 2, amount: "₦72,000", status: "cancelled", email: "bola@email.com", phone: "+234 805 678 9012" },
//   { id: "GLH-2025-0068", guest: "Funke Akindele", room: "Deluxe Room 215", checkIn: "2025-05-06", checkOut: "2025-05-08", nights: 2, amount: "₦108,000", status: "pending", email: "funke@email.com", phone: "+234 806 789 0123" },
// ];

// ── Helpers ──────────────────────────────────────
const getInitials = name => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

const StatusBadge = ({ status }) => {
  const labels = { confirmed: "Confirmed", pending: "Pending", "checked-in": "Checked In", cancelled: "Cancelled" };
  const dots = { confirmed: "🟢", pending: "🟡", "checked-in": "🔵", cancelled: "🔴" };
  return <span className={`badge ${status}`}>{dots[status]} {labels[status]}</span>;
};

// ── AUTH SCREENS ──────────────────────────────────
function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "attendant" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([
    { name: "Admin User", email: "admin@galileehotel.com", password: "admin123", role: "admin" }
  ]);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
  setError('');
  setLoading(true);
  try {
    if (mode === 'login') {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Login failed'); return; }
      localStorage.setItem('ghToken', data.token);
      onLogin(data.user);
    } else {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Sign up failed'); return; }
      setMode('login');
      setForm(f => ({ ...f, name: '', password: '', confirm: '' }));
    }
  } catch (err) {
    setError('Network error. Please check your connection.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="hotel-logo">
          <div className="logo-icon">🏨</div>
          <div className="hotel-name">Galilee Hotel</div>
          <div className="hotel-sub">Management Portal</div>
        </div>
        <div className="auth-title">{mode === "login" ? "Welcome back" : "Create account"}</div>
        <div className="auth-subtitle">{mode === "login" ? "Sign in to your staff account" : "Register a new staff account"}</div>

        {error && <div className="error-msg">⚠️ {error}</div>}

        {mode === "signup" && (
          <>
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <input className="field-input" placeholder="e.g. Emeka Okonkwo" value={form.name} onChange={set("name")} />
            </div>
            <div className="field-group">
              <label className="field-label">Role</label>
              <select className="field-input" value={form.role} onChange={set("role")} style={{ cursor: "pointer" }}>
                <option value="attendant">Front Desk Attendant</option>
                <option value="admin">Administrator</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </>
        )}

        <div className="field-group">
          <label className="field-label">Email Address</label>
          <input className="field-input" type="email" placeholder="staff@galileehotel.com" value={form.email} onChange={set("email")} />
        </div>

        <div className="field-group">
          <label className="field-label">Password</label>
          <input className="field-input" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} />
        </div>

        {mode === "signup" && (
          <div className="field-group">
            <label className="field-label">Confirm Password</label>
            <input className="field-input" type="password" placeholder="••••••••" value={form.confirm} onChange={set("confirm")} />
          </div>
        )}

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
        </button>

        <div className="auth-switch">
          {mode === "login" ? <>Don't have an account? <span onClick={() => { setMode("signup"); setError(""); }}>Sign up</span></> : <>Already have an account? <span onClick={() => { setMode("login"); setError(""); }}>Sign in</span></>}
        </div>

        {mode === "login" && (
          <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "var(--text-muted)" }}>
            Demo: admin@galileehotel.com / admin123
          </div>
        )}
      </div>
    </div>
  );
}

// ── DASHBOARD ──────────────────────────────────────
const handleLogout = () => {
  localStorage.removeItem('ghToken');
  setUser(null);
};
useEffect(() => {
  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('ghToken');
      const res = await fetch(`${API}/api/reservations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      console.error('Failed to load reservations:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchReservations();
}, []);
  const stats = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === "confirmed").length,
    checkedIn: reservations.filter(r => r.status === "checked-in").length,
    pending: reservations.filter(r => r.status === "pending").length,
  };

  const lookup = async () => {
  if (!resNum.trim()) { setLookupMsg('Please enter a reservation number.'); return; }
  try {
    const token = localStorage.getItem('ghToken');
    const res = await fetch(`${API}/api/reservations/${resNum.trim()}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) { setLookupResult(null); setLookupMsg('No reservation found with that number.'); return; }
    const data = await res.json();
    setLookupResult(data);
    setLookupMsg('');
  } catch (err) {
    setLookupMsg('Network error. Please try again.');
  }
};

 const updateStatus = async (id, newStatus) => {
  try {
    const token = localStorage.getItem('ghToken');
    const res = await fetch(`${API}/api/reservations/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      setReservations(rs => rs.map(r => r.reservationId === id ? { ...r, status: newStatus } : r));
      if (lookupResult?.reservationId === id) setLookupResult(r => ({ ...r, status: newStatus }));
    }
  } catch (err) {
    console.error('Failed to update status:', err);
  }
};
  const filtered = reservations.filter(r => {
    const matchSearch = r.guest.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase()) || r.room.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🏨</div>
          <div>
            <div className="sidebar-logo-text">Galilee Hotel</div>
            <div className="sidebar-logo-sub">Staff Portal</div>
          </div>
        </div>

        <div className="nav-section-label">Main</div>
        {[
          { key: "overview", icon: "📊", label: "Overview" },
          { key: "confirm", icon: "✅", label: "Confirm Reservation" },
          { key: "reservations", icon: "📋", label: "All Reservations" },
        ].map(n => (
          <div key={n.key} className={`nav-item ${tab === n.key ? "active" : ""}`} onClick={() => setTab(n.key)}>
            <span className="nav-icon">{n.icon}</span> {n.label}
          </div>
        ))}

        <div className="nav-section-label" style={{ marginTop: 20 }}>Staff</div>
        {[
          { key: "rooms", icon: "🛏️", label: "Rooms" },
          { key: "guests", icon: "👥", label: "Guests" },
        ].map(n => (
          <div key={n.key} className={`nav-item ${tab === n.key ? "active" : ""}`} onClick={() => setTab(n.key)}>
            <span className="nav-icon">{n.icon}</span> {n.label}
          </div>
        ))}

        <div className="sidebar-bottom">
          <div className="user-pill">
            <div className="user-avatar">{getInitials(user.name)}</div>
            <div>
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
            <button className="logout-btn" title="Sign out" onClick={onLogout}>⏻</button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {/* OVERVIEW */}
        {tab === "overview" && (
          <>
            <div className="page-header">
              <div className="page-title">Good day, {user.name.split(" ")[0]} 👋</div>
              <div className="page-subtitle">Here's what's happening at Galilee Hotel today</div>
            </div>

            <div className="stats-grid">
              <div className="stat-card gold">
                <div className="stat-icon">📋</div>
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">Total Reservations</div>
              </div>
              <div className="stat-card green">
                <div className="stat-icon">✅</div>
                <div className="stat-value">{stats.confirmed}</div>
                <div className="stat-label">Confirmed</div>
                <div className="stat-change up">↑ Ready for check-in</div>
              </div>
              <div className="stat-card blue">
                <div className="stat-icon">🛎️</div>
                <div className="stat-value">{stats.checkedIn}</div>
                <div className="stat-label">Checked In</div>
              </div>
              <div className="stat-card red" style={{ "--red": "#C9A84C" }}>
                <div className="stat-icon">⏳</div>
                <div className="stat-value">{stats.pending}</div>
                <div className="stat-label">Pending</div>
                <div className="stat-change" style={{ color: "var(--gold)" }}>Awaiting confirmation</div>
              </div>
            </div>

            <div className="confirm-panel">
              <div className="panel-title">Quick Reservation Lookup</div>
              <div className="panel-subtitle">Enter a reservation number to instantly pull up guest details</div>
              <div className="confirm-form">
                <div className="field-group">
                  <label className="field-label">Reservation Number</label>
                  <input className="field-input" placeholder="e.g. GLH-2025-0091" value={resNum} onChange={e => setResNum(e.target.value)} onKeyDown={e => e.key === "Enter" && lookup()} />
                </div>
                <button className="btn-confirm" onClick={lookup}>Look Up →</button>
              </div>
              {lookupMsg && <div className="error-msg" style={{ marginTop: 16 }}>⚠️ {lookupMsg}</div>}
              {lookupResult && <ReservationResult res={lookupResult} onUpdate={updateStatus} />}
            </div>

            <div className="table-wrap">
              <div className="table-head-row">
                <div className="panel-title">Recent Reservations</div>
                <input className="table-search" placeholder="🔍 Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ marginLeft: "auto" }} />
              </div>
              <ReservationTable data={filtered.slice(0, 5)} onUpdate={updateStatus} />
            </div>
          </>
        )}

        {/* CONFIRM TAB */}
        {tab === "confirm" && (
          <>
            <div className="page-header">
              <div className="page-title">Confirm Reservation</div>
              <div className="page-subtitle">Verify and confirm a guest's reservation using their reservation number</div>
            </div>

            <div className="confirm-panel">
              <div className="panel-title">Reservation Lookup</div>
              <div className="panel-subtitle">Enter the reservation number provided to the guest upon booking</div>
              <div className="confirm-form">
                <div className="field-group">
                  <label className="field-label">Reservation Number</label>
                  <input className="field-input" placeholder="e.g. GLH-2025-0091" value={resNum} onChange={e => setResNum(e.target.value)} onKeyDown={e => e.key === "Enter" && lookup()} />
                </div>
                <button className="btn-confirm" onClick={lookup}>Confirm →</button>
              </div>
              {lookupMsg && <div className="error-msg" style={{ marginTop: 16 }}>❌ {lookupMsg}</div>}
              {lookupResult && <ReservationResult res={lookupResult} onUpdate={updateStatus} />}
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 24px" }}>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Try these sample reservation numbers</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {reservations.map(r => (
                  <button key={r.id} onClick={() => { setResNum(r.id); setLookupResult(null); setLookupMsg(""); }}
                    style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 14px", color: "var(--gold)", fontFamily: "monospace", fontSize: 13, cursor: "pointer", transition: "border-color 0.15s" }}
                    onMouseOver={e => e.target.style.borderColor = "var(--gold)"}
                    onMouseOut={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
                  >{r.id}</button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ALL RESERVATIONS */}
        {tab === "reservations" && (
          <>
            <div className="page-header">
              <div className="page-title">All Reservations</div>
              <div className="page-subtitle">Manage and track all guest reservations</div>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
              <input className="field-input" style={{ maxWidth: 280 }} placeholder="🔍 Search by guest, ID, room…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <select className="field-input" style={{ maxWidth: 160, cursor: "pointer" }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="checked-in">Checked In</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="table-wrap">
              <ReservationTable data={filtered} onUpdate={updateStatus} showAll />
            </div>
          </>
        )}

        {/* PLACEHOLDER TABS */}
        {(tab === "rooms" || tab === "guests") && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 400, flexDirection: "column", gap: 12, color: "var(--text-muted)" }}>
            <div style={{ fontSize: 48 }}>{tab === "rooms" ? "🛏️" : "👥"}</div>
            <div style={{ fontSize: 20, color: "var(--text)", fontFamily: "Playfair Display" }}>{tab === "rooms" ? "Rooms Management" : "Guest Directory"}</div>
            <div style={{ fontSize: 14 }}>This section is coming soon</div>
          </div>
        )}
      </main>
    </div>
  );
}

function ReservationResult({ res, onUpdate }) {
  const statusClass = res.status === "checked-in" ? "confirmed" : res.status;
  return (
    <div className="result-card">
      <div className={`result-header ${statusClass}`}>
        <div className="result-status-icon">
          {res.status === "confirmed" ? "✅" : res.status === "pending" ? "⏳" : res.status === "checked-in" ? "🛎️" : "❌"}
        </div>
        <div className="result-status-text">
          <div className="label">Reservation Status</div>
          <div className={`value ${statusClass}`}>
            {res.status === "confirmed" ? "Confirmed — Ready for Check-In" : res.status === "pending" ? "Pending — Awaiting Confirmation" : res.status === "checked-in" ? "Guest is Checked In" : "Reservation Cancelled"}
          </div>
        </div>
        <div style={{ marginLeft: "auto", fontFamily: "monospace", color: "var(--gold)", fontSize: 14, fontWeight: 700 }}>{res.id}</div>
      </div>

      <div className="result-body">
        <div className="result-field"><div className="label">Guest Name</div><div className="value">👤 {res.guest}</div></div>
        <div className="result-field"><div className="label">Room</div><div className="value">🛏️ {res.room}</div></div>
        <div className="result-field"><div className="label">Amount Paid</div><div className="value" style={{ color: "var(--green)" }}>💰 {res.amount}</div></div>
        <div className="result-field"><div className="label">Check-In</div><div className="value">📅 {res.checkIn}</div></div>
        <div className="result-field"><div className="label">Check-Out</div><div className="value">📅 {res.checkOut}</div></div>
        <div className="result-field"><div className="label">Duration</div><div className="value">🌙 {res.nights} night{res.nights > 1 ? "s" : ""}</div></div>
        <div className="result-field"><div className="label">Email</div><div className="value" style={{ fontSize: 13 }}>✉️ {res.email}</div></div>
        <div className="result-field"><div className="label">Phone</div><div className="value" style={{ fontSize: 13 }}>📞 {res.phone}</div></div>
      </div>

      <div className="result-actions">
        {res.status === "pending" && <button className="btn-action approve" onClick={() => onUpdate(res.id, "confirmed")}>✅ Approve Reservation</button>}
        {res.status === "confirmed" && <button className="btn-action checkin" onClick={() => onUpdate(res.id, "checked-in")}>🛎️ Check In Guest</button>}
        {res.status !== "cancelled" && res.status !== "checked-in" && <button className="btn-action cancel" onClick={() => onUpdate(res.id, "cancelled")}>✗ Cancel</button>}
      </div>
    </div>
  );
}

function ReservationTable({ data, onUpdate, showAll }) {
  if (data.length === 0) return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <div className="empty-text">No reservations found</div>
    </div>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Reservation #</th>
          <th>Guest</th>
          <th>Room</th>
          <th>Check-In</th>
          <th>Check-Out</th>
          <th>Amount</th>
          <th>Status</th>
          {showAll && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map(r => (
          <tr key={r.id}>
            <td><span className="res-num">{r.id}</span></td>
            <td style={{ fontWeight: 500 }}>{r.guest}</td>
            <td style={{ fontSize: 13, color: "var(--text-muted)" }}>{r.room}</td>
            <td style={{ fontSize: 13 }}>{r.checkIn}</td>
            <td style={{ fontSize: 13 }}>{r.checkOut}</td>
            <td style={{ color: "var(--green)", fontWeight: 500 }}>{r.amount}</td>
            <td><StatusBadge status={r.status} /></td>
            {showAll && (
              <td>
                <div style={{ display: "flex", gap: 6 }}>
                  {r.status === "pending" && <button className="btn-action approve" style={{ padding: "5px 10px", fontSize: 11 }} onClick={() => onUpdate(r.id, "confirmed")}>Approve</button>}
                  {r.status === "confirmed" && <button className="btn-action checkin" style={{ padding: "5px 10px", fontSize: 11 }} onClick={() => onUpdate(r.id, "checked-in")}>Check In</button>}
                  {r.status !== "cancelled" && r.status !== "checked-in" && <button className="btn-action cancel" style={{ padding: "5px 10px", fontSize: 11 }} onClick={() => onUpdate(r.id, "cancelled")}>Cancel</button>}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── ROOT ──────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <style>{STYLES}</style>
      {!user ? <AuthScreen onLogin={setUser} /> : <Dashboard user={user} onLogout={() => setUser(null)} />}
    </>
  );
}