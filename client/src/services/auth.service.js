import CONSTANT from "../utils/constant";
import axiosApiInstance from "../config/axios.instance.config";
import { store } from "../redux/store";
import { setUsers } from "../slices/user.slice";

const API_URL = CONSTANT.baseUrl + "/auth/";
class AuthService {

    async signIn(citizenIdentificationCard, password) {

        const body = {
            citizenIdentificationCard: citizenIdentificationCard,
            password: password,
        }

        console.log(body);

        return axiosApiInstance.post(API_URL + "sign-in", body).then((response) => {
            return response;
        });
    }

    async signUp(userName, password, citizenIdentificationCard, gender, dateOfBirth, address, phoneNumber) {

        const body = {
            userName: userName,
            password: password,
            citizenIdentificationCard: citizenIdentificationCard,
            gender: gender,
            dateOfBirth: dateOfBirth,
            address: address,
            phoneNumber: phoneNumber,
        }

        console.log(body);

        return axiosApiInstance.post(API_URL + "sign-up", body).then((response) => {
            return response;
        });
    }

    async signOut() {
        return axiosApiInstance.post(API_URL + "sign-out")
        .then(() => {
            localStorage.removeItem("user");
            store.dispatch(setUsers([]));
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