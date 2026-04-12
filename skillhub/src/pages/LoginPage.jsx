import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const LoginPage = () => {
  const { navigate, login } = useApp();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    const errs = {};
    if (!form.email.includes("@")) errs.email = "Enter a valid email address";
    if (!form.password) errs.password = "Password is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      const name = form.email.split("@")[0];
      login({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: form.email,
        department: "Computer Science",
        year: "3rd Year",
      });
      setLoading(false);
    }, 1000);
  };

  const Input = ({ label, type, placeholder, field, icon }) => (
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              display: "flex",
            }}
          >
            {icon}
          </div>
        )}
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={form[field]}
          onChange={set(field)}
          style={{
            width: "100%",
            padding: icon ? "12px 44px 12px 40px" : "12px 44px 12px 14px",
            border: `1.5px solid ${errors[field] ? "var(--error)" : "var(--border)"}`,
            borderRadius: "var(--r-md)",
            fontSize: 14,
            fontFamily: "var(--font-body)",
            color: "var(--text-primary)",
            background: "var(--surface)",
            outline: "none",
            transition: "all var(--t)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(108,99,255,0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = errors[field]
              ? "var(--error)"
              : "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        {field === "password" && (
          <button
            onClick={() => setShowPass(!showPass)}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {showPass ? (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>
      {errors[field] && (
        <p style={{ fontSize: 12, color: "var(--error)", marginTop: 4 }}>
          {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(135deg, var(--accent-light) 0%, var(--bg) 50%)",
          zIndex: -1,
        }}
      />

      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 36,
            animation: "fadeUp 0.4s ease",
          }}
        >
          <div
            onClick={() => navigate("home")}
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: "var(--accent)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                <path
                  d="M2 17l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              Skill<span style={{ color: "var(--accent)" }}>Hub</span>
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Welcome back 👋
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            Log in to your account to continue.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--surface)",
            borderRadius: "var(--r-2xl)",
            padding: "36px 32px",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-lg)",
            animation: "scaleIn 0.35s ease 0.1s both",
          }}
        >
          <Input
            label="Email address"
            type="email"
            placeholder="you@university.edu"
            field="email"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            }
          />
          <Input
            label="Password"
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            field="password"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            }
          />

          <div style={{ textAlign: "right", marginTop: -10, marginBottom: 20 }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "var(--accent)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "var(--accent-mid)" : "var(--accent)",
              color: "#fff",
              border: "none",
              padding: "14px",
              borderRadius: "var(--r-full)",
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "var(--font-body)",
              transition: "all var(--t)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onMouseEnter={(e) =>
              !loading &&
              (e.currentTarget.style.background = "var(--accent-dark)")
            }
            onMouseLeave={(e) =>
              !loading && (e.currentTarget.style.background = "var(--accent)")
            }
          >
            {loading ? (
              <>
                <span
                  style={{
                    width: 16,
                    height: 16,
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </button>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "24px 0",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              or continue with
            </span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          {/* Demo login */}
          <button
            onClick={() =>
              login({
                name: "Rahul Sharma",
                email: "rahul@university.edu",
                department: "Computer Science",
                year: "3rd Year",
              })
            }
            style={{
              width: "100%",
              background: "var(--accent-light)",
              color: "var(--accent)",
              border: "1.5px solid var(--accent)",
              padding: "13px",
              borderRadius: "var(--r-full)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "all var(--t)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#dddafe")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--accent-light)")
            }
          >
            ✨ Continue as demo student
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "var(--text-secondary)",
            marginTop: 24,
            animation: "fadeUp 0.4s ease 0.3s both",
          }}
        >
          New here?{" "}
          <button
            onClick={() => navigate("register")}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent)",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 14,
            }}
          >
            Create a free account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
