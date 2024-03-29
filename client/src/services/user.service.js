import CONSTANT from "../utils/constant";
import axiosApiInstance from "../config/axios.instance.config";

const API_URL = CONSTANT.baseUrl + "/user/";
class UserService {

    async fetchAllUsers(userId) {
        return axiosApiInstance.get(API_URL + `fetch-all-users/${userId}`).then((response) => {
            return response;
        });
    }
}

export default new UserService();