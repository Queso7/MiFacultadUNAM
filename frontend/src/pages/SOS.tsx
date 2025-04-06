import React, { useState } from 'react';

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
    </main>
  );
};

export default SOS;