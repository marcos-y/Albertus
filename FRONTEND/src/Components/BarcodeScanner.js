import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

function BarcodeScanner() {

  const navigate = useNavigate();

  const handleRedirect = (url) => {
    // window.location.href = url; // Cambia la URL según tu necesidad
    navigate(url)
  };

  const [result, setResult] = useState('Apuntá al código de barras...');
  const scannerRef = useRef(null);

  // Agregá estos estados
  const [zoom, setZoom] = useState(1);


  useEffect(() => {
    const config = {
      fps: 30,
      qrbox: { width: 320, height: 140 },   // ancho y bajo → ideal para códigos de barras
      aspectRatio: 1.8,
      supportedScanTypes: [0, 1],  // 0=QR, 1=Barcode
      formatsToSupport: [
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.CODE_93,
        Html5QrcodeSupportedFormats.ITF,
      ],
      useBarCodeDetectorIfSupported: false,  // evita la API nativa mala
    };

    scannerRef.current = new Html5QrcodeScanner("reader", config, false);

    scannerRef.current.render(
      (decodedText) => {
        setResult(decodedText);
        new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3").play().catch(() => { });
        navigator.vibrate?.(200);
        scannerRef.current.pause();
        setTimeout(() => scannerRef.current.resume(), 2000);
      },
      (error) => {
        // Silencioso
      }
    );

    return () => scannerRef.current?.clear();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <button onClick={() => handleRedirect('/pedidos')} type="button" class="btn btn-primary" style={{ marginLeft: '10px', marginTop: '5px' }}>
        <a onClick={() => handleRedirect('/pedidos')} style={{ textDecoration: 'none', color: 'white' }}>Volver</a></button>

      <h3>Escaneá el producto</h3>
      <div id="reader" style={{ width: '100%', maxWidth: 500, margin: '0 auto' }}></div>

      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 15 }}>
        <button onClick={() => setZoom(z => Math.max(1, z - 0.3))} style={{ padding: '10px 20px', fontSize: '1.2em' }}>−</button>
        <span style={{ fontSize: '1.2em', padding: '0 20px' }}>{(zoom.toFixed(1))}×</span>
        <button onClick={() => setZoom(z => Math.min(4, z + 0.3))} style={{ padding: '10px 20px', fontSize: '1.2em' }}>+</button>
      </div>
      <p style={{ marginTop: 20, fontSize: '1.4em', fontWeight: 'bold' }}>
        {result}
      </p>
    </div>
  );
}

export default BarcodeScanner;