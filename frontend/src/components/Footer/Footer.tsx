const Footer = () => {
  return (
    <footer style={{
      marginTop: 'auto',
      backgroundColor: '#f8f9fa',
      padding: '20px 5%', // Padding lateral reducido en móviles
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
      fontSize: 'clamp(14px, 2vw, 16px)', // Texto adaptable
      position: 'relative',
      bottom: '0',
    }}>
      © 2025 Mi Facultad UNAM
    </footer>
  );
};
  
  export default Footer;