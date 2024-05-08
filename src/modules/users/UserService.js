import ApiServiceM from "../../services/ApiServiceM";

const apiService = new ApiServiceM();

class UserService{

    getUser(){
        return apiService.get('useraccount/getAllUsers/')
    }

    activateUsers(data){
        return apiService.post('useraccount/activateUser/', data)
    }

    deactivateUsers(data){
        return apiService.post('useraccount/deactivateUser/', data)
    }

    getUserInfo(data){
        return apiService.post('useraccount/getUserInfo/', data)
    }

    getHistoryInfo(data){
        return apiService.post('useraccount/getHistoryDetails/', data)
    }

}

export default UserService;