export const FluencyLevel = {
  a1: 'Iniciante',
  a2: 'Básico',
  b1: 'Intermediário',
  b2: 'Pós-Intermediário',
  c1: 'Avançado',
} as const;

export type FluencyLevelType = keyof typeof FluencyLevel;
