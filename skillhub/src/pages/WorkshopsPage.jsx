import React, { useState } from "react";
import { workshops } from "../data/workshops";
import WorkshopCard from "../components/WorkshopCard";

const CATEGORIES = ["All", "Design", "Tech", "Data", "Career", "Creative"];
const LEVELS = ["All levels", "Beginner", "Intermediate"];

const WorkshopsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All levels");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");

  const filtered = workshops
    .filter((w) => activeCategory === "All" || w.category === activeCategory)
    .filter((w) => activeLevel === "All levels" || w.level === activeLevel)
    .filter(
      (w) =>
        !search ||
        w.title.toLowerCase().includes(search.toLowerCase()) ||
        w.shortDesc.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => (sort === "seats" ? a.seats - b.seats : a.id - b.id));

  const chipStyle = (active) => ({
    padding: "8px 16px",
    borderRadius: "var(--r-full)",
    fontSize: 13,
    fontWeight: 600,
    border: `1.5px solid ${active ? "var(--accent)" : "var(--border)"}`,
    background: active ? "var(--accent-light)" : "var(--surface)",
    color: active ? "var(--accent)" : "var(--text-secondary)",
    cursor: "pointer",
    transition: "all var(--t)",
    fontFamily: "var(--font-body)",
    whiteSpace: "nowrap",
  });

  return (
    <div
      style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40, animation: "fadeUp 0.5s ease" }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--accent)",
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          All workshops
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.8px",
            marginBottom: 12,
          }}
        >
          Find your next skill.
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--text-secondary)",
            maxWidth: 480,
          }}
        >
          {workshops.length} workshops available this season. All free. All
          hands-on.
        </p>
      </div>

      {/* Search + Sort */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 24,
          flexWrap: "wrap",
          animation: "fadeUp 0.5s ease 0.1s both",
        }}
      >
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search workshops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px 12px 42px",
              border: "1.5px solid var(--border)",
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
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(108,99,255,0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "12px 16px",
            border: "1.5px solid var(--border)",
            borderRadius: "var(--r-md)",
            fontSize: 14,
            fontFamily: "var(--font-body)",
            color: "var(--text-primary)",
            background: "var(--surface)",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="date">Sort: Soonest</option>
          <option value="seats">Sort: Seats available</option>
        </select>
      </div>

      {/* Category filters */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 4,
          marginBottom: 16,
          animation: "fadeUp 0.5s ease 0.15s both",
        }}
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            style={chipStyle(activeCategory === c)}
            onClick={() => setActiveCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Level filters */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 32,
          animation: "fadeUp 0.5s ease 0.2s both",
        }}
      >
        {LEVELS.map((l) => (
          <button
            key={l}
            style={{
              ...chipStyle(activeLevel === l),
              fontSize: 12,
              padding: "6px 14px",
            }}
            onClick={() => setActiveLevel(l)}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p
        style={{
          fontSize: 13,
          color: "var(--text-muted)",
          marginBottom: 20,
          fontWeight: 500,
        }}
      >
        {filtered.length} workshop{filtered.length !== 1 ? "s" : ""} found
        {activeCategory !== "All" && ` in ${activeCategory}`}
        {search && ` matching "${search}"`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Nothing found
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-secondary)",
              marginBottom: 20,
            }}
          >
            Try a different search or filter.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
              setActiveLevel("All levels");
            }}
            style={{
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "var(--r-full)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
            animation: "fadeIn 0.4s ease",
          }}
        >
          {filtered.map((w) => (
            <WorkshopCard key={w.id} workshop={w} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkshopsPage;
