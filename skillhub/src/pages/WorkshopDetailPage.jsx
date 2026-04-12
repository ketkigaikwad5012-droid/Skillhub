import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { categoryColors, levelColors } from "../data/workshops";

const WorkshopDetailPage = () => {
  const {
    selectedWorkshop: w,
    navigate,
    user,
    bookWorkshop,
    bookedWorkshops,
  } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  const [booking, setBooking] = useState(false);

  if (!w) {
    navigate("workshops");
    return null;
  }

  const cat = categoryColors[w.color] || categoryColors.design;
  const lvl = levelColors[w.level] || levelColors["Beginner"];
  const alreadyBooked = bookedWorkshops.some((b) => b.id === w.id);
  const seatsPct = (w.seats / w.totalSeats) * 100;

  const handleBook = () => {
    if (!user) {
      navigate("register");
      return;
    }
    setBooking(true);
    setTimeout(() => {
      bookWorkshop(w);
      setBooking(false);
    }, 1000);
  };

  const tabs = ["Overview", "What you'll learn", "Instructor", "Schedule"];

  return (
    <div
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "32px 24px 80px",
        animation: "fadeUp 0.4s ease",
      }}
    >
      {/* Back */}
      <button
        onClick={() => navigate("workshops")}
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
          marginBottom: 28,
          padding: 0,
          transition: "color var(--t)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--text-primary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--text-secondary)")
        }
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
        Back to workshops
      </button>

      {/* Hero banner */}
      <div
        style={{
          background: cat.bg,
          borderRadius: "var(--r-2xl)",
          padding: "40px 40px 36px",
          marginBottom: 28,
          position: "relative",
          overflow: "hidden",
          border: `1px solid ${cat.dot}30`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            background: `${cat.dot}12`,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: 100,
            width: 160,
            height: 160,
            background: `${cat.dot}08`,
            borderRadius: "50%",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: cat.dot,
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "var(--r-full)",
              }}
            >
              {w.category}
            </span>
            <span
              style={{
                background: lvl.bg,
                color: lvl.text,
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "var(--r-full)",
              }}
            >
              {w.level}
            </span>
            {w.hot && (
              <span
                style={{
                  background: "#FEE2E2",
                  color: "#DC2626",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: "var(--r-full)",
                }}
              >
                🔥 In high demand
              </span>
            )}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 4vw, 38px)",
              fontWeight: 800,
              color: cat.text,
              marginBottom: 8,
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            {w.title}
          </h1>
          <p
            style={{
              fontSize: 16,
              color: `${cat.text}99`,
              fontStyle: "italic",
              marginBottom: 16,
            }}
          >
            {w.subtitle}
          </p>
          <p
            style={{
              fontSize: 15,
              color: cat.text,
              lineHeight: 1.7,
              maxWidth: 600,
              opacity: 0.85,
            }}
          >
            {w.shortDesc}
          </p>
        </div>
      </div>

      {/* Meta grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12,
          marginBottom: 28,
        }}
      >
        {[
          { icon: "📅", label: "Date", value: w.date },
          { icon: "⏰", label: "Time", value: w.time },
          { icon: "⏱️", label: "Duration", value: w.duration },
          { icon: "📍", label: "Location", value: w.location },
        ].map(({ icon, label, value }) => (
          <div
            key={label}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "16px 18px",
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                marginBottom: 4,
              }}
            >
              {icon} {label}
            </p>
            <p style={{ fontSize: 13, fontWeight: 700 }}>{value}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 20,
          alignItems: "start",
        }}
      >
        <div>
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              borderBottom: "1.5px solid var(--border)",
              marginBottom: 28,
              overflowX: "auto",
              gap: 0,
            }}
          >
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "12px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  color:
                    activeTab === t ? "var(--accent)" : "var(--text-secondary)",
                  borderBottom: `2px solid ${activeTab === t ? "var(--accent)" : "transparent"}`,
                  marginBottom: -1.5,
                  whiteSpace: "nowrap",
                  transition: "all var(--t)",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Overview */}
          {activeTab === "Overview" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                {w.longDesc}
              </p>
              <div
                style={{
                  background: "var(--accent-light)",
                  borderRadius: "var(--r-lg)",
                  padding: "18px 20px",
                  borderLeft: `4px solid ${cat.dot}`,
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--accent)",
                    marginBottom: 6,
                  }}
                >
                  👋 Who is this for?
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  {w.whoFor}
                </p>
              </div>
              <div style={{ marginTop: 20 }}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    marginBottom: 10,
                  }}
                >
                  Tools you'll use:
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {w.tools.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "var(--surface)",
                        border: "1.5px solid var(--border)",
                        color: "var(--text-primary)",
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "5px 12px",
                        borderRadius: "var(--r-full)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* What you'll learn */}
          {activeTab === "What you'll learn" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  marginBottom: 20,
                  lineHeight: 1.6,
                }}
              >
                By the end of this workshop, you'll walk away with concrete
                skills — not just theory.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {w.whatYouLearn.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      padding: "16px 18px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r-lg)",
                      transition: "all var(--t)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = cat.dot;
                      e.currentTarget.style.background = cat.bg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background = "var(--surface)";
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: cat.bg,
                        border: `2px solid ${cat.dot}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={cat.dot}
                        strokeWidth="3"
                        strokeLinecap="round"
                      >
                        <path d="M5 12l5 5L19 7" />
                      </svg>
                    </div>
                    <p
                      style={{ fontSize: 14, lineHeight: 1.6, fontWeight: 500 }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructor */}
          {activeTab === "Instructor" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: cat.bg,
                    border: `3px solid ${cat.dot}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 26,
                    color: cat.dot,
                    flexShrink: 0,
                  }}
                >
                  {w.instructor.initials}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 20,
                      fontWeight: 800,
                    }}
                  >
                    {w.instructor.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      marginTop: 2,
                    }}
                  >
                    {w.instructor.role}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: cat.dot,
                      fontWeight: 600,
                      marginTop: 4,
                    }}
                  >
                    {w.instructor.company}
                  </p>
                </div>
              </div>
              <div
                style={{
                  background: "var(--bg)",
                  borderRadius: "var(--r-lg)",
                  padding: "20px",
                  border: "1px solid var(--border)",
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                  }}
                >
                  {w.instructor.name} brings real industry experience directly
                  to students. With a background at top companies, they focus on
                  teaching what actually matters in the real world — not just
                  textbook theory.
                </p>
              </div>
            </div>
          )}

          {/* Schedule */}
          {activeTab === "Schedule" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              {[
                {
                  time: "0:00 – 0:20",
                  title: "Introduction & context",
                  desc: "Why this skill matters. What you'll build today.",
                },
                {
                  time: "0:20 – 1:00",
                  title: "Core concepts hands-on",
                  desc: "Learning by doing. Instructor-led exercises with live feedback.",
                },
                {
                  time: "1:00 – 1:20",
                  title: "Break + Q&A",
                  desc: "Quick break. Open questions. Troubleshooting.",
                },
                {
                  time: "1:20 – 1:50",
                  title: "Build your own",
                  desc: "Guided project time. You build, we support.",
                },
                {
                  time: "1:50 – 2:00",
                  title: "Wrap up & next steps",
                  desc: "Share your work. Resources to continue learning.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    paddingBottom: 20,
                    marginBottom: 20,
                    borderBottom: i < 4 ? "1px dashed var(--border)" : "none",
                  }}
                >
                  <div style={{ minWidth: 90 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: cat.dot,
                        background: cat.bg,
                        padding: "3px 8px",
                        borderRadius: 6,
                      }}
                    >
                      {item.time}
                    </span>
                  </div>
                  <div>
                    <p
                      style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}
                    >
                      {item.title}
                    </p>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking sidebar */}
        <div
          style={{ width: 240, flexShrink: 0, display: "none" }}
          className="sidebar-hidden"
        />
      </div>

      {/* Sticky book bar (mobile-friendly at bottom) */}
      <div
        style={{
          marginTop: 40,
          background: "var(--surface)",
          border: "1.5px solid var(--border)",
          borderRadius: "var(--r-2xl)",
          padding: "24px 28px",
          position: "sticky",
          bottom: 20,
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* Seats */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>
              Seats remaining
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: w.seats <= 5 ? "var(--error)" : "var(--text-primary)",
              }}
            >
              {w.seats} of {w.totalSeats}
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: "var(--border)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${seatsPct}%`,
                background: w.seats <= 5 ? "var(--error)" : cat.dot,
                borderRadius: 3,
                transition: "width 1s ease",
              }}
            />
          </div>
          {w.seats <= 5 && (
            <p
              style={{
                fontSize: 12,
                color: "var(--error)",
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              ⚡ Almost full — book before it's gone!
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              Free
            </p>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
              No registration fee
            </p>
          </div>
          <button
            onClick={handleBook}
            disabled={booking || alreadyBooked}
            style={{
              flex: 1,
              minWidth: 160,
              background: alreadyBooked
                ? "#D1FAE5"
                : booking
                  ? "var(--accent-mid)"
                  : "var(--accent)",
              color: alreadyBooked ? "#065F46" : "#fff",
              border: alreadyBooked ? "1.5px solid #6EE7B7" : "none",
              padding: "14px 24px",
              borderRadius: "var(--r-full)",
              fontSize: 15,
              fontWeight: 700,
              cursor: alreadyBooked ? "default" : "pointer",
              fontFamily: "var(--font-body)",
              transition: "all var(--t)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onMouseEnter={(e) =>
              !alreadyBooked &&
              !booking &&
              (e.currentTarget.style.background = "var(--accent-dark)")
            }
            onMouseLeave={(e) =>
              !alreadyBooked &&
              !booking &&
              (e.currentTarget.style.background = "var(--accent)")
            }
          >
            {booking ? (
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
                Booking...
              </>
            ) : alreadyBooked ? (
              <>✓ You're booked!</>
            ) : (
              <>Book your seat →</>
            )}
          </button>
        </div>
        {!user && (
          <p
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              textAlign: "center",
              marginTop: 12,
            }}
          >
            You'll be asked to log in or create a free account.
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkshopDetailPage;
