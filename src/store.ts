import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import taskSlice from './slices/taskSlice';

export const store = configureStore({
    reducer: {
        Task: taskSlice,
    },

    middleware: getDefaultMiddleware({
        serializableCheck: false,
        })
  });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
