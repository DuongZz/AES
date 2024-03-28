import CONSTANT from "../utils/constant";
import axiosApiInstance from "../config/axios.instance.config";
import { store } from "../redux/store";
import { setUser } from "../slices/user.slice";
import AES from "../security/aes";

const secretKey = process.env.REACT_APP_SECRET_KEY || "1234567890abcdef"
console.log("secretKey: ", secretKey);
AES.init(secretKey);

const API_URL = CONSTANT.baseUrl + "/auth/";

class AuthService {

    async signIn(citizenIdentificationCard, password) {

        const body = {
            citizenIdentificationCard: AES.encrypt(citizenIdentificationCard),
            password: AES.encrypt(password),
        }

        console.log(body);

        return axiosApiInstance.post(API_URL + "sign-in", body).then((response) => {
            return response;
        });
    }

    async signUp(userName, password, citizenIdentificationCard, gender, dateOfBirth, address, phoneNumber) {

        const body = {
            userName: AES.encrypt(userName),
            password: AES.encrypt(password),
            citizenIdentificationCard: AES.encrypt(citizenIdentificationCard),
            gender: AES.encrypt(gender),
            dateOfBirth: AES.encrypt(dateOfBirth),
            address: AES.encrypt(address),
            phoneNumber: AES.encrypt(phoneNumber),
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