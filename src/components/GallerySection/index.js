import React, { useState } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import projectConfig from '@site/config/project.json';

import styles from './index.module.css';

function Modal({ isOpen, onClose, imageSrc, imageAlt }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <img src={imageSrc} alt={imageAlt} className={styles.modalImage} />
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Pre-process gallery images with useBaseUrl at component level
  const galleryImages = projectConfig.project.gallery.map((image, index) => ({
    src: useBaseUrl(image),
    alt: `Galeria ${projectConfig.project.name} - ${index + 1}`,
    index
  }));

  const openModal = (imageSrc, imageAlt) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className={styles.gallerySection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Galeria
          </Heading>
          <p className={styles.sectionDescription}>
            Zobacz wizualizacje i zdjęcia projektu {projectConfig.project.name}
          </p>
        </div>
        
        <div className={styles.galleryGrid}>
          {galleryImages.map((image) => (
            <div 
              key={image.index} 
              className={styles.galleryItem}
              onClick={() => openModal(image.src, image.alt)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className={styles.galleryImage}
              />
              <div className={styles.galleryOverlay}>
                <span className={styles.zoomIcon}>🔍</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Modal 
        isOpen={modalOpen}
        onClose={closeModal}
        imageSrc={selectedImage?.src}
        imageAlt={selectedImage?.alt}
      />
    </section>
  );
}
