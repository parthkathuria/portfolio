import {
  siGo, siPython, siTypescript, siJavascript, siNodedotjs, siGnubash,
  siC, siCplusplus, siReact, siDjango, siExpress, siSpring, siDocker,
  siJenkins, siArgo, siGit, siPostgresql, siInfluxdb, siMysql, siRedis,
  siClaude, siCursor,
} from 'simple-icons';

// Authentic brand logos not in simple-icons (raw multicolor SVG markup).
import javaSvg from 'devicon/icons/java/java-original.svg?raw';
import csharpSvg from 'devicon/icons/csharp/csharp-original.svg?raw';
import vscodeSvg from 'devicon/icons/vscode/vscode-original.svg?raw';
import azureSvg from 'devicon/icons/azure/azure-original.svg?raw';
import awsSvg from 'devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg?raw';

// Generic database glyph (currentColor) for SQL Server.
const dbSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>`;

export interface Skill {
  /** Display name shown under the icon. */
  name: string;
  /** simple-icons SVG path data (24x24 viewBox), when a brand icon exists there. */
  path?: string;
  /** Raw inline SVG markup (for brand logos not in simple-icons). */
  svg?: string;
  /** Short monogram used when there is no icon at all. */
  mono?: string;
}

export interface SkillGroupData {
  label: string;
  items: Skill[];
}

const ic = (icon: { path: string }, name: string): Skill => ({ name, path: icon.path });
const raw = (svg: string, name: string): Skill => ({ name, svg });
const mono = (name: string, label: string): Skill => ({ name, mono: label });

export const SKILLS: SkillGroupData[] = [
  {
    label: 'Languages',
    items: [
      raw(javaSvg, 'Java'),
      ic(siGo, 'Go'),
      ic(siPython, 'Python'),
      ic(siTypescript, 'TypeScript'),
      ic(siJavascript, 'JavaScript'),
      ic(siNodedotjs, 'Node.js'),
      ic(siC, 'C'),
      ic(siCplusplus, 'C++'),
      raw(csharpSvg, 'C#'),
      ic(siGnubash, 'Bash'),
    ],
  },
  {
    label: 'AI & Tooling',
    items: [
      mono('Model Context Protocol', 'MCP'),
      mono('Language Server Protocol', 'LSP'),
      raw(vscodeSvg, 'VS Code Extensions'),
      ic(siClaude, 'Claude'),
      ic(siCursor, 'Cursor'),
      mono('GPT Codex', 'GPT'),
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      raw(awsSvg, 'AWS'),
      raw(azureSvg, 'Azure'),
      ic(siDocker, 'Docker'),
      mono('GraalVM', 'GV'),
      ic(siJenkins, 'Jenkins'),
      ic(siArgo, 'ArgoCD'),
      ic(siGit, 'Git'),
    ],
  },
  {
    label: 'Data',
    items: [
      ic(siPostgresql, 'PostgreSQL'),
      ic(siInfluxdb, 'InfluxDB'),
      ic(siMysql, 'MySQL'),
      raw(dbSvg, 'SQL Server'),
      ic(siRedis, 'Redis'),
    ],
  },
  {
    label: 'Frameworks',
    items: [
      ic(siSpring, 'Spring'),
      ic(siReact, 'React'),
      ic(siDjango, 'Django'),
      ic(siExpress, 'Express'),
    ],
  },
];
