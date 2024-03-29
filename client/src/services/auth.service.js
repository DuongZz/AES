import CONSTANT from "../utils/constant";
import axiosApiInstance from "../config/axios.instance.config";
import { store } from "../redux/store";
import { setUser } from "../slices/user.slice";
import AES from "../security/aes";

const API_URL = CONSTANT.baseUrl + "/auth/";
class AuthService {

    async signIn(citizenIdentificationCard, password) {

        const body = {
            citizenIdentificationCard: AES.encrypt(citizenIdentificationCard, password),
            password: AES.encrypt(password, password),
            initialVector: password,
        }

        console.log(body);

        return axiosApiInstance.post(API_URL + "sign-in", body).then((response) => {
            return response;
        });
    }

    async signUp(userName, password, citizenIdentificationCard, gender, dateOfBirth, address, phoneNumber) {

        const body = {
            userName: AES.encrypt(userName, password),
            password: AES.encrypt(password, password),
            citizenIdentificationCard: AES.encrypt(citizenIdentificationCard, password),
            gender: AES.encrypt(gender, password),
            dateOfBirth: AES.encrypt(dateOfBirth, password),
            address: AES.encrypt(address, password),
            phoneNumber: AES.encrypt(phoneNumber, password),
            initialVector: password,
        }

        console.log(body);

        return axiosApiInstance.post(API_URL + "sign-up", body).then((response) => {
            return response;
        });
    }

    async signOut() {
        return axiosApiInstance.post(API_URL + "sign-out")
        .then(() => {
            store.dispatch(setUser(null));
        })
        .catch((err) => {
            let errorMessage = err.response?.data?.message;
            if (!errorMessage) {
                errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại sau."
            }
            alert(errorMessage);
        });
    }
}

export default new AuthService();