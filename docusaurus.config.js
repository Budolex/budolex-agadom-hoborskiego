// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
const projectConfig = require('./config/project.json');

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: projectConfig.site.title,
  tagline: projectConfig.project.subtitle,
  favicon: projectConfig.site.favicon,

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: projectConfig.site.url,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: projectConfig.site.baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'real-estate-developer', // Usually your GitHub org/user name.
  projectName: 'real-estate-template', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false, // Disable docs for one-page site
        blog: false, // Disable blog for one-page site
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: projectConfig.project.heroImage,
      navbar: {
        title: projectConfig.site.title,
        logo: {
          alt: projectConfig.developer.name + ' Logo',
          src: projectConfig.developer.logo,
        },
        items: [
          {
            href: '#pricing-table',
            label: 'Cennik',
            position: 'left',
          },
          {
            href: '#units',
            label: 'Mieszkania',
            position: 'left',
          },
          {
            href: '#gallery',
            label: 'Galeria',
            position: 'left',
          },
          {
            href: '#contact',
            label: 'Kontakt',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Kontakt',
            items: [
              {
                label: 'Telefon: ' + projectConfig.developer.phone,
                href: 'tel:' + projectConfig.developer.phone,
              },
              {
                label: 'Email: ' + projectConfig.developer.email,
                href: 'mailto:' + projectConfig.developer.email,
              },
            ],
          },
          {
            title: 'Informacje',
            items: [
              {
                label: 'Prospekt informacyjny',
                href: projectConfig.openData.prospectusUrl,
              },
              {
                label: 'Dane otwarte',
                to: '/dataset.xml',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ${projectConfig.developer.name}. NIP: ${projectConfig.developer.nip}`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
