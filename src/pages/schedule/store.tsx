import { create } from 'zustand';

type Schedule = {
  id?: string | null;
  idService: string;
  idProfessional: string;
  date: Date;
  time: string;
  value: number;
  commission: number;
  duration: number;
};

type ScheduleState = {
  currentSchedule?: Schedule;
  schedules: Schedule[];
  setCurrentSchedule: (data: Schedule) => void;
  addSchedule: () => void;
  resetCurrentSchedule: () => void;
};

export const useScheduleStore = create<ScheduleState>((set) => ({
  currentSchedule: undefined,
  schedules: [],
  setCurrentSchedule: (data) =>
    set((state) => ({
      currentSchedule: { ...state.currentSchedule, ...data },
    })),
  addSchedule: () =>
    set((state) => {
      if (state.currentSchedule) {
        return {
          schedules: [...state.schedules, state.currentSchedule],
        };
      }
      return { schedules: [...state.schedules] };
    }),
  resetCurrentSchedule: () => set(() => ({ currentSchedule: undefined })),
}));
