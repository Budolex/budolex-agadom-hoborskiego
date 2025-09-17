import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import unitsData from '@site/static/data/units.json';
import projectConfig from '@site/config/project.json';

import styles from './index.module.css';

function UnitCard({ unit }) {
  const statusLabels = {
    available: 'Dostępny',
    sold: 'Sprzedany',
    reserved: 'Zarezerwowany'
  };

  const statusClasses = {
    available: styles.statusAvailable,
    sold: styles.statusSold,
    reserved: styles.statusReserved
  };

  return (
    <div className={clsx(styles.unitCard, statusClasses[unit.status])}>
      <div className={styles.unitHeader}>
        <h3 className={styles.unitName}>{unit.name}</h3>
        <span className={clsx(styles.status, statusClasses[unit.status])}>
          {statusLabels[unit.status]}
        </span>
      </div>
      
      {unit.floorPlan && (
        <div className={styles.floorPlan}>
          <img 
            src={useBaseUrl(unit.floorPlan)} 
            alt={`Plan mieszkania ${unit.name}`}
            className={styles.floorPlanImage}
          />
        </div>
      )}
      
      <div className={styles.unitDetails}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Piętro:</span>
          <span className={styles.value}>{unit.floor}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Powierzchnia:</span>
          <span className={styles.value}>{unit.area} m²</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Pokoje:</span>
          <span className={styles.value}>{unit.rooms}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Cena za m²:</span>
          <span className={styles.value}>{unit.pricePerM2.toLocaleString('pl-PL')} {unit.currency}</span>
        </div>
        
        {/* Custom fields */}
        {unit.customFields && (
          <div className={styles.customFields}>
            {unit.customFields.balcony && (
              <div className={styles.detailRow}>
                <span className={styles.label}>Balkon:</span>
                <span className={styles.value}>
                  {unit.customFields.balconyArea ? `${unit.customFields.balconyArea} m²` : 'Tak'}
                </span>
              </div>
            )}
            {unit.customFields.storage && (
              <div className={styles.detailRow}>
                <span className={styles.label}>Komórka:</span>
                <span className={styles.value}>Tak</span>
              </div>
            )}
            {unit.customFields.parkingSpace && (
              <div className={styles.detailRow}>
                <span className={styles.label}>Miejsce parkingowe:</span>
                <span className={styles.value}>Tak</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className={styles.unitPrice}>
        {unit.status === 'available' ? (
          <>
            <div className={styles.price}>
              {unit.price.toLocaleString('pl-PL')} {unit.currency}
            </div>
            <div className={styles.vatInfo}>
              (cena zawiera {unit.vatRate}% VAT)
            </div>
          </>
        ) : (
          <div className={styles.unavailable}>
            {statusLabels[unit.status]}
          </div>
        )}
      </div>
      
      {unit.status === 'available' && (
        <div className={styles.unitActions}>
          <a 
            href={`#contact`}
            className="button button--primary"
          >
            Zapytaj o mieszkanie
          </a>
        </div>
      )}
    </div>
  );
}

export default function UnitsSection() {
  return (
    <section id="units" className={styles.unitsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Dostępne mieszkania
          </Heading>
          <p className={styles.sectionDescription}>
            Sprawdź naszą ofertę mieszkań w projekcie {projectConfig.project.name}
          </p>
        </div>
        
        <div className={styles.unitsGrid}>
          {unitsData.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
        
        <div className={styles.legalInfo}>
          <p>
            <small>
              * Wszystkie ceny są cenami netto powiększonymi o podatek VAT w wysokości {unitsData[0]?.vatRate || 23}%. 
              Deweloper zastrzega sobie prawo do zmiany cen. 
              Aktualny cennik dostępny w biurze sprzedaży.
            </small>
          </p>
          <p>
            <small>
              ** Wizualizacje i plany mieszkań mają charakter poglądowy i mogą ulegać modyfikacjom.
            </small>
          </p>
        </div>
      </div>
    </section>
  );
}
