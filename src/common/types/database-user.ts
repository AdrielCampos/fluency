import { Content } from '@google/generative-ai';
import { User as FirebaseUser } from 'firebase/auth';

export type User = FirebaseUser & {
  score: number;
  history: Content[];
};
