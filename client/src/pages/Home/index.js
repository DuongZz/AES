import React, { useState, useEffect } from "react";
import styles from "./home.module.scss";
import userService from "../../services/user.service";
import { selectUsers } from "../../slices/user.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     const user = localStorage.getItem("user");
    //     userService.fetchAllUsers(user).then((response) => {
    //         setData(response.data);
    //     }).catch((err) => {
    //         alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    //     });
    // }, []);

    const users = useSelector(selectUsers);

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>Danh sách người dùng</h1>
            <button 
                className={styles.logoutButton}
                onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/")
                }}
            >Đăng xuất</button>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Số căn cước</th>
                            <th>Tên người dùng</th>
                            <th>Mật khẩu</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Địa chỉ</th>
                            <th>Số điện thoại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.users.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {
                                            Object.keys(item).map((key) => {
                                                return (
                                                    <td>{item[key]}</td>
                                                );
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;