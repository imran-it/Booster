import { takeEvery, select, call, put } from "redux-saga/effects";
import actionType from "../constant/constant";
import { all_Setting } from "../saga_actions/Setting";
import {
  all_Transection,
  addTransections,
  deleteTransection,
} from "../saga_actions/All_Data_Transections";
import {
  all_Wallet_Card,
  addWalletCard,
} from "../saga_actions/All_Data_Wallet";
import {
  SummaryGenarator,
  SummaryToday,
  SummaryWeek,
  Summary_Month_Now,
  Summary_Year_Now,
} from "../saga_actions/All_Data_Summary";

import {
  loadMCMDetails,
  _loadBorrowORLendDB,
  add_emi,
  load_emi,
  _update_emi,
  _retriveLoan,
  _addLoan,
  _load_statistics,
  _updateLoan,
  _saveBorrowORLendDB,
  _refreshBorrowOrLend,
} from "../saga_actions/EventActivator";

import { customNavigationUpdater } from "../saga_actions/customNavigation";
const API_KEY = "1e8d1babbeccde1eb21b";

const url = "https://free.currconv.com/api/v7/convert?q";

// option B monthly 1000 free req
// export const getLatestRate = (endpoint, access_key) => fetch(`http://data.fixer.io/api/${endpoint}?access_key=${access_key}&from=${from}&to${to}&amount=${amount}`);

export const getLatestRate = (pair_Currency) =>
  fetch(
    `https://free.currconv.com/api/v7/convert?q=${pair_Currency}&compact=ultra&apiKey=1e8d1babbeccde1eb21b`
  );

// www.amdoren.com api tjbve4G7kJwCeqx35GnxrSudsU9M2P
// https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=1e8d1babbeccde1eb21b

const fetchuser = function* (action) {
  console.log("work");
};

const leastRate = function* (action) {
  let pair_Currency = "USD" + "_" + "BDT";

  const responsebase = yield call(getLatestRate, pair_Currency);

  const resut_Base = yield responsebase.json();

  const CON_result = resut_Base[pair_Currency];

  if (resut_Base.error) {
    yield put({ type: CONVERSION_ERROR, error: "error ON" });
  } else {
    yield put({ type: actionType.CONVERT, result: CON_result });
  }
};

const rootSaga = function* () {
  yield takeEvery(actionType.USER, fetchuser);
  yield takeEvery(actionType.CONVERTION_INIT, leastRate);
  yield takeEvery(actionType.TRANSECTION, all_Transection);
  yield takeEvery(actionType.ADD_TRANSECTION, addTransections);
  yield takeEvery(actionType.WALLET_CARD, all_Wallet_Card);
  yield takeEvery(actionType.ADD_WALLET_CARD, addWalletCard);
  yield takeEvery(actionType.DELETE_TRANSECTION, deleteTransection);
  yield takeEvery(actionType.INITIAL_SETTING, all_Setting);
  yield takeEvery(actionType.SUMMARY, SummaryGenarator);
  yield takeEvery(actionType.SUMMARY_TODAY, SummaryToday);
  yield takeEvery(actionType.SUMMARY_WEEK, SummaryWeek);
  yield takeEvery(actionType.SUMMARY_MONTH, Summary_Month_Now);
  yield takeEvery(actionType.SUMMARY_YEAR, Summary_Year_Now);
  yield takeEvery(actionType.CUSNAV, customNavigationUpdater);
  yield takeEvery(actionType.LOAD_MCM_DB, loadMCMDetails);
  yield takeEvery(actionType.LOAD_BORROWORLEND_DB, _loadBorrowORLendDB);
  yield takeEvery(actionType.ADD_EMI_DB, add_emi);
  yield takeEvery(actionType.RETRIVE_EMI_DB, load_emi);
  yield takeEvery(actionType.UPDATE_EMI_DB, _update_emi);
  yield takeEvery(actionType.RETRIVE_LOAN, _retriveLoan);
  yield takeEvery(actionType.ADD_LOAN, _addLoan);
  yield takeEvery(actionType.STATISTICS, _load_statistics);
  yield takeEvery(actionType.LOANUPDATE, _updateLoan);
  yield takeEvery(actionType.SAVE_BORROWORLEND_DB, _saveBorrowORLendDB);
  yield takeEvery(actionType.REFRESHBORROWORLEND, _refreshBorrowOrLend);
};

export default rootSaga;
