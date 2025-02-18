import create from 'zustand';
import { Employee, Assignment } from '../types';

interface StoreState {
  employees: Employee[];
  previousAssignments: Assignment[];
  currentAssignments: Assignment[];
  setEmployees: (employees: Employee[]) => void;
  setPreviousAssignments: (assignments: Assignment[]) => void;
  setCurrentAssignments: (assignments: Assignment[]) => void;
  reset: () => void;
}

export const useStore = create<StoreState>((set) => ({
  employees: [],
  previousAssignments: [],
  currentAssignments: [],
  setEmployees: (employees) => set({ employees }),
  setPreviousAssignments: (assignments) => set({ previousAssignments: assignments }),
  setCurrentAssignments: (assignments) => set({ currentAssignments: assignments }),
  reset: () => set({ employees: [], previousAssignments: [], currentAssignments: [] }),
}));