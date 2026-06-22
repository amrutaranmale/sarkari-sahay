import { useParams, Link } from 'react-router-dom';
import { blogArticles } from '../data/blogArticles';

const categoryConfig = {
  agriculture: { color: '#2D7A3A', bg: '#E8F5EA' },
  health: { color: '#1565C0', bg: '#E3F0FC' },
  education: { color: '#6A1B9A', bg: '#F3E5F5' },
  housing: { color: '#BF360C', bg: '#FBE9E7' },
  'women-child': { color: '#AD1457', bg: '#FCE4EC' },
  women: { color: '#AD1457', bg: '#FCE4EC' },
  finance: { color: '#E65100', bg: '#FFF3E0' },
  default: { color: '#37474F', bg: '#ECEFF1' },
};

function getCategoryConfig(category) {
  return categoryConfig[category?.toLowerCase()] || categoryConfig.default;
}

function renderContent(content) {
  const blocks = content.split(/\n\n+/);

  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // H2 heading
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} style={{
          fontSize: '20px',
          fontWeight: 600,
          margin: '32px 0 10px',
          color: 'var(--color-text-primary)',
          borderBottom: '1px solid var(--color-border-tertiary)',
          paddingBottom: '6px',
        }}>
          {trimmed.replace('## ', '')}
        </h2>
      );
    }

    // Unordered list
    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
      return (
        <ul key={i} style={{ margin: '10px 0 16px', paddingLeft: '22px' }}>
          {items.map((line, j) => (
            <li key={j} style={{ marginBottom: '6px', fontSize: '15px', lineHeight: 1.7, color: 'var(--color-text-primary)' }}>
              {line.replace(/^- /, '')}
            </li>
          ))}
        </ul>
      );
    }

    // Ordered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split('\n').filter(l => /^\d+\.\s/.test(l.trim()));
      return (
        <ol key={i} style={{ margin: '10px 0 16px', paddingLeft: '22px' }}>
          {items.map((line, j) => (
            <li key={j} style={{ marginBottom: '6px', fontSize: '15px', lineHeight: 1.7, color: 'var(--color-text-primary)' }}>
              {line.replace(/^\d+\.\s/, '')}
            </li>
          ))}
        </ol>
      );
    }

    // Normal paragraph
    return (
      <p key={i} style={{
        fontSize: '15px',
        lineHeight: 1.8,
        color: 'var(--color-text-primary)',
        marginBottom: '16px',
      }}>
        {trimmed}
      </p>
    );
  });
}

export default function BlogDetail() {
  const { slug } = useParams();
  const article = blogArticles.find((a) => a.slug === slug);
  const cat = getCategoryConfig(article?.category);

  if (!article) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <p>Article not found.</p>
        <Link to="/blog">← Back to all articles</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Back link */}
      <Link to="/blog" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
        ← Back to all articles
      </Link>

      {/* Category Badge */}
      <div style={{ margin: '16px 0 10px' }}>
        <span style={{
          display: 'inline-block',
          fontSize: '11px',
          fontWeight: 600,
          padding: '3px 10px',
          borderRadius: '20px',
          background: cat.bg,
          color: cat.color,
          textTransform: 'capitalize',
          letterSpacing: '0.3px',
        }}>
          {article.category.replace(/-/g, ' ')}
        </span>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: '26px', fontWeight: 700, margin: '0 0 8px', lineHeight: 1.3, color: 'var(--color-text-primary)' }}>
        {article.title}
      </h1>

      {/* Read time */}
      <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', marginBottom: '2rem' }}>
        ⏱ {article.readTime}
      </p>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-tertiary)', marginBottom: '2rem' }} />

      {/* Article Content */}
      <div>
        {renderContent(article.content)}
      </div>

      {/* CTA Box */}
      <div style={{
        marginTop: '2.5rem',
        padding: '1.5rem',
        background: cat.bg,
        borderRadius: 'var(--border-radius-lg)',
        textAlign: 'center',
        border: `1px solid ${cat.color}30`,
      }}>
        <p style={{ fontSize: '15px', margin: '0 0 12px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
          Check which government schemes you're eligible for
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '10px 22px',
            background: '#FF6B35',
            color: 'white',
            borderRadius: 'var(--border-radius-md)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          Check Eligibility →
        </Link>
      </div>
    </div>
  );
}