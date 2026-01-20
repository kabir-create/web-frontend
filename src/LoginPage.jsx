import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleContinue = () => {
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[A-Za-z ]+$/;

    if (!name || !nameRegex.test(name)) {
      alert("Name must contain only alphabets");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    // store for backend mock auth & later payment flows
    localStorage.setItem("phone", phone);
    localStorage.setItem("name", name);

    navigate("/scan");
  };

  return (
    <div className="page">
      <div style={{ display: "flex", gap: "40px" }}>

        {/* CUSTOMER LOGIN */}
        <div className="card login-card">
          <h1 className="login-title">
            Split<span style={{ color: "#ffb020" }}>Pay</span>
          </h1>
          <p className="login-subtitle">
            Split bills effortlessly with friends
          </p>

          <div className="form-group">
            <span className="icon">👤</span>
            <input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <span className="icon">📞</span>
            <input
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <span className="icon">👥</span>
            <select>
              <option>Select restaurant group</option>
              <option>Table T-1</option>
              <option>Table T-2</option>
            </select>
          </div>

          <button onClick={handleContinue}>
            Continue
          </button>
        </div>

        {/* MANAGER ACCESS */}
        <div className="card">
          <div className="qr-icon">🛡️</div>
          <h2 style={{ color: "#fff" }}>Manager Access</h2>
          <p className="subtitle">
            Enter your manager code to access the restaurant dashboard
          </p>

          <div className="form-group">
            <input placeholder="Enter manager code" />
          </div>

          <button onClick={() => navigate("/manager-dashboard")}>
            Verify Access →
          </button>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
