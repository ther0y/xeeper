import { BoggleBoard } from "./utils/boggle-generator.js";

export type AppSate = {
  count: number;
};

export type LinkletState = {
  board: BoggleBoard;
  userAnswers: string[];
  username: string | null;
  userPhotoUrl: string | null;
};
