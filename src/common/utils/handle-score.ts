import { FluencyLevelType } from '../types/fluency-level';

export const HandleScore = (score: number): { fluencyLevel: FluencyLevelType; percentage: number } => {
  if (score < 500) {
    return { fluencyLevel: 'a1', percentage: Math.floor((score / 500) * 100) };
  } else if (score < 1500) {
    return { fluencyLevel: 'a2', percentage: Math.floor(((score - 500) / 1000) * 100) };
  } else if (score < 3000) {
    return { fluencyLevel: 'b1', percentage: Math.floor(((score - 1500) / 1500) * 100) };
  } else if (score < 5000) {
    return { fluencyLevel: 'b2', percentage: Math.floor(((score - 3000) / 2000) * 100) };
  } else {
    return { fluencyLevel: 'c1', percentage: Math.floor(((score - 5000) / 2000) * 100) };
  }
};
