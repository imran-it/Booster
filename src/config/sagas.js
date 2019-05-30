import { takeEvery, select, call, put } from 'redux-saga/effects';
import actionType from '../constant/constant';

import { all_Transection } from "../saga_actions/All_Data_Transections";

const API_KEY = "1e8d1babbeccde1eb21b";

const url = "https://free.currconv.com/api/v7/convert?q"

// option B monthly 1000 free req
// export const getLatestRate = (endpoint, access_key) => fetch(`http://data.fixer.io/api/${endpoint}?access_key=${access_key}&from=${from}&to${to}&amount=${amount}`);

export const getLatestRate = (pair_Currency) => fetch(`https://free.currconv.com/api/v7/convert?q=${pair_Currency}&compact=ultra&apiKey=1e8d1babbeccde1eb21b`);

// www.amdoren.com api tjbve4G7kJwCeqx35GnxrSudsU9M2P


// https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=1e8d1babbeccde1eb21b

const fetchuser = function* (action){
    console.log('work');
}


const leastRate = function* (action){

    let pair_Currency = "USD" + "_" + "BDT";

    const responsebase = yield call(getLatestRate, pair_Currency);

    const resut_Base = yield responsebase.json();

    const CON_result = resut_Base[pair_Currency]

    console.log('finally', pair_Currency)

  if (resut_Base.error) {
    yield put({ type: CONVERSION_ERROR, error: "error ON" });
  }
  else {
    yield put({ type: actionType.CONVERT, result : CON_result });

  }

} 


// const all_Transection = function* (action){
//     console.log('workkk')
// }



const rootSaga = function* (){
    yield takeEvery(actionType.USER, fetchuser )
    yield takeEvery(actionType.CONVERTION_INIT, leastRate)
    yield takeEvery(actionType.TRANSECTION, all_Transection)
}

export default rootSaga;