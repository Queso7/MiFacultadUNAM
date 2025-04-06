import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
const SOS: React.FC = () => {
  const [emergencyType, setEmergencyType] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitud de ayuda enviada: ${emergencyType}`);
  };

  return (
    <main className="sos-page">
      <h2>SOS - Emergencias</h2>
      <form onSubmit={handleSubmit}>
        <select 
          value={emergencyType}
          onChange={(e) => setEmergencyType(e.target.value)}
          required
        >
          <option value="">Selecciona el tipo de emergencia</option>
          <option value="salud">Salud</option>
          <option value="seguridad">Seguridad</option>
          <option value="acoso">Acoso</option>
        </select>
        <button type="submit" className="emergency-btn">Pedir Ayuda</button>
      </form>


      <div>
        <h2>Yo esperando que diego implemente</h2>        
        <img src="https://miro.medium.com/v2/resize:fit:640/format:webp/0*qSD6Z697a5baxF8H.gif" />
      </div>
    </main>
  );
};

export default SOS;