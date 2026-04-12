import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { categoryColors } from "../data/workshops";

const ConfirmationPage = () => {
  const { confirmedBooking: b, navigate, user } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  if (!b) {
    navigate("workshops");
    return null;
  }

  const cat = categoryColors[b.color] || categoryColors.design;

  return (
    <div
      style={{
        maxWidth: 560,
        margin: "0 auto",
        padding: "60px 24px 80px",
        textAlign: "center",
      }}
    >
      {/* Animated check */}
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: "50%",
          background: "#D1FAE5",
          border: "3px solid #6EE7B7",
          margin: "0 auto 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: visible ? "scale(1)" : "scale(0)",
          transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#059669"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 50,
            strokeDashoffset: visible ? 0 : 50,
            transition: "stroke-dashoffset 0.6s ease 0.3s",
          }}
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease 0.2s",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 800,
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}
        >
          You're in! 🎉
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: 32,
            maxWidth: 400,
            margin: "0 auto 32px",
          }}
        >
          Your seat is confirmed. See you at{" "}
          <strong style={{ color: "var(--text-primary)" }}>{b.title}</strong>. A
          confirmation has been sent to{" "}
          <strong style={{ color: "var(--accent)" }}>{user?.email}</strong>.
        </p>

        {/* Booking card */}
        <div
          style={{
            background: "var(--surface)",
            border: `2px solid ${cat.dot}30`,
            borderRadius: "var(--r-2xl)",
            padding: "28px 32px",
            marginBottom: 24,
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: cat.dot,
              }}
            />
            <span
              style={{
                background: cat.bg,
                color: cat.text,
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "var(--r-full)",
              }}
            >
              {b.category}
            </span>
            <span
              style={{
                background: "#D1FAE5",
                color: "#065F46",
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "var(--r-full)",
              }}
            >
              Confirmed ✓
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            {b.title}
          </h2>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {[
              { label: "📅 Date", value: b.date },
              { label: "⏰ Time", value: b.time },
              { label: "📍 Location", value: b.location },
              { label: "👤 Name", value: user?.name },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: "var(--bg)",
                  borderRadius: "var(--r-md)",
                  padding: "12px 14px",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    marginBottom: 3,
                  }}
                >
                  {label}
                </p>
                <p style={{ fontSize: 13, fontWeight: 700 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div
          style={{
            background: "var(--accent-light)",
            borderRadius: "var(--r-xl)",
            padding: "24px",
            marginBottom: 32,
            textAlign: "left",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 700,
              color: "var(--accent)",
              marginBottom: 16,
            }}
          >
            What happens next?
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              {
                step: "1",
                text: "Check your email for the confirmation and any pre-reading.",
              },
              {
                step: "2",
                text: "Add the workshop to your calendar so you don't forget.",
              },
              {
                step: "3",
                text: "Show up 5 mins early and bring your laptop (if needed).",
              },
              {
                step: "4",
                text: "Leave with a new skill and something real to show for it.",
              },
            ].map(({ step, text }) => (
              <div
                key={step}
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {step}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--accent-dark)",
                    lineHeight: 1.6,
                    marginTop: 3,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("dashboard")}
            style={{
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              padding: "13px 28px",
              borderRadius: "var(--r-full)",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "all var(--t)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--accent-dark)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--accent)")
            }
          >
            Go to dashboard
          </button>
          <button
            onClick={() => navigate("workshops")}
            style={{
              background: "var(--surface)",
              color: "var(--text-primary)",
              border: "1.5px solid var(--border)",
              padding: "13px 28px",
              borderRadius: "var(--r-full)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "all var(--t)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
          >
            Browse more workshops
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
