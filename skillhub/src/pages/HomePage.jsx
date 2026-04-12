import React from 'react';
import { useApp } from '../context/AppContext';
import { workshops } from '../data/workshops';
import WorkshopCard from '../components/WorkshopCard';

const StatCard = ({ number, label, icon }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 'var(--r-xl)', padding: '24px 20px', textAlign: 'center',
    flex: 1, minWidth: 0,
  }}>
    <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
      {number}
    </div>
    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{label}</div>
  </div>
);

const WhyCard = ({ icon, title, desc }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 'var(--r-xl)', padding: 24,
    transition: 'all var(--t)',
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    <div style={{
      width: 44, height: 44, background: 'var(--accent-light)',
      borderRadius: 12, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: 20, marginBottom: 14,
    }}>
      {icon}
    </div>
    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</h4>
    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{desc}</p>
  </div>
);

const HomePage = () => {
  const { navigate, user } = useApp();
  const featured = workshops.filter(w => w.featured).slice(0, 3);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section style={{
        padding: '80px 24px 64px',
        maxWidth: 1100, margin: '0 auto',
        position: 'relative',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: 40, right: 80,
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
          display: window.innerWidth < 768 ? 'none' : 'block',
        }} />

        <div style={{ maxWidth: 720, animation: 'fadeUp 0.6s ease forwards' }}>
          {/* Eyebrow pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--accent-light)', borderRadius: 'var(--r-full)',
            padding: '6px 14px', marginBottom: 24,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
              Spring 2025 · 12 workshops open
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(38px, 6vw, 68px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            marginBottom: 24,
          }}>
            Workshops that build{' '}
            <span style={{
              color: 'var(--accent)',
              position: 'relative',
              display: 'inline-block',
            }}>
              real skills.
              <svg style={{ position: 'absolute', bottom: -6, left: 0, width: '100%' }} height="6" viewBox="0 0 200 6">
                <path d="M0 5 Q50 0 100 5 Q150 10 200 5" stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </span>
          </h1>

          <p style={{
            fontSize: 18, color: 'var(--text-secondary)',
            lineHeight: 1.7, marginBottom: 36, maxWidth: 520,
          }}>
            Hands-on sessions designed for students who want to <em>do</em>, not just learn.
            Show up, build something, leave with a skill you can actually use.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('workshops')} style={{
              background: 'var(--accent)', color: '#fff', border: 'none',
              padding: '14px 28px', borderRadius: 'var(--r-full)',
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-body)', transition: 'all var(--t)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-dark)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(108,99,255,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Browse workshops
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            {!user && (
              <button onClick={() => navigate('register')} style={{
                background: 'var(--surface)', color: 'var(--text-primary)',
                border: '1.5px solid var(--border)', padding: '14px 28px',
                borderRadius: 'var(--r-full)', fontSize: 15, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all var(--t)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              >
                Create free account
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{ padding: '0 24px 64px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <StatCard number="12+" label="Workshops this season" icon="🎯" />
          <StatCard number="Free" label="Always free to attend" icon="✨" />
          <StatCard number="2hrs" label="Average session length" icon="⏱️" />
          <StatCard number="500+" label="Students enrolled" icon="🎓" />
        </div>
      </section>

      {/* ===== WHY SECTION ===== */}
      <section style={{ padding: '0 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>
            Why SkillHub?
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Learning that actually sticks.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
            Not slides. Not lectures. Workshops where you build something real in under 3 hours.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          <WhyCard icon="🛠️" title="Learn by doing" desc="Forget passive listening. Every session is hands-on. You leave with a working output, not just notes." />
          <WhyCard icon="🏆" title="CV-worthy skills" desc="Skills employers actually ask for — not theoretical, not textbook. Real tools, real projects." />
          <WhyCard icon="👥" title="Small groups" desc="Max 20 students. Real attention, real feedback, real collaboration with people like you." />
          <WhyCard icon="⚡" title="Fast results" desc="A 2-3 hour session. One focused outcome. You leave with something you can show immediately." />
        </div>
      </section>

      {/* ===== FEATURED WORKSHOPS ===== */}
      <section style={{ padding: '0 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>
              Featured this week
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.3px' }}>
              Don't miss these.
            </h2>
          </div>
          <button onClick={() => navigate('workshops')} style={{
            background: 'none', border: '1.5px solid var(--border)', color: 'var(--text-primary)',
            padding: '10px 20px', borderRadius: 'var(--r-full)', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all var(--t)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          >
            View all workshops →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {featured.map(w => <WorkshopCard key={w.id} workshop={w} />)}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      {!user && (
        <section style={{ padding: '0 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            background: 'var(--accent)', borderRadius: 'var(--r-2xl)',
            padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -40, right: -40, width: 200, height: 200,
              background: 'rgba(255,255,255,0.06)', borderRadius: '50%',
            }} />
            <div style={{
              position: 'absolute', bottom: -60, left: -20, width: 250, height: 250,
              background: 'rgba(255,255,255,0.04)', borderRadius: '50%',
            }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.5px' }}>
              Ready to learn something new?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
              Join hundreds of students who've built real skills through SkillHub workshops. It's free.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('register')} style={{
                background: '#fff', color: 'var(--accent)', border: 'none',
                padding: '14px 28px', borderRadius: 'var(--r-full)',
                fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)',
                transition: 'all var(--t)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Create free account
              </button>
              <button onClick={() => navigate('workshops')} style={{
                background: 'transparent', color: '#fff',
                border: '2px solid rgba(255,255,255,0.4)', padding: '14px 28px',
                borderRadius: 'var(--r-full)', fontSize: 15, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all var(--t)',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
              >
                Explore workshops
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
              Skill<span style={{ color: 'var(--accent)' }}>Hub</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Build real skills. Learn by doing.</p>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Workshops', 'About', 'Contact', 'FAQ'].map(l => (
              <span key={l} style={{ fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>© 2025 SkillHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;