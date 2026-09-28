interface ShopPageProps {
    params: Promise<{ slug?: string[] }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
    const { slug = [] } = await params;
    const [category = 'Все категории', brand = 'Все бренды', model = 'Все модели'] = slug;

    return (
        <div style={{
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#1a1a1a'
            }}>
                🛒 Магазин
            </h1>

            <div style={{
                background: '#f8f9fa',
                borderRadius: '12px',
                padding: '1.5rem 2rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'grid',
                gap: '0.75rem'
            }}>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>
                    <strong style={{ color: '#2c3e50' }}>Категория:</strong>
                    <span style={{ marginLeft: '0.5rem', color: '#34495e' }}>{category}</span>
                </p>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>
                    <strong style={{ color: '#2c3e50' }}>Бренд:</strong>
                    <span style={{ marginLeft: '0.5rem', color: '#34495e' }}>{brand}</span>
                </p>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>
                    <strong style={{ color: '#2c3e50' }}>Модель:</strong>
                    <span style={{ marginLeft: '0.5rem', color: '#34495e' }}>{model}</span>
                </p>
            </div>

            <p style={{
                marginTop: '1.5rem',
                color: '#7f8c8d',
                fontSize: '0.95rem',
                borderTop: '1px solid #ecf0f1',
                paddingTop: '1rem'
            }}>
                Полный путь: <code style={{ background: '#ecf0f1', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                    {slug.join(' / ') || '—'}
                </code>
            </p>
        </div>
    );
}