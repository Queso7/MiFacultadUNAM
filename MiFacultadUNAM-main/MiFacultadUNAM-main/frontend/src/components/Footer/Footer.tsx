const Footer = () => {
  return (
    <footer style={{
      marginTop: 'auto',
      color: 'white',
      padding: '20px 5%', // Padding lateral reducido en móviles
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
      fontSize: 'clamp(14px, 2vw, 16px)',
      position: 'relative',
      bottom: '0',
    }}>
      © 2025 Mi Facultad UNAM
    </footer>
  );
};
  
  export default Footer;