import React, { useState } from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';

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
      <h2 className='text-center my-4'>SOS - Emergencias</h2>

      <Container fluid>
        <Row className="align-items-center">
          <Col xs={12} md={8}>
            <div className='shadow-sm' style={{ borderRadius: 5 }}>
              <form onSubmit={handleSubmit} className="emergency-form shadow-lg p-4 rounded-4 border">
                <div className="NUM mx-3">
                  <label htmlFor="NC" className="form-label">Número de Cuenta</label>
                  <input
                    type="text"
                    className="form-control"
                    id="NC"
                    placeholder="Número de cuenta"
                    required
                  />
                </div>

                <div className="Ubic mx-3">
                  <label htmlFor="Ubi" className="form-label">Ubicación</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Ubi"
                    placeholder="¿Dónde necesita la ayuda?"
                    required
                  />
                </div>

                <div className="Telefono mx-3">
                  <label htmlFor="Telefono" className="form-label">Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Telefono"
                    placeholder="Tu número de contacto"
                    required
                  />
                </div>

                <div className="Razon mx-3">
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
                  <button type="submit" className="btn btn-danger w-100 py-3 fw-bold fs-5 d-flex align-items-center justify-content-center">Pedir Ayuda</button>
                </div>
              </form>
            </div>
          </Col>
          <Col xs={12} md={4} className="my-5 d-flex justify-content-center">
            <div style={{ maxWidth: '300px', width: '100%' }}>
              <Image
                roundedCircle
                fluid
                src='https://go.dev/doc/gopher/fifteen.gif'
                className="img-fluid shadow-lg"
                style={{ width: '100%', height: 'auto' }}
                alt="Imagen de emergencia"
              />
            </div>
          </Col>
        </Row>
        <div className='my-5 p-4 rounded-4 border border-danger border-3 bg-danger bg-opacity-10 d-flex align-items-center justify-content-center shadow-lg'>
          <div className='text-center'>
            <p className='m-0 fs-5 fw-bold text-danger d-flex align-items-center justify-content-center'>
              <i className="bi bi-exclamation-octagon-fill me-3 fs-3"></i>
              RECUERDA QUE CUALQUIER TIPO DE ABUSO SERÁ SANCIONADO SEGUN EL REGLAMENTO INSTITUCIONAL.
            </p>
            <div className='mt-3'>
              <a
                href='https://cinig.ib.unam.mx/ProtocoloAtencionCasosViolenciaDeGeneroUNAM.pdf'
                className='btn btn-outline-danger fw-bold d-inline-flex align-items-center'
                target='_blank'
                rel='noopener noreferrer' >
                <i className="bi bi-file-earmark-pdf-fill me-2"></i>
                PROTOCOLO PARA LA ATENCIÓN DE CASOS DE VIOLENCIA DE GÉNERO EN LA UNAM
              </a>
            </div>
            <div className='mt-3'>
              <a
                href='https://www.defensoria.unam.mx/web/documentos/protocolo-atencion-integral-de-violencia-por-razones-de-genero.pdf'
                className='btn btn-outline-danger fw-bold d-inline-flex align-items-center'
                target='_blank'
                rel='noopener noreferrer' >
                <i className="bi bi-file-earmark-pdf-fill me-2"></i>
                PROTOCOLO PARA LA ATENCIÓN INTEGRAL DE CASOS DE VIOLENCIA POR RAZONES DE GÉNERO EN LA UNIVERSIDAD NACIONAL AUTÓNOMA DE MÉXICO
              </a>
            </div>
            <div className='mt-3'>
              <a
                href='https://www.acatlan.unam.mx/CLSyP/Protocolos.html'
                className='btn btn-outline-danger fw-bold d-inline-flex align-items-center'
                target='_blank'
                rel='noopener noreferrer' >
                <i className="bi bi-file-earmark-pdf-fill me-2"></i>
                PROTOCOLOS FES ACATLAN
              </a>
            </div>
          </div>
        </div>
      </Container>

    </main>
  );
};

export default SOS;
