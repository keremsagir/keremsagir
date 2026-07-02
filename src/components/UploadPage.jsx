import { useState, useRef } from 'react';
import { parseCvFile } from '../services/cvParser.js';
import './UploadPage.css';

function UploadPage({ onCvParsed, isLoading, setIsLoading }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx'].includes(ext)) {
      setError('Sadece PDF ve DOCX dosyaları desteklenir.');
      return;
    }

    setError('');
    setFileName(file.name);
    setIsLoading(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      const data = await parseCvFile(file);
      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        onCvParsed(data);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      clearInterval(progressInterval);
      setError(err.message || 'CV parse edilirken bir hata oluştu.');
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  return (
    <div className="upload-page">
      <div className="upload-content">
        <div className="upload-header">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">CV<span className="gradient-text">Folio</span></span>
          </div>
          <h1 className="upload-title">
            CV'nizi Yükleyin,<br />
            <span className="gradient-text">Portfolyonuz Hazır.</span>
          </h1>
          <p className="upload-subtitle">
            PDF veya DOCX formatındaki CV'nizi sürükleyip bırakın.
            Saniyeler içinde modern bir portfolyo web sitesi oluşturalım.
          </p>
        </div>

        <div
          className={`upload-dropzone ${isDragOver ? 'drag-over' : ''} ${isLoading ? 'uploading' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          id="cv-upload-dropzone"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleInputChange}
            style={{ display: 'none' }}
            id="cv-file-input"
          />

          {isLoading ? (
            <div className="upload-progress-container">
              <div className="upload-file-icon">
                {fileName.endsWith('.pdf') ? (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="8" y="4" width="32" height="40" rx="4" fill="#FF4444" fillOpacity="0.15" stroke="#FF4444" strokeWidth="2"/>
                    <text x="24" y="30" textAnchor="middle" fill="#FF4444" fontSize="10" fontWeight="bold">PDF</text>
                  </svg>
                ) : (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="8" y="4" width="32" height="40" rx="4" fill="#2B7CD3" fillOpacity="0.15" stroke="#2B7CD3" strokeWidth="2"/>
                    <text x="24" y="30" textAnchor="middle" fill="#2B7CD3" fontSize="8" fontWeight="bold">DOCX</text>
                  </svg>
                )}
              </div>
              <p className="upload-file-name">{fileName}</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="progress-text">Analiz ediliyor... %{Math.round(progress)}</p>
            </div>
          ) : (
            <>
              <div className="dropzone-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" stroke="url(#grad1)" strokeWidth="2" strokeDasharray="8 4" opacity="0.6"/>
                  <path d="M32 20V44M32 20L22 30M32 20L42 30" stroke="url(#grad1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="64" y2="64">
                      <stop stopColor="#6c63ff"/>
                      <stop offset="1" stopColor="#00d4aa"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="dropzone-text">
                <span className="gradient-text">Dosya seçmek için tıklayın</span> veya sürükleyip bırakın
              </p>
              <p className="dropzone-hint">PDF, DOCX • Maks 10MB</p>
              <div className="dropzone-formats">
                <span className="format-badge pdf">PDF</span>
                <span className="format-badge docx">DOCX</span>
              </div>
            </>
          )}
        </div>

        {error && (
          <div className="upload-error" id="upload-error">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div className="upload-features">
          <div className="feature glass-card">
            <span className="feature-icon">🔒</span>
            <span className="feature-text">Güvenli — Verileriniz tarayıcınızda kalır</span>
          </div>
          <div className="feature glass-card">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Hızlı — Saniyeler içinde portfolyonuz hazır</span>
          </div>
          <div className="feature glass-card">
            <span className="feature-icon">🎨</span>
            <span className="feature-text">Premium — Modern ve şık tasarım</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
