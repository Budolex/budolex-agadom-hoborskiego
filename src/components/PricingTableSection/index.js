import React, { useState } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import unitsData from '@site/static/data/units.json';
import projectConfig from '@site/config/project.json';

import styles from './index.module.css';

export default function PricingTableSection() {
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const statusLabels = {
    available: 'Dostępne',
    sold: 'Sprzedane',
    reserved: 'Zarezerwowane'
  };

  const statusClasses = {
    available: styles.statusAvailable,
    sold: styles.statusSold,
    reserved: styles.statusReserved
  };

  const sortedUnits = [...unitsData].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '⬆️' : '⬇️';
  };

  const today = new Date().toLocaleDateString('pl-PL');

  return (
    <section id="pricing-table" className={styles.pricingTableSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Cennik mieszkań
          </Heading>
          <div className={styles.lastUpdate}>
            Data ostatniej aktualizacji: {today}
          </div>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table className={styles.pricingTable}>
              <thead>
                <tr>
                  <th 
                    className={styles.sortable}
                    onClick={() => handleSort('id')}
                  >
                    Nr Lokalu {getSortIcon('id')}
                  </th>
                  <th 
                    className={styles.sortable}
                    onClick={() => handleSort('area')}
                  >
                    Pow. użytkowa<br/>(m²) {getSortIcon('area')}
                  </th>
                  <th 
                    className={styles.sortable}
                    onClick={() => handleSort('totalArea')}
                  >
                    Pow. całkowita<br/>(m²) {getSortIcon('totalArea')}
                  </th>
                  <th 
                    className={styles.sortable}
                    onClick={() => handleSort('pricePerM2')}
                  >
                    Cena za m² pow. użytkowej brutto<br/>(pln) {getSortIcon('pricePerM2')}
                  </th>
                  <th 
                    className={styles.sortable}
                    onClick={() => handleSort('price')}
                  >
                    Cena całkowita brutto<br/>(pln) {getSortIcon('price')}
                  </th>
                  <th>
                    Pomieszczenie<br/>przynależne
                  </th>
                  <th 
                    className={styles.sortable}
                    onClick={() => handleSort('status')}
                  >
                    Status {getSortIcon('status')}
                  </th>
                  <th>
                    Rzut<br/>kondygnacji
                  </th>
                  <th>
                    Standard<br/>wykończenia
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUnits.map((unit) => (
                  <tr key={unit.id} className={clsx(styles.unitRow, statusClasses[unit.status])}>
                    <td className={styles.unitId}>
                      <strong>{unit.id}</strong>
                    </td>
                    <td className={styles.area}>
                      {unit.area}
                    </td>
                    <td className={styles.totalArea}>
                      {unit.totalArea || unit.area}
                    </td>
                    <td className={styles.pricePerM2}>
                      {unit.pricePerM2.toLocaleString('pl-PL', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                    <td className={styles.totalPrice}>
                      {unit.status === 'available' ? (
                        <strong>
                          {unit.price.toLocaleString('pl-PL')}
                        </strong>
                      ) : (
                        <span className={styles.unavailablePrice}>
                          {unit.price.toLocaleString('pl-PL')}
                        </span>
                      )}
                    </td>
                    <td className={styles.belongingRoom}>
                      {unit.belongingRoom || '-'}
                    </td>
                    <td className={clsx(styles.status, statusClasses[unit.status])}>
                      <span className={styles.statusBadge}>
                        {statusLabels[unit.status]}
                      </span>
                    </td>
                    <td className={styles.floorPlan}>
                      {unit.floorPlan ? (
                        <a 
                          href={unit.floorPlan} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.floorPlanLink}
                        >
                          Otwórz
                        </a>
                      ) : (
                        'Otwórz'
                      )}
                    </td>
                    <td className={styles.standard}>
                      {unit.standard || 'Otwórz'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.tableFooter}>
          <div className={styles.legend}>
            <h4>Legenda statusów:</h4>
            <div className={styles.legendItems}>
              <span className={clsx(styles.legendItem, styles.statusAvailable)}>
                <span className={styles.legendColor}></span>
                Dostępne
              </span>
              <span className={clsx(styles.legendItem, styles.statusReserved)}>
                <span className={styles.legendColor}></span>
                Zarezerwowane
              </span>
              <span className={clsx(styles.legendItem, styles.statusSold)}>
                <span className={styles.legendColor}></span>
                Sprzedane
              </span>
            </div>
          </div>
          
          <div className={styles.additionalInfo}>
            <p>
              <small>
                * Wszystkie ceny zawierają VAT w wysokości {unitsData[0]?.vatRate || 8}%. 
                Deweloper zastrzega sobie prawo do zmiany cen.
              </small>
            </p>
            <p>
              <small>
                ** Powierzchnie podane w tabeli mają charakter orientacyjny i mogą ulegać nieznacznym zmianom.
              </small>
            </p>
            <p>
              <small>
                *** Wizualizacje i rzuty mieszkań mają charakter poglądowy.
              </small>
            </p>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <a 
            href="#contact" 
            className="button button--primary button--lg"
          >
            Zapytaj o mieszkanie
          </a>
          <a 
            href={projectConfig.openData.prospectusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--secondary button--lg"
          >
            Prospekt informacyjny
          </a>
        </div>
      </div>
    </section>
  );
}
