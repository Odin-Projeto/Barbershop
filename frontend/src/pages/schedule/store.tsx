import { create } from 'zustand';

type Schedule = {
  id?: string | null;
  name: string;
  idService: string;
  idProfessional: string;
  date?: Date;
  time?: string;
  value?: number;
  commission: number;
  duration?: number;
};

type ScheduleState = {
  currentSchedule?: Schedule;
  schedules: Schedule[];
  setCurrentSchedule: (data: Schedule) => void;
  addSchedule: () => void;
  confirmSchedule: (id: string) => void;
  uncheckSchedule: (id: string) => void;
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
  confirmSchedule: (id: string) =>
    set((state) => {
      return {
        schedules: state.schedules.map((schedule) => {
          if (schedule.id === id) {
            return { ...schedule, confirmed: true };
          }
          return schedule;
        }),
      };
    }),
  uncheckSchedule: (id: string) =>
    set((state) => {
      return {
        schedules: state.schedules.filter((schedule) => schedule.id !== id),
      };
    }),
  resetCurrentSchedule: () => set(() => ({ currentSchedule: undefined })),
}));
