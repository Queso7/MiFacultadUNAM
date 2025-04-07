import React, { useState } from 'react';

const SOS: React.FC = () => {
  const [emergencyType, setEmergencyType] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      numeroCuenta: (document.getElementById("NC") as HTMLInputElement).value,
      ubicacion: (document.getElementById("Ubi") as HTMLInputElement).value,
      telefono: (document.getElementById("Telefono") as HTMLInputElement).value,
      emergencia: emergencyType,
    };

    try {
      const response = await fetch("http://localhost:5000/api/sos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      alert("Error al enviar la solicitud");
      console.error(error);
    }
  };

  return (
    <main className="sos-page">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>SOS - Emergencias</h2>

      <form onSubmit={handleSubmit} className="container">

        <div className="NUM">
          <label htmlFor="NC" className="form-label">Número de Cuenta</label>
          <input
            type="text"
            className="form-control"
            id="NC"
            placeholder="Número de cuenta"
            required
          />
        </div>

        <div className="Ubic">
          <label htmlFor="Ubi" className="form-label">Ubicación</label>
          <input
            type="text"
            className="form-control"
            id="Ubi"
            placeholder="¿Dónde necesita la ayuda?"
            required
          />
        </div>

        <div className="Telefono">
          <label htmlFor="Telefono" className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="Telefono"
            placeholder="Tu número de contacto"
            required
          />
        </div>

        <div className="Razon">
          <label className="form-label">Razón</label>
          <select
            value={emergencyType}
            onChange={(e) => setEmergencyType(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Selecciona el tipo de emergencia</option>
            <option value="salud">Salud</option>
            <option value="seguridad">Seguridad</option>
            <option value="acoso">Acoso</option>
          </select>
        </div>

        <div className="button" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <button type="submit" className="emergency-btn">Pedir Ayuda</button>
        </div>

      </form>
    </main>
  );
};

export default SOS;
