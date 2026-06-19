import { useParams, Link } from 'react-router-dom';
import { blogArticles } from '../data/blogArticles';

export default function BlogDetail() {
  const { slug } = useParams();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <p>Article not found.</p>
        <Link to="/blog">← Back to all articles</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Link to="/blog" style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
        ← Back to all articles
      </Link>

      <span style={{
        display: 'inline-block',
        fontSize: '11px',
        fontWeight: 500,
        padding: '3px 9px',
        borderRadius: '20px',
        background: 'var(--color-background-secondary)',
        color: 'var(--color-text-secondary)',
        textTransform: 'capitalize',
        margin: '16px 0 8px',
      }}>
        {article.category.replace('-', ' ')}
      </span>

      <h1 style={{ fontSize: '26px', fontWeight: 600, margin: '0 0 8px', lineHeight: 1.3 }}>
        {article.title}
      </h1>
      <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', marginBottom: '2rem' }}>
        {article.readTime}
      </p>

      <div style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--color-text-primary)' }}>
        {article.content.split('\n\n').map((para, i) => {
          if (para.startsWith('## ')) {
            return (
              <h2 key={i} style={{ fontSize: '19px', fontWeight: 500, margin: '28px 0 12px' }}>
                {para.replace('## ', '')}
              </h2>
            );
          }
          if (para.startsWith('- ')) {
            return (
              <ul key={i} style={{ margin: '12px 0', paddingLeft: '20px' }}>
                {para.split('\n').map((line, j) => (
                  <li key={j} style={{ marginBottom: '6px' }}>{line.replace('- ', '')}</li>
                ))}
              </ul>
            );
          }
          if (/^\d+\.\s/.test(para)) {
            return (
              <ol key={i} style={{ margin: '12px 0', paddingLeft: '20px' }}>
                {para.split('\n').map((line, j) => (
                  <li key={j} style={{ marginBottom: '6px' }}>{line.replace(/^\d+\.\s/, '')}</li>
                ))}
              </ol>
            );
          }
          return (
            <p key={i} style={{ marginBottom: '16px' }}>
              {para}
            </p>
          );
        })}
      </div>

      <div style={{
        marginTop: '2.5rem',
        padding: '1.25rem',
        background: 'var(--color-background-secondary)',
        borderRadius: 'var(--border-radius-lg)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '14px', margin: '0 0 12px' }}>
          Check which schemes you're eligible for
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#FF6B35',
            color: 'white',
            borderRadius: 'var(--border-radius-md)',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '14px',
          }}
        >
          Check Eligibility →
        </Link>
      </div>
    </div>
  );
}
