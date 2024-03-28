import CONSTANT from "../utils/constant";
import axiosApiInstance from "../config/axios.instance.config";
import AES from "../security/aes";

const secretKey = process.env.REACT_APP_SECRET_KEY || "1234567890abcdef"
AES.init(secretKey);

const API_URL = CONSTANT.baseUrl + "/user/";

class UserService {

    async fetchAllUsers(userId) {
        return axiosApiInstance.get(API_URL + `fetch-all-users/${userId}`).then((response) => {
            return response;
        });
    }
}

export default new UserService();