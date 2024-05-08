import ApiServiceM from "../services/ApiServiceM";

const apiService = new ApiServiceM();

class DashBoardService{

    totalEntityCount(){
        return apiService.get('useraccount/totalEntityCount/')
    }

}

export default DashBoardService