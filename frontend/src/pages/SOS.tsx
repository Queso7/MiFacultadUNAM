import React, { useState } from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import jsPDF from 'jspdf';

const SOS: React.FC = () => {
  const [emergencyType, setEmergencyType] = useState<string>('');
  const [formData, setFormData] = useState<any>(null);

  const handleGeneratePDF = (data: any) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Comprobante de Solicitud de Ayuda", 20, 20);

    doc.setFontSize(12);
    doc.text(`Número de Cuenta: ${data.numeroCuenta}`, 20, 40);
    doc.text(`Ubicación: ${data.ubicacion}`, 20, 50);
    doc.text(`Teléfono: ${data.telefono}`, 20, 60);
    doc.text(`Razón: ${data.emergencia}`, 20, 70);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 80);

    doc.text("Firma y/o Sello de la autoridad correspondiente:", 20, 100);
    doc.line(20, 105, 190, 105); // Línea para firma/sello

    doc.save("Comprobante_Solicitud_Ayuda.pdf");
  };

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message);
      setFormData(data);
      handleGeneratePDF(data); // PDF se genera tras guardar
    } catch (error) {
      alert("Error al enviar la solicitud");
      console.error(error);
    }
  };

  return (
    <main className="sos-page">
      <h2 className="text-center my-4">SOS - Emergencias</h2>
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={12} md={8}>
            <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded-4 border">
              <div className="mx-3">
                <label htmlFor="NC" className="form-label">Número de Cuenta</label>
                <input type="text" className="form-control" id="NC" required />
              </div>
              <div className="mx-3">
                <label htmlFor="Ubi" className="form-label">Ubicación</label>
                <input type="text" className="form-control" id="Ubi" required />
              </div>
              <div className="mx-3">
                <label htmlFor="Telefono" className="form-label">Teléfono</label>
                <input type="text" className="form-control" id="Telefono" required />
              </div>
              <div className="mx-3">
                <label className="form-label">Razón</label>
                <select value={emergencyType} onChange={(e) => setEmergencyType(e.target.value)} className="form-control" required>
                  <option value="">Selecciona el tipo de emergencia</option>
                  <option value="salud">Salud</option>
                  <option value="seguridad">Seguridad</option>
                  <option value="acoso">Acoso</option>
                </select>
              </div>
              <div className="mt-4 d-flex justify-content-center">
                <button type="submit" className="btn btn-danger w-100 py-3 fw-bold fs-5">
                  Pedir Ayuda
                </button>
              </div>
            </form>
          </Col>
          <Col xs={12} md={4} className="my-5 d-flex justify-content-center">
            <Image
              roundedCircle
              fluid
              src="https://go.dev/doc/gopher/fifteen.gif"
              alt="Imagen de emergencia"
              className="shadow-lg"
              style={{ maxWidth: '300px' }}
            />
          </Col>
        </Row>
        {formData && (
          <div className="my-5 p-4 rounded-4 border border-success shadow-lg">
            <h3 className="text-center">Constancia de Solicitud de Ayuda</h3>
            <p><strong>Número de Cuenta:</strong> {formData.numeroCuenta}</p>
            <p><strong>Ubicación:</strong> {formData.ubicacion}</p>
            <p><strong>Teléfono:</strong> {formData.telefono}</p>
            <p><strong>Razón:</strong> {formData.emergencia}</p>
            <p><strong>Fecha:</strong> {new Date().toLocaleString()}</p>
          </div>
        )}
      </Container>
    </main>
  );
};

export default SOS;
