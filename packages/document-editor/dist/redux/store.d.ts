declare const reduxStore: import("@reduxjs/toolkit").EnhancedStore<{
    template: import("./types").TemplateState;
}, import("@reduxjs/toolkit").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("@reduxjs/toolkit").StoreEnhancer<{
    dispatch: ((action: import("@reduxjs/toolkit").Action<"listenerMiddleware/add">) => import("@reduxjs/toolkit").UnsubscribeListener) & import("@reduxjs/toolkit").ThunkDispatch<{
        template: import("./types").TemplateState;
    }, undefined, import("@reduxjs/toolkit").UnknownAction>;
}>, import("@reduxjs/toolkit").StoreEnhancer]>>;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export default reduxStore;
//# sourceMappingURL=store.d.ts.map