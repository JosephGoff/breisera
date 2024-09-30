import { atom } from "recoil";

export type checkboxObject = {
  label: string;
  isChecked: boolean;
  nonNegotiable?: boolean;
  negative?: boolean;
  index?: number;
};

export type itemDayStatusObject = {
  dayStatus: number;
  checkboxes: checkboxObject[];
};

export type dayStatusObject = {
  health: itemDayStatusObject;
  learning: itemDayStatusObject;
  progress: itemDayStatusObject;
  habits: itemDayStatusObject;
  all: itemDayStatusObject;
};

export const dayStatusState = atom<dayStatusObject>({
  key: "dayStatusState",
  default: {
    health: {
      dayStatus: 0,
      checkboxes: [
        { label: "Exercise", isChecked: false },
        { label: "Healthy Breakfast", isChecked: false },
        { label: "Healthy Lunch", isChecked: false },
        { label: "Healthy Dinner", isChecked: false },
        { label: "Bed in time for 8 hours", isChecked: false },
      ],
    },
    habits: { dayStatus: 0, checkboxes: [
      { label: "Brush 2X", isChecked: false, negative: false, nonNegotiable: true, index: 0 },
      { label: "Drink 3 full water bottles", isChecked: false, negative: false, nonNegotiable: true, index: 1 },
      { label: "5 minutes of core before bed", isChecked: false, negative: false, nonNegotiable: true, index: 2 },
      
      { label: "Apartment Clean", isChecked: false, negative: false, nonNegotiable: false, index: 0 },
      { label: "Walk Outside", isChecked: false, negative: false, nonNegotiable: false, index: 1 },
      { label: "Journal 5 minutes", isChecked: false, negative: false, nonNegotiable: false, index: 2 },
      { label: "Draw 5 minutes", isChecked: false, negative: false, nonNegotiable: false, index: 3 },

      { label: "NO Porn", isChecked: true, negative: true, nonNegotiable: true, index: 0 },
      { label: "NO Drugs", isChecked: true, negative: true, nonNegotiable: true, index: 1 },
      { label: "NO Alcohol", isChecked: true, negative: true, nonNegotiable: true, index: 2 },

      { label: "NO Caffeine", isChecked: true, negative: true, nonNegotiable: false, index: 0 },
      { label: "NO TV", isChecked: true, negative: true, nonNegotiable: false, index: 1 },
      { label: "NO Video Games", isChecked: true, negative: true, nonNegotiable: false, index: 2 },
    ] },
    progress: {
      dayStatus: 0,
      checkboxes: [
        { label: "Jess' Website - 1 Hour", isChecked: false },
        { label: "My App - 1 Hour", isChecked: false },
        { label: "Post 1 video on breisera", isChecked: false },
      ],
    },
    learning: {
      dayStatus: 0,
      checkboxes: [
        { label: "Duolingo", isChecked: false },
        { label: "Piano", isChecked: false },
      ],
    },
    all: { dayStatus: 0, checkboxes: [
        { label: "Happy?", isChecked: false },
    ] },
  },
});
