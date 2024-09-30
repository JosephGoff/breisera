import { atom } from "recoil";

export type dayStatusObject = {
  health: number;
  learning: number;
  progress: number;
  habits: number;
  all: number;
};

export const dayStatusState = atom<dayStatusObject>({
  key: "dayStatusState",
  default: {
    health: 0.3,
    learning: 0.2,
    progress: 0.4,
    habits: 0.2,
    all: 0.1,
  },
});
