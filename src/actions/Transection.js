import actionType from '../constant/constant';


export function add_new_transection(data, nav){
    return {
        type: actionType.ADD_TRANSECTION,
        result: data,
        nav: nav
    }
}

export function letast_transection(data){
    return {
        type: actionType.TRANSECTION,
        result: data
    }
}