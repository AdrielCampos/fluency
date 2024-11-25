export const FluencyLevel = {
  a1: 'Iniciante',
  a2: 'Básico',
  b1: 'Intermediário',
  b2: 'Pós-Intermediário',
  c1: 'Avançado',
} as const;

export const FluencyLevelTag = {
  a1: 'A1',
  a2: 'A2',
  b1: 'B1',
  b2: 'B2',
  c1: 'C1',
} as const;

export type FluencyLevelType = keyof typeof FluencyLevel;
