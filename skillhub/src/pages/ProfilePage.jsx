import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const SettingRow = ({ label, desc, children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 0",
      borderBottom: "1px solid var(--border)",
      flexWrap: "wrap",
      gap: 12,
    }}
  >
    <div>
      <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{label}</p>
      {desc && (
        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{desc}</p>
      )}
    </div>
    {children}
  </div>
);

const Toggle = ({ on, onChange }) => (
  <button
    onClick={onChange}
    style={{
      width: 44,
      height: 24,
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      background: on ? "var(--accent)" : "var(--border)",
      position: "relative",
      transition: "background 0.3s ease",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 3,
        left: on ? 23 : 3,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "#fff",
        transition: "left 0.3s ease",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}
    />
  </button>
);

const ProfilePage = () => {
  const { user, logout, navigate, profileTab, setProfileTab } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    department: user?.department || "",
    year: user?.year || "",
    bio: "",
  });
  const [notifs, setNotifs] = useState({
    email: true,
    reminders: true,
    newWorkshops: false,
    newsletter: false,
  });
  const [saved, setSaved] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = [
    { key: "profile", label: "Profile" },
    { key: "notifications", label: "Notifications" },
    { key: "security", label: "Security" },
  ];

  const inputStyle = (disabled) => ({
    width: "100%",
    padding: "11px 14px",
    border: `1.5px solid ${disabled ? "var(--border)" : "var(--border-strong)"}`,
    borderRadius: "var(--r-md)",
    fontSize: 14,
    fontFamily: "var(--font-body)",
    color: disabled ? "var(--text-muted)" : "var(--text-primary)",
    background: disabled ? "var(--bg)" : "var(--surface)",
    outline: "none",
  });

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "32px 24px 64px",
        animation: "fadeUp 0.4s ease",
      }}
    >
      {/* Back */}
      <button
        onClick={() => navigate("dashboard")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          color: "var(--text-secondary)",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          marginBottom: 24,
          padding: 0,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M19 12H5M5 12l7 7M5 12l7-7" />
        </svg>
        Back to dashboard
      </button>

      {/* Profile header */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-2xl)",
          padding: "32px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 28,
              color: "#fff",
            }}
          >
            {user?.name?.charAt(0)}
          </div>
          <button
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 24,
              height: 24,
              background: "var(--surface)",
              border: "2px solid var(--bg)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 800,
              marginBottom: 4,
            }}
          >
            {user?.name}
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-secondary)",
              marginBottom: 8,
            }}
          >
            {user?.email}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span
              style={{
                background: "var(--accent-light)",
                color: "var(--accent)",
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: "var(--r-full)",
              }}
            >
              {user?.department}
            </span>
            <span
              style={{
                background: "var(--bg)",
                color: "var(--text-secondary)",
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: "var(--r-full)",
                border: "1px solid var(--border)",
              }}
            >
              {user?.year}
            </span>
          </div>
        </div>
        {saved && (
          <div
            style={{
              background: "#D1FAE5",
              color: "#065F46",
              padding: "8px 16px",
              borderRadius: "var(--r-full)",
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Saved!
          </div>
        )}
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "1.5px solid var(--border)",
          marginBottom: 24,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setProfileTab(t.key)}
            style={{
              background: "none",
              border: "none",
              padding: "12px 20px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              color:
                profileTab === t.key
                  ? "var(--accent)"
                  : "var(--text-secondary)",
              borderBottom: `2px solid ${profileTab === t.key ? "var(--accent)" : "transparent"}`,
              marginBottom: -1.5,
              transition: "all var(--t)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-2xl)",
          padding: "28px 32px",
        }}
      >
        {/* ===== PROFILE TAB ===== */}
        {profileTab === "profile" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Personal information
              </h3>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  style={{
                    background: "var(--accent-light)",
                    color: "var(--accent)",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "var(--r-full)",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Edit profile
                </button>
              ) : (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setEditing(false)}
                    style={{
                      background: "none",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                      padding: "8px 14px",
                      borderRadius: "var(--r-full)",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    style={{
                      background: "var(--accent)",
                      color: "#fff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "var(--r-full)",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Save changes
                  </button>
                </div>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              {[
                ["Full name", "name", "text"],
                ["Email address", "email", "email"],
              ].map(([label, k, t]) => (
                <div key={k}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={t}
                    value={form[k]}
                    onChange={set(k)}
                    disabled={!editing}
                    style={inputStyle(!editing)}
                    onFocus={(e) =>
                      editing &&
                      (e.currentTarget.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      editing &&
                      (e.currentTarget.style.borderColor =
                        "var(--border-strong)")
                    }
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              {[
                [
                  "Department",
                  "department",
                  [
                    "Computer Science & Engineering",
                    "Information Technology",
                    "Design",
                    "Business",
                    "Data Science",
                    "Other",
                  ],
                ],
                [
                  "Year of study",
                  "year",
                  [
                    "1st Year",
                    "2nd Year",
                    "3rd Year",
                    "4th Year",
                    "Postgrad",
                    "Other",
                  ],
                ],
              ].map(([label, k, opts]) => (
                <div key={k}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </label>
                  <select
                    value={form[k]}
                    onChange={set(k)}
                    disabled={!editing}
                    style={{
                      ...inputStyle(!editing),
                      cursor: editing ? "pointer" : "default",
                    }}
                  >
                    {opts.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  marginBottom: 6,
                }}
              >
                Short bio (optional)
              </label>
              <textarea
                value={form.bio}
                onChange={set("bio")}
                disabled={!editing}
                placeholder="Tell us a little about yourself..."
                rows={3}
                style={{
                  ...inputStyle(!editing),
                  resize: "vertical",
                  lineHeight: 1.6,
                }}
              />
            </div>
          </div>
        )}

        {/* ===== NOTIFICATIONS TAB ===== */}
        {profileTab === "notifications" && (
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              Notification preferences
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-secondary)",
                marginBottom: 20,
              }}
            >
              Choose what you'd like to hear from us.
            </p>
            {[
              {
                key: "email",
                label: "Email confirmations",
                desc: "Booking confirmations and receipts",
              },
              {
                key: "reminders",
                label: "Workshop reminders",
                desc: "24 hours before your booked session",
              },
              {
                key: "newWorkshops",
                label: "New workshops",
                desc: "When new workshops are added",
              },
              {
                key: "newsletter",
                label: "Weekly newsletter",
                desc: "Tips, highlights, and updates",
              },
            ].map(({ key, label, desc }) => (
              <SettingRow key={key} label={label} desc={desc}>
                <Toggle
                  on={notifs[key]}
                  onChange={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                />
              </SettingRow>
            ))}
          </div>
        )}

        {/* ===== SECURITY TAB ===== */}
        {profileTab === "security" && (
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              Security settings
            </h3>
            <SettingRow label="Change password" desc="Last changed: never">
              <button
                style={{
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "var(--r-full)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Update
              </button>
            </SettingRow>
            <SettingRow
              label="Two-factor authentication"
              desc="Add an extra layer of security"
            >
              <button
                style={{
                  background: "var(--bg)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border)",
                  padding: "8px 16px",
                  borderRadius: "var(--r-full)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Enable
              </button>
            </SettingRow>
            <SettingRow
              label="Active sessions"
              desc="1 session active right now"
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--error)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Sign out all
              </button>
            </SettingRow>
            <div
              style={{
                marginTop: 24,
                padding: "20px",
                background: "#FEE2E2",
                borderRadius: "var(--r-lg)",
                border: "1px solid #FECACA",
              }}
            >
              <h4
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#991B1B",
                  marginBottom: 6,
                }}
              >
                Danger zone
              </h4>
              <p style={{ fontSize: 13, color: "#B91C1C", marginBottom: 12 }}>
                Deleting your account is permanent and cannot be undone.
              </p>
              <button
                style={{
                  background: "var(--error)",
                  color: "#fff",
                  border: "none",
                  padding: "9px 18px",
                  borderRadius: "var(--r-full)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Delete my account
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        style={{
          marginTop: 20,
          background: "none",
          border: "1.5px solid var(--border)",
          color: "var(--text-secondary)",
          padding: "12px 24px",
          borderRadius: "var(--r-full)",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          width: "100%",
          transition: "all var(--t)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--error)";
          e.currentTarget.style.color = "var(--error)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = "var(--text-secondary)";
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
        Sign out
      </button>
    </div>
  );
};

export default ProfilePage;
