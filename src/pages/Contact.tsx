export default function Contact() {
  return (
    <main style={{
      maxWidth: '42rem',
      margin: '0 auto',
      padding: '4rem 1rem',
    }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        marginBottom: '2rem', 
        color: '#e11d48'
      }}>Contact Us</h2>
      <form style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <input className="border border-gray-300 rounded px-4 py-2" placeholder="Your Name" required />
        <input className="border border-gray-300 rounded px-4 py-2" placeholder="Your Email" type="email" required />
        <select className="border border-gray-300 rounded px-4 py-2" required>
          <option>General Inquiry</option>
          <option>Booking</option>
          <option>Partnership</option>
        </select>
        <textarea className="border border-gray-300 rounded px-4 py-2" placeholder="Your Message" rows={4} required />
        <button className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-dark transition">Send Message</button>
      </form>
    </main>
  );
}
