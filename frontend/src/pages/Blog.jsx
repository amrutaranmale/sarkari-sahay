import { Link } from 'react-router-dom';
import { blogArticles } from '../data/blogArticles';

const categoryConfig = {
  agriculture: { color: '#2D7A3A', bg: '#E8F5EA', emoji: '🌾' },
  health: { color: '#1565C0', bg: '#E3F0FC', emoji: '🏥' },
  education: { color: '#6A1B9A', bg: '#F3E5F5', emoji: '📚' },
  housing: { color: '#BF360C', bg: '#FBE9E7', emoji: '🏠' },
  women: { color: '#AD1457', bg: '#FCE4EC', emoji: '👩' },
  'womenchild': { color: '#AD1457', bg: '#FCE4EC', emoji: '👩‍👧' },
  finance: { color: '#E65100', bg: '#FFF3E0', emoji: '💰' },
  default: { color: '#37474F', bg: '#ECEFF1', emoji: '📋' },
};

function getCategoryConfig(category) {
  const key = category?.toLowerCase().replace(/\s+/g, '');
  return categoryConfig[key] || categoryConfig.default;
}

export default function Blog() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
          Guides &amp; Articles
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
          Detailed guides on Indian government schemes — eligibility, benefits &amp; how to apply
        </p>
      </div>

      {/* Article Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {blogArticles.map((article) => {
          const cat = getCategoryConfig(article.category);
          return (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="blog-card"
              style={{
                display: 'flex',
                gap: '1.25rem',
                padding: '1.25rem 1.5rem',
                background: 'var(--color-background-primary)',
                border: '1px solid var(--color-border-tertiary)',
                borderRadius: 'var(--border-radius-lg)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'box-shadow 0.18s ease, transform 0.18s ease, border-color 0.18s ease',
                alignItems: 'flex-start',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.09)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = cat.color + '55';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border-tertiary)';
              }}
            >
              {/* Category Emoji Icon */}
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: cat.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0,
                marginTop: '2px',
              }}>
                {cat.emoji}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Category Badge */}
                <span style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background: cat.bg,
                  color: cat.color,
                  textTransform: 'capitalize',
                  marginBottom: '6px',
                  letterSpacing: '0.3px',
                }}>
                  {article.category.replace(/-/g, ' ')}
                </span>

                {/* Title */}
                <h2 style={{
                  fontSize: '17px',
                  fontWeight: 600,
                  margin: '0 0 5px',
                  lineHeight: 1.35,
                  color: 'var(--color-text-primary)',
                }}>
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p style={{
                  fontSize: '13.5px',
                  color: 'var(--color-text-secondary)',
                  margin: '0 0 10px',
                  lineHeight: 1.55,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {article.excerpt}
                </p>

                {/* Footer Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontSize: '12px',
                    color: 'var(--color-text-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    ⏱ {article.readTime}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: cat.color,
                    fontWeight: 500,
                  }}>
                    Read article →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}