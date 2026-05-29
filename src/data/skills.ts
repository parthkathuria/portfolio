export interface SkillGroupData {
  label: string;
  items: string[];
}

export const SKILLS: SkillGroupData[] = [
  { label: 'Languages', items: ['Java', 'Go', 'Python', 'C/C++', 'C#', 'TypeScript', 'JavaScript', 'Node.js', 'Bash'] },
  { label: 'AI & Tooling', items: ['Model Context Protocol (MCP)', 'Language Server Protocol (LSP)', 'VSCode Extension API', 'Claude Code', 'Cursor', 'GPT Codex'] },
  { label: 'Platforms', items: ['AWS (Lambda, ECS, EC2, EventBridge, CloudFormation)', 'Azure', 'Docker', 'GraalVM', 'Jenkins', 'ArgoCD', 'Git'] },
  { label: 'Data', items: ['PostgreSQL', 'InfluxDB', 'MSSQL', 'MySQL', 'Redis'] },
  { label: 'Frameworks', items: ['Spring MVC', 'React', 'Django', 'Express.js', 'Angular.js'] },
];
