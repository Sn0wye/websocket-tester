import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import superjson from 'superjson';

export type Storage = {
  storage: Map<string, string>;
  setStorage: (key: string, value: string) => void;
  renameKey: (oldKey: string, newKey: string) => void;
  removeKey: (key: string) => void;
};

export const useStorage = create(
  persist<Storage>(
    set => ({
      storage: new Map(),
      setStorage: (key: string, value: string) => {
        set(state => {
          const newStorage = new Map(state.storage);
          newStorage.set(key, value);
          return { storage: newStorage };
        });
      },
      renameKey: (oldKey: string, newKey: string) => {
        set(state => {
          if (!state.storage.has(oldKey)) return state;

          const newStorage = new Map(state.storage);
          newStorage.set(newKey, newStorage.get(oldKey) as string);
          newStorage.delete(oldKey);
          return { storage: newStorage };
        });
      },
      removeKey: (key: string) => {
        set(state => {
          if (!state.storage.has(key)) return state;

          const newStorage = new Map(state.storage);
          newStorage.delete(key);
          return { storage: newStorage };
        });
      }
    }),
    {
      name: 'ws-tester',
      storage: {
        getItem: key => {
          const item = localStorage.getItem(key);
          return item ? superjson.parse(item) : null;
        },
        setItem: (key, value) =>
          localStorage.setItem(key, superjson.stringify(value)),
        removeItem: key => localStorage.removeItem(key)
      }
    }
  )
);
