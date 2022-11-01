import { put, takeLatest  , select} from "@redux-saga/core/effects";
import { ItemAction } from "../actions/ItemActions";
import { itemApi } from "../api"
import { actionType, LIMIT } from "../containers";

function* handleGetItem() {
    try {
        const res = yield itemApi.getItem(null, null, null) //param , query , data
        yield put(ItemAction.getSuccess({
            listData: res.listData
        }))
    } catch (error) {
        yield put(ItemAction.getFailure({
            message: error.message
        }))
    }
}

function* handleAddItem({ payload }) {
    console.log(payload)
    try {
        yield itemApi.addItem(null, null, payload)
        yield put(ItemAction.addSuccess())
        const res = yield itemApi.paginateItem(null, {activePage : `${payload.activePage}&`  , limit : LIMIT}, payload)
        yield put(ItemAction.paginateRequest({activePage : res.totalPage}))
    } catch (error) {
        yield put(ItemAction.addFailure(error))
    }
}

function* handleUpdateItem({payload}) {
    try {
        const store = yield select((state ) => state.items)
        yield itemApi.updateItem({id : payload.id}, null, payload)
        yield put(ItemAction.updateSuccess())
        yield put(ItemAction.paginateRequest({activePage : store.activePage}))
    } catch (error) {
        yield put(ItemAction.updateFailure(error))
    }
}

function* handleDeleteItem({payload}) {
    try {
        const store = yield select((state ) => state.items)
        yield itemApi.deleteItem({id : payload.id}, null, payload)
        yield put(ItemAction.deleteSuccess())
        if(store.listItem.length <= 1 && store.activePage === 1){
            yield put(ItemAction.paginateRequest({activePage : 1}))
        }else if (store.listItem.length <= 1){
            yield put(ItemAction.paginateRequest({activePage : store.activePage -= 1}))
        }else {
            yield put(ItemAction.paginateRequest({activePage : store.activePage}))
        }
      
    } catch (error) {
        yield put(ItemAction.deleteFailure(error))
    }
}

function* handlePaginateItem({payload}) {
    try {
        const res = yield itemApi.paginateItem(null, {activePage : `${payload.activePage}&`  , limit : LIMIT}, payload)
        if(res.totalPage === 0) {
            res.totalPage = 1
        }
        yield put(ItemAction.paginateSuccess({
            listData : res.listData,
            totalPage : res.totalPage,
            activePage : payload.activePage
        }))
    } catch (error) {
        yield put(ItemAction.paginateFailure(error))
    }
}

function* handleSearchItem({payload}) {
    try {
        const res = yield itemApi.searchItem(null, {activePage : `${payload.activePage}&` ,textSearch : `${payload.textSearch}&`, limit : LIMIT , }, payload)
        yield put(ItemAction.searchSuccess({
            listData : res.listData,
            totalPage : res.totalPage,
            activePage : payload.activePage,
            textSearch : payload.textSearch
        }))
    } catch (error) {
        yield put(ItemAction.searchFailure(error))
    }
}

const itemSaga = [
    takeLatest(actionType.Items.GET_ITEMS_REQUEST, handleGetItem),
    takeLatest(actionType.Items.ADD_ITEMS_REQUEST, handleAddItem),
    takeLatest(actionType.Items.UPDATE_ITEMS_REQUEST , handleUpdateItem),
    takeLatest(actionType.Items.DELETE_ITEMS_REQUEST , handleDeleteItem),
    takeLatest(actionType.Items.PAGINATE_ITEMS_REQUEST , handlePaginateItem),
    takeLatest(actionType.Items.SEARCH_ITEMS_REQUEST , handleSearchItem)
]
export default itemSaga