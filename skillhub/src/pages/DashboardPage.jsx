import React from "react";
import { useApp } from "../context/AppContext";
import { workshops, categoryColors } from "../data/workshops";
import WorkshopCard from "../components/WorkshopCard";

const StatTile = ({ label, value, icon, color, bg }) => (
  <div
    style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-xl)",
      padding: "20px 22px",
      display: "flex",
      alignItems: "center",
      gap: 16,
      flex: 1,
      minWidth: 0,
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 14,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div>
      <p
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          fontWeight: 500,
          marginBottom: 4,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 24,
          fontWeight: 700,
          color: color || "var(--text-primary)",
          lineHeight: 1.3,
          letterSpacing: "0.6px",
        }}
      >
        {value}
      </p>
    </div>
  </div>
);

const ProgressBar = ({ label, value, max, color }) => (
  <div style={{ marginBottom: 14 }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
        {value}/{max}
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
          width: `${(value / max) * 100}%`,
          background: color,
          borderRadius: 3,
          transition: "width 1s ease",
        }}
      />
    </div>
  </div>
);

const DashboardPage = () => {
  const { user, navigate, bookedWorkshops } = useApp();
  const upcoming = workshops.slice(0, 3);
  const categories = ["Design", "Tech", "Data"];
  const completedCount = bookedWorkshops.length;

  return (
    <div
      style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 64px" }}
    >
      {/* Welcome */}
      <div style={{ marginBottom: 32, animation: "fadeUp 0.5s ease" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 22,
              color: "#fff",
            }}
          >
            {user?.name?.charAt(0)}
          </div>
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 4vw, 32px)",
                fontWeight: 600,
                letterSpacing: "0.8px",
                lineHeight: 1.4,
              }}
            >
              Hey, {user?.name?.split(" ")[0]} 👋
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
              {user?.department} · {user?.year}
            </p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={() => navigate("profile")}
              style={{
                background: "var(--surface)",
                border: "1.5px solid var(--border)",
                padding: "10px 18px",
                borderRadius: "var(--r-full)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)",
                transition: "all var(--t)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Edit profile
            </button>
          </div>
        </div>
      </div>

      {/* ===== OVERVIEW CARD ===== */}
      <div
        style={{
          background: "var(--accent)",
          borderRadius: "var(--r-2xl)",
          padding: "32px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
          animation: "fadeUp 0.5s ease 0.1s both",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 160,
            height: 160,
            background: "rgba(255,255,255,0.07)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -50,
            right: 80,
            width: 200,
            height: 200,
            background: "rgba(255,255,255,0.04)",
            borderRadius: "50%",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Your learning overview
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 3vw, 30px)",
              fontWeight: 600,
              color: "#fff",
              marginBottom: 24,
              letterSpacing: "1.2px",
              lineHeight: 1.5,
              wordSpacing: "0.1em",
            }}
          >
            {completedCount === 0
              ? "You haven't booked a workshop yet."
              : `You've booked ${completedCount} workshop${completedCount > 1 ? "s" : ""}. Keep going! 🚀`}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 16,
            }}
          >
            {[
              { label: "Booked", value: completedCount, icon: "📅" },
              {
                label: "Hours learning",
                value: `${completedCount * 2}h`,
                icon: "⏱️",
              },
              { label: "Skills added", value: completedCount * 2, icon: "⚡" },
              {
                label: "Sessions left",
                value: `${6 - completedCount}`,
                icon: "🎯",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "var(--r-lg)",
                  padding: "16px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 8 }}>{stat.icon}</div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 26,
                    fontWeight: 600,
                    color: "#fff",
                    lineHeight: 1.4,
                    letterSpacing: "0.8px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.65)",
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {completedCount === 0 && (
            <button
              onClick={() => navigate("workshops")}
              style={{
                marginTop: 24,
                background: "#fff",
                color: "var(--accent)",
                border: "none",
                padding: "12px 24px",
                borderRadius: "var(--r-full)",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                transition: "all var(--t)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              Browse workshops →
            </button>
          )}
        </div>
      </div>

      {/* STATS ROW */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 24,
          flexWrap: "wrap",
          animation: "fadeUp 0.5s ease 0.2s both",
        }}
      >
        <StatTile
          label="Workshops booked"
          value={completedCount}
          icon="📅"
          color="var(--accent)"
          bg="var(--accent-light)"
        />
        <StatTile
          label="Available now"
          value={workshops.length}
          icon="🔓"
          color="#10B981"
          bg="#D1FAE5"
        />
        <StatTile
          label="Categories explored"
          value={Math.min(completedCount, categories.length)}
          icon="🗂️"
          color="#F59E0B"
          bg="#FEF3C7"
        />
      </div>

      {/* PROGRESS + BOOKED */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginBottom: 32,
          animation: "fadeUp 0.5s ease 0.3s both",
        }}
      >
        {/* Learning progress */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-xl)",
            padding: 24,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Learning progress
          </h3>
          <ProgressBar
            label="Workshops completed"
            value={completedCount}
            max={6}
            color="var(--accent)"
          />
          <ProgressBar
            label="Design track"
            value={Math.min(completedCount, 2)}
            max={2}
            color="#6C63FF"
          />
          <ProgressBar label="Tech track" value={0} max={2} color="#0EA5E9" />
          <ProgressBar label="Data track" value={0} max={2} color="#F59E0B" />
          <div
            style={{
              marginTop: 20,
              padding: "12px 16px",
              background: "var(--accent-light)",
              borderRadius: "var(--r-md)",
            }}
          >
            <p
              style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600 }}
            >
              💡 Complete 3 more workshops to earn your first certificate!
            </p>
          </div>
        </div>

        {/* My bookings */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-xl)",
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              My bookings
            </h3>
            {bookedWorkshops.length > 0 && (
              <span
                style={{
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: "var(--r-full)",
                }}
              >
                {bookedWorkshops.length} booked
              </span>
            )}
          </div>

          {bookedWorkshops.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  marginBottom: 16,
                }}
              >
                No bookings yet. Explore workshops to get started.
              </p>
              <button
                onClick={() => navigate("workshops")}
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "var(--r-full)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Explore workshops →
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {bookedWorkshops.map((w) => {
                const cat = categoryColors[w.color] || categoryColors.design;
                return (
                  <div
                    key={w.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      background: "var(--bg)",
                      borderRadius: "var(--r-md)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: cat.dot,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {w.title}
                      </p>
                      <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        {w.date}
                      </p>
                    </div>
                    <span
                      style={{
                        background: "#D1FAE5",
                        color: "#065F46",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "var(--r-full)",
                        flexShrink: 0,
                      }}
                    >
                      Confirmed
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* UPCOMING WORKSHOPS */}
      <div style={{ animation: "fadeUp 0.5s ease 0.4s both" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            Book your next workshop
          </h2>
          <button
            onClick={() => navigate("workshops")}
            style={{
              background: "none",
              border: "1.5px solid var(--border)",
              color: "var(--text-secondary)",
              padding: "8px 16px",
              borderRadius: "var(--r-full)",
              fontSize: 12,
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
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            See all →
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {upcoming.map((w) => (
            <WorkshopCard key={w.id} workshop={w} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
