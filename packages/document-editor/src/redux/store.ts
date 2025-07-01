import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import templateReducer from '../redux/index'

const reduxStore = configureStore({
  reducer: {
    template: templateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.action'],
        ignoredPaths: ['helpPopup.action'],
      },
    }).prepend(createListenerMiddleware().middleware),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch
export default reduxStore
