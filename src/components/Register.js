import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const REGISTER_URL = "/users";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const Register = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // userRef.current.focus
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    // console.log(result);
    // console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    // console.log(result);
    // console.log(pwd);
    setValidPwd(result);
    const isMatching = pwd === matchPwd;
    setValidMatch(isMatching);
  }, [pwd, matchPwd]);

  // when the user going to recorrect the status of these 23 dependancy states
  useEffect(() => {
    setErrorMsg("");
  }, [user, email, pwd, matchPwd]);

  //   functionb for handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          username: user,
          password: pwd,
          email,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials : true
        }
      );
      console.log(response?.data);
      console.log(JSON.stringify(response));
      console.log(response?.accessToken);
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No Server Response");
      } else if (error.response?.status === 409) {
        setErrorMsg("Username or Email Taken");
      } else {
        setErrorMsg("Registration Failed");
      }
      // errorRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to={"/login"}>Sign In</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errorRef}
            className={errorMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          ></p>

          <h1>Register Form</h1>

          <form onSubmit={handleSubmit}>
            {/* username area */}
            <label htmlFor="username">
              Username :
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              type="text"
              id="username"
              required
              ref={userRef}
              autoComplete="off"
              placeholder="Enter username"
              onChange={(e) => setUser(e.target.value)}
              aria-invalid={validName ? "true" : "false"}
              aria-describedby="uIdNote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <p
              id="uIdNote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters. <br />
              Must begin with a letter <br />
              Letters, Numbers, Hyphens, Underscores allowed.
            </p>

            {/* email area */}
            <label htmlFor="email">
              Email :
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailNote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />

            <p
              id="emailNote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Provide a valid Email
            </p>

            {/* Password area */}
            <label htmlFor="password">
              Password :
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPwd(e.target.value)}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdNote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />

            <p
              id="pwdNote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters <br />
              Must include uppercase & lowercase letters, a number & a special
              character <br />
              Allowed special characters :{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            {/* confirm password area */}
            <label htmlFor="matchPwd">
              Confirm Password :
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              type="password"
              id="matchPwd"
              required
              placeholder="confirm your password"
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="pwdMatchNote"
            />

            <p
              id="pwdMatchNote"
              className={
                !validMatch && matchFocus ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the provided password
            </p>

            <button
            type="submit"
              disabled={
                !validName || !validEmail || !validPwd || !validMatch
                  ? true
                  : false
              }
            >
              SUBMIT
            </button>
          </form>

          <p>
            Already registered?
            <br />
            <span className="line">
              {/*Sign in link here*/}
              <Link to={"/login"}>Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
