import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import breachesReducer from './slices/breachesSlice';
import rootSaga from './sagas/breachesSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        breaches: breachesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
