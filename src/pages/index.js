import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSection from '@site/src/components/HeroSection';
import UnitsSection from '@site/src/components/UnitsSection';
import PricingTableSection from '@site/src/components/PricingTableSection';
import GallerySection from '@site/src/components/GallerySection';
import ContactSection from '@site/src/components/ContactSection';

import Heading from '@theme/Heading';
import styles from './index.module.css';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={siteConfig.tagline}>
      <HeroSection />
      <main>
        <PricingTableSection />
        <UnitsSection />
        <GallerySection />
        <ContactSection />
      </main>
    </Layout>
  );
}
