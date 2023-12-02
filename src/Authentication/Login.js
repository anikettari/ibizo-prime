import React, { useState, useEffect } from "react";
import { provider } from "../Firebase/Config";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../Firebase/Config";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();

const WelcomeText = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: 2,
      opacity: 0.8,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 50,
        damping: 5,
      },
    });
  }, [controls]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={controls}
      className="text-center"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>Welcome to Ibizo Prime</h1>
      <p>Watch More. Watch Better.</p>
    </motion.div>
  );
};

const Login = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginType, setLoginType] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          cookies.set("user", JSON.stringify(user));
          navigate("/home");
        }
      );
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider).then((data) => {
        cookies.set("user", JSON.stringify(data?.user));
        navigate("/home");
      });
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  const handleToogle = () => {
    setLoginType(!loginType);
  };

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    if (confirmPassword !== password) {
      toast.error("Password does not match.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (!isEmailValid) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            const user = userCredential.user;
            cookies.set("user", JSON.stringify(user));
            navigate("/home");
          }
        );
      } catch (error) {
        console.error("Error logging in:", error.message);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <Container
      fluid
      style={{
        background: "linear-gradient(to right, #6889c0, #33466e)",
        color: "white",
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Row>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center vh-100 d-none d-md-block"
        >
          <WelcomeText />
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center vh-100 "
        >
          <Form>
            {!loginType ? (
              <>
                <h2 className="text-center mb-2">Login</h2>
                <Form.Group className="mt-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </>
            ) : (
              <>
                <h2 className="text-center mb-2">Sign In</h2>
                <Form.Group className="mt-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-3" controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
            {!loginType ? (
              <Button variant="primary m-3 " onClick={handleLogin}>
                Login
              </Button>
            ) : (
              <Button variant="primary m-3 " onClick={handleSignUp}>
                Sign In
              </Button>
            )}

            <Button
              variant="primary"
              className="m-3"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </Button>

            <p className="text-center">
              {loginType ? "Already have an account" : "Dont have an account ?"}
              <Button variant="link" onClick={handleToogle}>
                {!loginType ? "Sign Up" : "Login"}
              </Button>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
