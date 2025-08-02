import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Patient } from '../types/patient';

interface FormDraftState {
  patientDrafts: Record<string, Patient | Partial<Patient>>; // Keyed by patientId or 'new_patient'
  saveDraft: (data: Patient | Partial<Patient>, id?: string) => void;
  loadDraft: (id?: string) => Patient | Partial<Patient> | undefined;
  clearDraft: (id?: string) => void;
}

export const useFormDraftStore = create<FormDraftState>()(
  persist(
    (set, get) => ({
      patientDrafts: {},
      saveDraft: (data, id = 'new_patient') => {
        set((state) => ({
          patientDrafts: {
            ...state.patientDrafts,
            [id]: data,
          },
        }));
        // Optional: Trigger a notification
        // useNotificationStore.getState().addNotification('Form draft saved automatically!', 'info', 2000);
      },
      loadDraft: (id = 'new_patient') => get().patientDrafts[id],
      clearDraft: (id = 'new_patient') => {
        set((state) => {
          const newDrafts = { ...state.patientDrafts };
          delete newDrafts[id];
          return { patientDrafts: newDrafts };
        });
      },
    }),
    {
      name: 'healthcare-dashboard-form-drafts', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);
