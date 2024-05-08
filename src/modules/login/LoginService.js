import ApiServiceM from "../../services/ApiServiceM";

const apiServiceM = new ApiServiceM();

class LoginService{
    
    verifyUser(data){
        return apiServiceM.post('useraccount/verifyUser/', data)
    }
}

export default LoginService;