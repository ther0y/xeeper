// @ts-ignore
import boggle from "pf-boggle";

export type Boggle = {
  board: string[];

  answers: BoggleAnswer[];
};

export type BoggleBoard = string[];

export type BoggleAnswer = {
  word: string;
  sequence: number[];
};

export const GenerateBoggle = (): Boggle => {
  const board = boggle.generate(4);

  return {
    board: board,
    answers: boggle.solve(board),
  };
};

export const SolveBoggle = (board: string[]): BoggleAnswer[] => {
  return boggle.solve(board);
};
