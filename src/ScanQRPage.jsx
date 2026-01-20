import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

function ScanQRPage() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const [cameraOn, setCameraOn] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  // 🔹 core logic after QR is "scanned"
  const handleScanResult = async (groupCode) => {
    try {
      const res = await fetch(`${API_BASE}/bill/${groupCode}`, {
        headers: {
          "x-phone": localStorage.getItem("phone") // from login
        }
      });

      if (!res.ok) {
        throw new Error("Invalid or expired QR");
      }

      const data = await res.json();

      navigate("/preview", {
        state: {
          groupCode,
          totalAmount: data.total,
          splitAmount: data.splitAmount,
          participants: data.participants
        }
      });
    } catch (err) {
      setError(err.message || "Failed to scan QR");
      setScanning(false);
    }
  };

  // 🔸 simulate scan (demo button)
  const demoScan = () => {
    setScanning(true);

    // 🔥 use a REAL groupCode from DB while testing
    const demoGroupCode = "7e6d2993-0241-446d-928a-addd57307cd5";

    setTimeout(() => {
      handleScanResult(demoGroupCode);
    }, 4000);
  };

  const startCamera = () => {
    setCameraOn(true);
    setScanning(true);

    // ⚠️ real QR decoding can be added later
    // for now simulate success
    demoScan();
  };

  useEffect(() => {
    if (!cameraOn) return;

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch {
        setError("Unable to access camera");
        setCameraOn(false);
      }
    };

    initCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraOn]);

  return (
    <div className="page">
      <div className="card qr-card">

        <div className="qr-icon">⌁</div>

        <h2 className="qr-title">Scan Table QR</h2>
        <p className="subtitle">
          Scan the QR code on your table to continue
        </p>

        <div className="qr-box">
          {cameraOn ? (
            <video
              ref={videoRef}
              className="camera-video"
              playsInline
              muted
            />
          ) : (
            <div className="camera-icon">📷</div>
          )}

          {scanning && <div className="scan-line" />}
        </div>

        {error && <div className="error-box">{error}</div>}

        {!cameraOn && !scanning && (
          <button onClick={startCamera}>
            Start Camera Scan
          </button>
        )}

        {!scanning && (
          <button className="secondary" onClick={demoScan}>
            Demo: Simulate Scan
          </button>
        )}

      </div>
    </div>
  );
}

export default ScanQRPage;
