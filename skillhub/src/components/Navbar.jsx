import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const { navigate, user, logout, currentPage } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "sticky",
    top: 0,
    zIndex: 200,
    background: scrolled ? "rgba(247,246,243,0.95)" : "transparent",
    backdropFilter: scrolled ? "blur(16px)" : "none",
    borderBottom: scrolled
      ? "1px solid var(--border)"
      : "1px solid transparent",
    transition: "all 0.3s ease",
  };

  const links = user
    ? [
        { label: "Workshops", page: "workshops" },
        { label: "Dashboard", page: "dashboard" },
      ]
    : [
        { label: "Workshops", page: "workshops" },
        { label: "About", page: "home" },
      ];

  return (
    <nav style={navStyle}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("home")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "var(--accent)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.9" />
              <path
                d="M2 17l10 5 10-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M2 12l10 5 10-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 20,
              color: "var(--text-primary)",
            }}
          >
            Skill<span style={{ color: "var(--accent)" }}>Hub</span>
          </span>
        </div>

        {/* Desktop links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 32 }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => navigate(l.page)}
              style={{
                background: "none",
                border: "none",
                fontSize: 14,
                fontWeight: 500,
                color:
                  currentPage === l.page
                    ? "var(--accent)"
                    : "var(--text-secondary)",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                transition: "color var(--t)",
                padding: "4px 0",
                borderBottom:
                  currentPage === l.page
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {user ? (
            <>
              <button
                onClick={() => navigate("profile")}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  border: "none",
                  color: "#fff",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform var(--t-spring)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("login")}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Log in
              </button>
              <button
                onClick={() => navigate("register")}
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  padding: "9px 20px",
                  borderRadius: "var(--r-full)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all var(--t)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent-dark)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Sign up free
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
