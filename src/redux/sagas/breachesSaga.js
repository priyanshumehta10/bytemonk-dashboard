import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'; // Import axios
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../slices/breachesSlice';

    const API_URL = process.env.REACT_APP_API_URL;
function* fetchDataSaga() {
    try {
        const response = yield call(axios.get, API_URL);
        const data = response.data;
        // console.log(data);
        yield put(fetchDataSuccess(data));
    } catch (error) {
        yield put(fetchDataFailure());
    }
}
export function* watchFetchData() {
    yield takeLatest(fetchDataRequest.type, fetchDataSaga);
}
export default function* rootSaga() {
    yield watchFetchData();
}
