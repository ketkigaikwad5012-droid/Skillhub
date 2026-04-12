import React from "react";
import { useApp } from "../context/AppContext";
import { categoryColors, levelColors } from "../data/workshops";

const WorkshopCard = ({ workshop, variant = "default" }) => {
  const { navigate, setSelectedWorkshop } = useApp();
  const cat = categoryColors[workshop.color] || categoryColors.design;
  const lvl = levelColors[workshop.level] || levelColors["Beginner"];
  const seatsLeft = workshop.seats;
  const seatsPct = (seatsLeft / workshop.totalSeats) * 100;
  const urgent = seatsLeft <= 5;

  const handleView = () => {
    setSelectedWorkshop(workshop);
    navigate("workshopDetail");
  };

  return (
    <div
      onClick={handleView}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-xl)",
        padding: 24,
        cursor: "pointer",
        transition: "all var(--t)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = cat.dot;
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: cat.dot,
          borderRadius: "20px 20px 0 0",
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 14,
          marginTop: 4,
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span
            style={{
              background: cat.bg,
              color: cat.text,
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: "var(--r-full)",
              letterSpacing: "0.3px",
            }}
          >
            {workshop.category}
          </span>
          <span
            style={{
              background: lvl.bg,
              color: lvl.text,
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: "var(--r-full)",
            }}
          >
            {workshop.level}
          </span>
          {workshop.hot && (
            <span
              style={{
                background: "#FEE2E2",
                color: "#DC2626",
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: "var(--r-full)",
              }}
            >
              🔥 Hot
            </span>
          )}
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: urgent ? "#DC2626" : "var(--text-muted)",
            whiteSpace: "nowrap",
          }}
        >
          {seatsLeft} left
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 17,
          fontWeight: 700,
          marginBottom: 4,
          lineHeight: 1.3,
          fontFamily: "var(--font-display)",
        }}
      >
        {workshop.title}
      </h3>
      <p
        style={{
          fontSize: 13,
          color: "var(--text-secondary)",
          marginBottom: 12,
          fontStyle: "italic",
        }}
      >
        {workshop.subtitle}
      </p>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          marginBottom: 16,
        }}
      >
        {workshop.shortDesc}
      </p>

      {/* Tags */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}
      >
        {workshop.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "var(--bg)",
              color: "var(--text-secondary)",
              fontSize: 11,
              padding: "3px 9px",
              borderRadius: 6,
              border: "1px solid var(--border)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Seats bar */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            height: 4,
            background: "var(--border)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 2,
              background: urgent ? "#EF4444" : cat.dot,
              width: `${seatsPct}%`,
              transition: "width 0.5s ease",
            }}
          />
        </div>
        <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
          {workshop.totalSeats - seatsLeft} of {workshop.totalSeats} seats
          booked
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 14,
          borderTop: "1px solid var(--border)",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {workshop.date}
          </p>
          <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
            {workshop.time} · {workshop.location}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleView();
          }}
          style={{
            background: cat.dot,
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "var(--r-full)",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            transition: "all var(--t)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          View details →
        </button>
      </div>
    </div>
  );
};

export default WorkshopCard;
