declare const reduxStore: import("@reduxjs/toolkit").EnhancedStore<{
    template: import("./types").TemplateState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: ((action: import("redux").Action<"listenerMiddleware/add">) => import("@reduxjs/toolkit").UnsubscribeListener) & import("redux-thunk").ThunkDispatch<{
        template: import("./types").TemplateState;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export default reduxStore;
//# sourceMappingURL=store.d.ts.map