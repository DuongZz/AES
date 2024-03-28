import React, { useState } from "react";
import styles from "./signup.module.scss";
import clsx from "clsx";
import Loader from "../../components/Loader";
import AlertError from "../../components/AlertError";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const navigate = useNavigate();

    const [warning, setWarning] = useState("");

    const [citizenIdentificationCard, setCitizenIdentificationCard] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    const [waitingForServer, setWaitingForServer] = useState(false);

    const onClickSignUpButton = () => {
        if (!userName || !password || !citizenIdentificationCard || !gender || !dateOfBirth || !address || !phoneNumber) {
            return setWarning("Vui lòng nhập đủ thông tin!");
        }

        if (gender != "Nam" && gender != "Nữ") {
            return setWarning("Giới tính phải là Nam hoặc Nữ!");
        }

        setWarning("");
        setWaitingForServer(true);

        authService.signUp(userName, password, citizenIdentificationCard, gender, dateOfBirth, address, phoneNumber)
            .then(() => {
                alert("Đăng ký thành công!");
                navigate("/");
            })
            .catch((error) => {
                const message = error?.response?.data;
                if (message) {
                    setWarning(message);
                } else {
                    setWarning("Đã có lỗi xảy ra. Hãy thử lại sau ít phút!");
                }
            })
            .finally(() => {
                setWaitingForServer(false);
            });
    };

    const onCitizenIdentificationCardChange = (event) => {
        const inputValue = event.target.value;
        const regex = /^[0-9]+$/;

        if (regex.test(inputValue) || inputValue == "") {
            setCitizenIdentificationCard(inputValue);
        }
    }

    const onPasswordChange = (event) => {
        const inputValue = event.target.value;
        setPassword(inputValue);
    };

    const onUserNameChange = (event) => {
        const inputValue = event.target.value.toUpperCase();
        setUserName(inputValue);
    };

    const onGenderChange = (event) => {
        const inputValue = event.target.value;
        setGender(inputValue);
    }

    const onDateOfBirthChange = (event) => {
        const inputValue = event.target.value;
        setDateOfBirth(inputValue);
    }

    const onAddressChange = (event) => {
        const inputValue = event.target.value;
        setAddress(inputValue);
    }

    const onPhoneNumberChange = (event) => {
        const inputValue = event.target.value.toUpperCase();
        const regex = /^[0-9]+$/;

        if (regex.test(inputValue) || inputValue == "") {
            setPhoneNumber(inputValue);
        }
    }

    const onEnterPress = (e) => {
        if (e.keyCode === 13) {
            onClickSignUpButton();
        }
    }

    return (
        <div id={styles.root}>
            <div className={styles.signInContainer}>
                <h1 className={styles.title}>Đăng ký</h1>
                <div className={styles.signInForm}>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Số căn cước</label>
                        <input
                            className={clsx(
                                styles.inputCell,
                                warning && !citizenIdentificationCard && styles.inputWarning
                            )}
                            aria-invalid="false"
                            type="text"
                            placeholder="Nhập số căn cước"
                            autoCorrect="off"
                            value={citizenIdentificationCard}
                            disabled={waitingForServer}
                            onChange={onCitizenIdentificationCardChange}
                            onKeyDown={onEnterPress}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Mật khẩu</label>
                        <input
                            className={clsx(
                                styles.inputCell,
                                warning && !password && styles.inputWarning
                            )}
                            aria-invalid="false"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            autoCorrect="off"
                            value={password}
                            disabled={waitingForServer}
                            onChange={onPasswordChange}
                            onKeyDown={onEnterPress}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Tên</label>
                        <input
                            className={clsx(
                                styles.inputCell,
                                warning && !userName && styles.inputWarning
                            )}
                            aria-invalid="false"
                            type="text"
                            placeholder="Nhập tên"
                            autoCorrect="off"
                            value={userName}
                            disabled={waitingForServer}
                            onChange={onUserNameChange}
                            onKeyDown={onEnterPress}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Giới tính</label>
                        <input
                            className={clsx(
                                styles.inputCell,
                                warning && !gender && styles.inputWarning
                            )}
                            aria-invalid="false"
                            type="text"
                            placeholder="Nhập giới tính"
                            autoCorrect="off"
                            value={gender}
                            disabled={waitingForServer}
                            onChange={onGenderChange}
                            onKeyDown={onEnterPress}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Ngày sinh</label>
                        <input
                            className={clsx(
                                styles.inputCell,
                                warning && !dateOfBirth && styles.inputWarning
                            )}
                            aria-invalid="false"
                            type="text"
                            placeholder="Nhập ngày sinh"
                            autoCorrect="off"
                            value={dateOfBirth}
                            disabled={waitingForServer}
                            onChange={onDateOfBirthChange}
                            onKeyDown={onEnterPress}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Địa chỉ</label>
                        <input
                            className={clsx(
                                styles.inputCell,
                                warning && !address && styles.inputWarning
                            )}
                            aria-invalid="false"
                            type="text"
                            placeholder="Nhập địa chỉ"
                            autoCorrect="off"
                            value={address}
                            disabled={waitingForServer}
                            onChange={onAddressChange}
                            onKeyDown={onEnterPress}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Số điện thoại</label>
                        <input
                            className={clsx(
                                styles.inputCell,
                                warning && !phoneNumber && styles.inputWarning
                            )}
                            aria-invalid="false"
                            type="text"
                            placeholder="Nhập số điện thoại"
                            autoCorrect="off"
                            value={phoneNumber}
                            disabled={waitingForServer}
                            onChange={onPhoneNumberChange}
                            onKeyDown={onEnterPress}
                        />
                    </div>
                    <>{warning && <AlertError text={warning} />}</>
                    <button
                        className={styles.signInButton}
                        onClick={onClickSignUpButton}
                        disabled={waitingForServer}
                    >
                        {waitingForServer ? <Loader /> : "Tạo tài khoản"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;