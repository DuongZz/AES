import React from "react";
import styles from "./need_sign_in.module.scss";
import LargeWarningImage from "../../assets/imgs/large_warning.svg";

function NeedSignInPage() {
  return (
    <div className={styles.root}>
      <img src={LargeWarningImage} className={styles.warningImage} draggable={false} />
      <span className={styles.warningText}>
        Bạn cần{" "}
        <a href={"/"} className={styles.linkText}>
          đăng nhập
        </a>{" "}
        để vào trang này.
      </span>
    </div>
  );
}

export default NeedSignInPage
