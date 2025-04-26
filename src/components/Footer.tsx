export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1a202c',
      color: 'white',
      padding: '2rem 0'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        <div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>Travel Vibes</h3>
          <p style={{ color: '#a0aec0' }}>Discover the beauty of Georgia with our expertly crafted tours and travel experiences.</p>
        </div>
        <div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>Quick Links</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
            <li><a href="/tours" style={{ color: '#a0aec0', textDecoration: 'none' }}>Tours</a></li>
            <li><a href="/things-to-do" style={{ color: '#a0aec0', textDecoration: 'none' }}>Things To Do</a></li>
            <li><a href="/contact" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>Contact Us</h3>
          <p style={{ color: '#a0aec0' }}>Email: info@travelvibes.com</p>
          <p style={{ color: '#a0aec0' }}>Phone: +995 555 123 456</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="#" style={{ color: '#a0aec0', fontSize: '1.25rem', textDecoration: 'none' }}>📱</a>
            <a href="#" style={{ color: '#a0aec0', fontSize: '1.25rem', textDecoration: 'none' }}>📸</a>
            <a href="#" style={{ color: '#a0aec0', fontSize: '1.25rem', textDecoration: 'none' }}>📘</a>
          </div>
        </div>
      </div>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2rem 1rem 0',
        marginTop: '2rem',
        borderTop: '1px solid #2d3748',
        textAlign: 'center',
        color: '#a0aec0'
      }}>
        <p>&copy; {new Date().getFullYear()} Travel Vibes. All rights reserved.</p>
      </div>
    </footer>
  );
}
