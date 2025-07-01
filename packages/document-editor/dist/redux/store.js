import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import templateReducer from '../redux/index';
const reduxStore = configureStore({
    reducer: {
        template: templateReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.action'],
            ignoredPaths: ['helpPopup.action'],
        },
    }).prepend(createListenerMiddleware().middleware),
});
export default reduxStore;
//# sourceMappingURL=store.js.map