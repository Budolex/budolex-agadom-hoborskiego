import React, { useState } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import projectConfig from '@site/config/project.json';

import styles from './index.module.css';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    unit: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission is handled by Netlify when deployed
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Kontakt
          </Heading>
          <p className={styles.sectionDescription}>
            Skontaktuj się z nami w sprawie mieszkań w projekcie {projectConfig.project.name}
          </p>
        </div>
        
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <h3 className={styles.contactInfoTitle}>Informacje kontaktowe</h3>
            
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📞</div>
              <div>
                <div className={styles.contactLabel}>Telefon</div>
                <a href={`tel:${projectConfig.developer.phone}`} className={styles.contactValue}>
                  {projectConfig.developer.phone}
                </a>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>✉️</div>
              <div>
                <div className={styles.contactLabel}>Email</div>
                <a href={`mailto:${projectConfig.developer.email}`} className={styles.contactValue}>
                  {projectConfig.developer.email}
                </a>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>🏢</div>
              <div>
                <div className={styles.contactLabel}>Adres</div>
                <div className={styles.contactValue}>
                  {projectConfig.developer.address}
                </div>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>🌐</div>
              <div>
                <div className={styles.contactLabel}>Strona internetowa</div>
                <a 
                  href={projectConfig.developer.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.contactValue}
                >
                  {projectConfig.developer.website}
                </a>
              </div>
            </div>
            
            <div className={styles.legalInfo}>
              <h4>Dane prawne</h4>
              <p><strong>NIP:</strong> {projectConfig.developer.nip}</p>
              <p><strong>REGON:</strong> {projectConfig.developer.regon}</p>
              <p><strong>KRS:</strong> {projectConfig.developer.krs}</p>
            </div>
          </div>
          
          {projectConfig.contact.showForm && (
            <div className={styles.contactForm}>
              <h3 className={styles.formTitle}>Wyślij zapytanie</h3>
              
              <form 
                name={projectConfig.contact.formName}
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className={styles.form}
              >
                <input type="hidden" name="form-name" value={projectConfig.contact.formName} />
                <input type="hidden" name="bot-field" />
                
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="unit" className={styles.label}>
                    Interesujące mieszkanie
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="">Wybierz mieszkanie</option>
                    <option value="any">Dowolne dostępne</option>
                    <option value="A">Lokal A</option>
                    <option value="B">Lokal B</option>
                    <option value="C">Lokal C</option>
                    <option value="D">Lokal D</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={styles.textarea}
                    placeholder="Opisz swoje pytania lub uwagi..."
                  />
                </div>
                
                <button type="submit" className={clsx('button', 'button--primary', 'button--lg', styles.submitButton)}>
                  Wyślij zapytanie
                </button>
                
                <p className={styles.formNote}>
                  * Pola wymagane. Twoje dane będą przetwarzane zgodnie z RODO.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
