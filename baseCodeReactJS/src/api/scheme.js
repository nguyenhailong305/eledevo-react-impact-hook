import {API_METHOD as METHOD , BASE_URL} from "../containers"
const API_SCHEME = {
    ITEM : {
        GET_ITEM : {
            url : `${BASE_URL}/item`,
            method : METHOD.GET
        },
        ADD_ITEM :{
            url : `${BASE_URL}/item`,
            method : METHOD.POST
        },
        DELETE_ITEM : {
            url : `${BASE_URL}/item/:id`,
            method: METHOD.DELETE
        },
        UPDATE_ITEM : {
            url : `${BASE_URL}/item/:id`,
            method : METHOD.PUT
        },
        PAGINATE_ITEM : {
            url : `${BASE_URL}/item/paginate`,
            method : METHOD.GET
        },
        SEARCH_ITEM : {
            url : `${BASE_URL}/item/search`,
            method : METHOD.GET
        },
    }
}

export default API_SCHEME