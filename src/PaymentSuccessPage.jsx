import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p>Invalid access</p>;
  }

  const { amount, groupCode } = state;

  return (
    <div className="page">
      <div className="card">

        <div className="qr-icon">✅</div>

        <h2 className="qr-title">Payment Successful!</h2>
        <p className="subtitle">
          Thanks! Your payment has been recorded.
        </p>

        <div className="info" style={{ color: "#2ecc71", fontWeight: 700 }}>
          ● PAID
        </div>

        <div className="bill-box">
          <div className="row">
            <span>Amount Paid</span>
            <span>₹{amount}</span>
          </div>
        </div>

        <button onClick={() => navigate(`/group/${groupCode}`)}>
          View Group Status →
        </button>

      </div>
    </div>
  );
}

export default PaymentSuccessPage;
