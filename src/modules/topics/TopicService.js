import ApiServiceM from "../../services/ApiServiceM";
import ApiServiceK from "../../services/ApiServiceK";

const apiService = new ApiServiceM();
const apiServiceK = new ApiServiceK(); 

class TopicService {

    getTopics() {
        return apiService.get('topics/getTopics/')
    }

    addTopic(data) {
        return apiService.post('topics/addTopic/', data)
    }

    activateTopics(data) {
        return apiService.post('topics/activateTopic/', data)
    }

    deactivateTopic(data) {
        return apiService.post('topics/deactivateTopic/', data)
    }

    getTopicsFromDC(){
        return apiServiceK.get('iamadmin/doccodeForTopic/')
    }

    getDocumentImage(data){
        return apiServiceK.post('iamadmin/getImage/', data)
    }

    getDcDocuments(data){
        return apiServiceK.post('iamadmin/dcDocumentList/', data)
    }

}

export default TopicService