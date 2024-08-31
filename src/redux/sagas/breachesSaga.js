// src/redux/sagas/breachesSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'; // Import axios
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../slices/breachesSlice';

    const API_URL = 'https://run.mocky.io/v3/53e0a979-b3ab-486f-9637-75775cf27981';

// Worker Saga: Makes the API request when watcher saga sees the action
function* fetchDataSaga() {
    try {
        // Use axios to make the API call
        const response = yield call(axios.get, API_URL);
        // axios stores the data in response.data
        const data = response.data;
        // Dispatch the success action with the fetched data
        yield put(fetchDataSuccess(data));
    } catch (error) {
        // If the API call fails, dispatch the failure action
        yield put(fetchDataFailure());
    }
}

// Watcher Saga: Spawns a new fetchDataSaga task on each fetchDataRequest
export function* watchFetchData() {
    yield takeLatest(fetchDataRequest.type, fetchDataSaga);
}

// Root Saga: Combines all sagas for middleware
export default function* rootSaga() {
    yield watchFetchData();
}
