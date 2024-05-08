import ApiServiceM from "../../services/ApiServiceM";
import ApiServiceK from "../../services/ApiServiceK";

const apiService = new ApiServiceM();
const apiServiceK = new ApiServiceK(); 

class ChannelService{

    getChannels(){
        return apiService.get('channels/getChannels/')
    }

    addChannel(data){
        return apiService.post('channels/addChannel/', data)
    }

    activateChannels(data){
        return apiService.post('channels/activateChannel/', data)
    }

    deactivateChannel(data){
        return apiService.post('channels/deactivateChannel/', data)
    }

    getBusinessUnitList(){
        return apiServiceK.get('iamadmin/businessUnitList/')
    }

    getTopicsFromDc(data){
        return apiServiceK.post('iamadmin/doccodeList/', data)
    }

}

export default ChannelService;