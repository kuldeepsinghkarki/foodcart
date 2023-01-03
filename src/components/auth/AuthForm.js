import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { browserName, isMobileOnly, isDesktop } from "react-device-detect";

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const AuthKey = process.env.REACT_APP_AUTH_KEY;
  const [isLogin, setIsLogin] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [feedbackClass, setFeedbackClass] = useState(classes.fok);
  const navigate = useNavigate();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setFeedback("");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setFeedback("");
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url;
    if (isLogin) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=".concat(AuthKey);
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=".concat(AuthKey);
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            console.log(data);
            authCtx.login(data.idToken, data.email);
            if (isLogin) {
              return navigate("/home");
            }
            setFeedbackClass(classes.fok);
            setFeedback("Success!!!");
          });
        } else {
          return res.json().then((data) => {
            let myclass = classes.ferror;
            setFeedbackClass(myclass);
            setFeedback("Got Error " + data.error.message);
          });
        }
      })
      .catch((err) => {
        setFeedbackClass(classes.ferror);
        setFeedback("Got Error " + err.message);
      });
  };

  return (
    <section className={classes.auth}>
      {isDesktop && <h3>Browsing from Desktop {browserName}</h3>}
      {isMobileOnly && <h3>Browsing from Mobile {browserName}</h3>}

      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <div className={feedbackClass}>{feedback}</div>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
