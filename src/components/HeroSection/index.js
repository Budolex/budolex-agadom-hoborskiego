import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import projectConfig from '@site/config/project.json';

import styles from './index.module.css';

export default function HeroSection() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div 
        className={styles.heroBackground}
        style={{
          backgroundImage: `url(${useBaseUrl(projectConfig.project.heroImage)})`
        }}
      >
        <div className={styles.heroOverlay}>
          <div className="container">
            <div className={styles.heroContent}>
              <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
                {projectConfig.project.name}
              </Heading>
              <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
                {projectConfig.project.subtitle}
              </p>
              <div className={styles.heroDescription}>
                <p>{projectConfig.project.description}</p>
                <p className={styles.location}>
                  <strong>📍 {projectConfig.project.location}</strong>
                </p>
              </div>
              <div className={styles.buttons}>
                <a
                  className="button button--secondary button--lg"
                  href="#pricing-table">
                  Zobacz cennik
                </a>
                <a
                  className="button button--outline button--secondary button--lg"
                  href="#contact">
                  Kontakt
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
