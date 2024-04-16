import React, { useState } from "react";
import styles from "./signin.module.scss";
import clsx from "clsx";
import Loader from "../../components/Loader";
import AlertError from "../../components/AlertError";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsers } from "../../slices/user.slice";

const SignIn = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");

    const [waitingForServer, setWaitingForServer] = useState(false);

    const onClickSignInButton = () => {
        if (!userName || !password) {
            return setWarning("Vui lòng nhập đủ thông tin!");
        }

        setWarning("");
        setWaitingForServer(true);

        authService.signIn(userName, password)
            .then((res) => {
                dispatch(setUsers(res.data));
                localStorage.setItem("user", userName);
                navigate("/trang-chu");
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

    const onUserNameChange = (event) => {
        const inputValue = event.target.value.toUpperCase();
        const regex = /^[a-zA-Z0-9]+$/;

        if (regex.test(inputValue) || inputValue == "") {
            setUserName(inputValue);
        }
    };

    const onPasswordChange = (event) => {
        const inputValue = event.target.value;
        setPassword(inputValue);
    };

    const onEnterPress = (e) => {
        if (e.keyCode === 13) {
            onClickSignInButton();
        }
    }

    return (
        <div id={styles.root}>
            <div className={styles.signInContainer}>
                <h1 className={styles.title}>Đăng nhập</h1>
                <div className={styles.signInForm}>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Số căn cước</label>
                        <input
                            className={clsx(
                                styles.inputCell,
                                warning && !userName && styles.inputWarning
                            )}
                            aria-invalid="false"
                            type="text"
                            placeholder="Nhập số căn cước"
                            autoCorrect="off"
                            value={userName}
                            disabled={waitingForServer}
                            onChange={onUserNameChange}
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
                    <>{warning && <AlertError text={warning} />}</>
                    <button
                        className={styles.signInButton}
                        onClick={onClickSignInButton}
                        disabled={waitingForServer}
                    >
                        {waitingForServer ? <Loader /> : "Đăng nhập"}
                    </button>
                    <p
                        className={styles.forgotPasswordText}
                        onClick={() => {
                            navigate("/dang-ky");
                        }}
                    >
                        Tạo tài khoản?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;