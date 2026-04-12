import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  error,
}) => (
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
            alignItems: "center",
          }}
        >
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: icon ? "12px 14px 12px 40px" : "12px 14px",
          border: `1.5px solid ${error ? "var(--error)" : "var(--border)"}`,
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
          e.currentTarget.style.borderColor = error
            ? "var(--error)"
            : "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
    {error && (
      <p style={{ fontSize: 12, color: "var(--error)", marginTop: 4 }}>
        {error}
      </p>
    )}
  </div>
);

const RegisterPage = () => {
  const { navigate, login } = useApp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    department: "",
    year: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState(1);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate1 = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Your name is required";
    if (!form.email.includes("@")) errs.email = "Enter a valid email address";
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1 = () => {
    if (validate1()) setStep(2);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      login({
        name: form.name,
        email: form.email,
        department: form.department,
        year: form.year,
      });
      setLoading(false);
    }, 1200);
  };

  const eyeIcon = (
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
      {/* Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(135deg, var(--accent-light) 0%, var(--bg) 50%)",
          zIndex: -1,
        }}
      />

      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Logo */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 32,
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
              marginBottom: 8,
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
                color: "var(--text-primary)",
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
            Create your account
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            Join free. Explore workshops. Build real skills.
          </p>
        </div>

        {/* Progress */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 28,
            animation: "fadeUp 0.4s ease 0.1s both",
          }}
        >
          {[1, 2].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: s <= step ? "var(--accent)" : "var(--border)",
                transition: "background 0.4s ease",
              }}
            />
          ))}
        </div>
        <p
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            marginBottom: 20,
            textAlign: "right",
          }}
        >
          Step {step} of 2
        </p>

        {/* Card */}
        <div
          style={{
            background: "var(--surface)",
            borderRadius: "var(--r-2xl)",
            padding: "36px 32px",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-lg)",
            animation: "scaleIn 0.35s ease",
          }}
        >
          {step === 1 && (
            <div key="step1">
              <InputField
                label="Full name"
                placeholder="Rahul Sharma"
                value={form.name}
                onChange={set("name")}
                error={errors.name}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                }
              />
              <InputField
                label="Student email"
                type="email"
                placeholder="rahul@university.edu"
                value={form.email}
                onChange={set("email")}
                error={errors.email}
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
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={set("password")}
                    style={{
                      width: "100%",
                      padding: "12px 44px 12px 14px",
                      border: `1.5px solid ${errors.password ? "var(--error)" : "var(--border)"}`,
                      borderRadius: "var(--r-md)",
                      fontSize: 14,
                      fontFamily: "var(--font-body)",
                      color: "var(--text-primary)",
                      background: "var(--surface)",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(108,99,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.password
                        ? "var(--error)"
                        : "var(--border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
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
                    {eyeIcon}
                  </button>
                </div>
                {errors.password && (
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--error)",
                      marginTop: 4,
                    }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>
              <InputField
                label="Confirm password"
                type={showPass ? "text" : "password"}
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={set("confirm")}
                error={errors.confirm}
              />
              <button
                onClick={handleStep1}
                style={{
                  width: "100%",
                  background: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  padding: "14px",
                  borderRadius: "var(--r-full)",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all var(--t)",
                  marginTop: 8,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--accent-dark)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--accent)")
                }
              >
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div key="step2">
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Tell us about yourself
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  marginBottom: 24,
                }}
              >
                This helps us recommend the right workshops for you.
              </p>

              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  Department
                </label>
                <select
                  value={form.department}
                  onChange={set("department")}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "1.5px solid var(--border)",
                    borderRadius: "var(--r-md)",
                    fontSize: 14,
                    fontFamily: "var(--font-body)",
                    color: form.department
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                    background: "var(--surface)",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Select your department</option>
                  <option>Computer Science & Engineering</option>
                  <option>Information Technology</option>
                  <option>Design</option>
                  <option>Business & Management</option>
                  <option>Data Science & AI</option>
                  <option>Electronics & Communication</option>
                  <option>Other</option>
                </select>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  Year of study
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 8,
                  }}
                >
                  {[
                    "1st Year",
                    "2nd Year",
                    "3rd Year",
                    "4th Year",
                    "Postgrad",
                    "Other",
                  ].map((y) => (
                    <button
                      key={y}
                      onClick={() => setForm((f) => ({ ...f, year: y }))}
                      style={{
                        padding: "10px 8px",
                        borderRadius: "var(--r-md)",
                        fontSize: 12,
                        fontWeight: 600,
                        border: `1.5px solid ${form.year === y ? "var(--accent)" : "var(--border)"}`,
                        background:
                          form.year === y
                            ? "var(--accent-light)"
                            : "var(--surface)",
                        color:
                          form.year === y
                            ? "var(--accent)"
                            : "var(--text-secondary)",
                        cursor: "pointer",
                        transition: "all var(--t)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 0,
                    background: "var(--surface)",
                    color: "var(--text-secondary)",
                    border: "1.5px solid var(--border)",
                    padding: "14px 20px",
                    borderRadius: "var(--r-full)",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    flex: 1,
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
                      Creating account...
                    </>
                  ) : (
                    "Create account 🎉"
                  )}
                </button>
              </div>
            </div>
          )}
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
          Already have an account?{" "}
          <button
            onClick={() => navigate("login")}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent)",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 14,
            }}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
