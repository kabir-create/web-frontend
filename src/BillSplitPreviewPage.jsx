import { useLocation, useNavigate } from "react-router-dom";

function BillSplitPreviewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // safety guard
  if (!state) {
    return <p>Invalid access</p>;
  }

  const {
    billId,
    groupCode,
    splitAmount,
    totalBill,
    people,
    qr
  } = state;

  const userName = localStorage.getItem("name") || "Guest";

  return (
    <div className="page">
      <div className="card">

        <div className="qr-icon">💰</div>

        <h2 className="qr-title">Bill Split Preview</h2>
        <p className="subtitle">Review your share before payment</p>

        {/* BILL DETAILS */}
        <div className="bill-box">
          <div className="row">
            <span>Total Bill</span>
            <span>₹{totalBill}</span>
          </div>

          <div className="row">
            <span>Number of People</span>
            <span>{people}</span>
          </div>

          <div className="row bold">
            <span>Your Share</span>
            <span>₹{splitAmount}</span>
          </div>
        </div>

        <div className="info">Equal split only</div>

        {/* USER INFO */}
        <div className="bill-box">
          <div className="row">
            <span>You're paying as</span>
            <span>{userName}</span>
          </div>

          <div className="row">
            <span>Group Code</span>
            <span>{groupCode}</span>
          </div>
        </div>

        {/* QR DISPLAY (NEW but minimal) */}
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          <img
            src={qr}
            alt="QR Code"
            style={{ width: "180px", height: "180px" }}
          />
        </div>

        {/* CONTINUE */}
        <button
          onClick={() =>
            navigate("/payment", {
              state: {
                billId,
                groupCode,
                amount: splitAmount
              }
            })
          }
        >
          Continue to Payment →
        </button>

      </div>
    </div>
  );
}

export default BillSplitPreviewPage;
