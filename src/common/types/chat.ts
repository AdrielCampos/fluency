export type MessageType = {
  text: string;
  tip?: string;
  score: string;
  emotion: 'happy' | 'sad' | 'elated';
  type: 'user' | 'model';
};
