import { Link } from 'react-router-dom';
import { blogArticles } from '../data/blogArticles';

export default function Blog() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>
        Guides &amp; Articles
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Detailed guides on Indian government schemes
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {blogArticles.map((article) => (
          <Link
            key={article.slug}
            to={`/blog/${article.slug}`}
            style={{
              display: 'block',
              padding: '1.5rem',
              background: 'var(--color-background-primary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 'var(--border-radius-lg)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              padding: '3px 9px',
              borderRadius: '20px',
              background: 'var(--color-background-secondary)',
              color: 'var(--color-text-secondary)',
              textTransform: 'capitalize',
            }}>
              {article.category.replace('-', ' ')}
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: 500, margin: '10px 0 6px' }}>
              {article.title}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 8px', lineHeight: 1.6 }}>
              {article.excerpt}
            </p>
            <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
              {article.readTime}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
