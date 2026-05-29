export interface AlsoShippedItem {
  title: string;
  detail: string;
  company: string;
  tag: string;
}

export const ALSO_SHIPPED: AlsoShippedItem[] = [
  {
    title: 'PDF Field-Name Standardization Tool',
    detail:
      'Restored original field designations across ~3,000 PDFs converted with Foxit Editor, spanning 300 agency repositories, and streamlined the cleanup workflow.',
    company: 'Intuit',
    tag: 'Tooling',
  },
  {
    title: 'Java 21 & React 18 Upgrades',
    detail:
      'Completed Java 21 and React 18 upgrades for all owned services ahead of mandate deadlines, achieving full compliance on the internal production-readiness dashboard.',
    company: 'Intuit',
    tag: 'Operational Excellence',
  },
  {
    title: 'Solar Telemetry Collection & Dashboard (Internship)',
    detail:
      'Built a remote tracker data-collection automation over TCP/IP and a Node.js data-visualization dashboard deployed on AWS.',
    company: 'NEXTracker (NEXTPower), Inc',
    tag: 'Early Work',
  },
];
