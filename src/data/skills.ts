import {
  siGo, siPython, siTypescript, siJavascript, siNodedotjs, siGnubash,
  siC, siCplusplus, siReact, siDjango, siExpress, siSpring, siDocker,
  siJenkins, siArgo, siGit, siPostgresql, siInfluxdb, siMysql, siRedis,
  siClaude, siCursor,
} from 'simple-icons';

export interface Skill {
  /** Display name shown under the icon. */
  name: string;
  /** simple-icons SVG path data (24x24 viewBox), when a brand icon exists. */
  path?: string;
  /** Short monogram used when no brand icon exists. */
  mono?: string;
}

export interface SkillGroupData {
  label: string;
  items: Skill[];
}

const ic = (icon: { path: string }, name: string): Skill => ({ name, path: icon.path });
const mono = (name: string, label: string): Skill => ({ name, mono: label });

export const SKILLS: SkillGroupData[] = [
  {
    label: 'Languages',
    items: [
      mono('Java', 'Ja'),
      ic(siGo, 'Go'),
      ic(siPython, 'Python'),
      ic(siTypescript, 'TypeScript'),
      ic(siJavascript, 'JavaScript'),
      ic(siNodedotjs, 'Node.js'),
      ic(siC, 'C'),
      ic(siCplusplus, 'C++'),
      mono('C#', 'C#'),
      ic(siGnubash, 'Bash'),
    ],
  },
  {
    label: 'AI & Tooling',
    items: [
      mono('Model Context Protocol', 'MCP'),
      mono('Language Server Protocol', 'LSP'),
      mono('VS Code Extensions', 'VS'),
      ic(siClaude, 'Claude'),
      ic(siCursor, 'Cursor'),
      mono('GPT Codex', 'GPT'),
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      mono('AWS', 'AWS'),
      mono('Azure', 'Az'),
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
      mono('SQL Server', 'SQL'),
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
