import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  useDisclosure,
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  ModalFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon";
import { FaLock } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { FaExclamationCircle } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Auth({
  signinOpen,
  setSigninOpen,
  signupOpen,
  setSignupOpen,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = React.useState("");

  useEffect(() => {
    if (signinOpen) {
      onOpen();
      setSelected("login");
    }
    if (signupOpen) {
      onOpen();
      setSelected("sign-up");
    }
  }, [signinOpen, signupOpen]);

  const handleClose = () => {
    setSigninOpen(false);
    setSignupOpen(false);
    onClose();
  };

  const [showPass, setShowPass] = useState(false);

  const signinBlankData = { email: "", password: "" };
  const signupBlankData = { name: "", email: "", password: "" };
  const [signinData, setSigninData] = useState(signinBlankData);
  const [signupData, setSignupData] = useState(signupBlankData);

  function isBlank(data) {
    for (const k in data) {
      if (data[k].length === 0) return 1;
    }
    return 0;
  }

  const showToast = (msg, vnt) => {
    enqueueSnackbar(msg, {
      variant: vnt,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignin = async () => {
    if (isBlank(signinData)) {
      showToast("All fields are mandatory !", "error");
    } else {
      if (!validateEmail(signinData.email)) {
        showToast("Invalid Email!", "warning");
      } else {
        await fetch("http://localhost:8080/data/", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            const user = data.find((item) => item.email === signinData.email);
            if (user) {
              if (user.password === signinData.password) {
                dispatch({
                  type: "LOGIN_SUCCESS",
                  payload: JSON.stringify(user),
                });
                showToast("Sign in Successfull", "success");
                navigate("/home");
              } else {
                showToast("Wrong Password!", "error");
              }
            } else {
              showToast("User does not exist!", "error");
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  async function isExist(email) {
    return false;
  }

  const handleSignup = () => {
    if (isBlank(signupData)) {
      showToast("All fields are mandatory !", "error");
    } else {
      if (!validateEmail(signupData.email)) {
        showToast("Invalid Email!", "warning");
      } else {
        fetch("http://localhost:8080/data/", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            const user = data.find((item) => item.email === signupData.email);
            if (user) {
              showToast("User Already Exist!", "warning");
            } else {
              const postData = {
                name: signupData.name,
                email: signupData.email,
                password: signupData.password,
                todos: [],
              };
              fetch("http://localhost:8080/data", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
              })
                .then((res1) => {
                  res1.json();
                })
                .then(() => {
                  showToast("Sign Up Successfull!", "success");
                  dispatch({
                    type: "LOGOUT",
                  });
                  navigate("/home");
                })
                .catch((err) => console.log(err));
            }
          });
      }
    }
  };

  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={handleClose}
        classNames={{ closeButton: "hidden" }}
      >
        <ModalContent>
          <div className="flex flex-col w-full">
            <Card className="max-w-full bg-[#333]">
              <CardBody
                className={`overflow-hidden ${
                  selected === "sign-up" ? "h-[28rem]" : ""
                }`}
              >
                <Tabs
                  fullWidth
                  size="lg"
                  aria-label="Tabs form"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                  classNames={{ cursor: "bg-[#006fee]" }}
                >
                  <Tab key="login" title="Login">
                    <form className="flex flex-col gap-4">
                      <label
                        for="signin-email"
                        className="text-white text-small"
                      >
                        Email
                      </label>
                      <Input
                        isRequired
                        id="signin-email"
                        placeholder="Enter your email"
                        type="email"
                        labelPlacement="outside"
                        startContent={
                          <MailIcon className="text-2xl pointer-events-none flex-shrink-0" />
                        }
                        onChange={(e) =>
                          setSigninData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                      <label
                        for="signin-pass"
                        className="text-white text-small"
                      >
                        Password
                      </label>
                      <Input
                        isRequired
                        id="signin-pass"
                        placeholder="Enter your password"
                        type={showPass ? "text" : "password"}
                        labelPlacement="outside"
                        startContent={
                          <FaLock className="text-2xl  pointer-events-none flex-shrink-0" />
                        }
                        endContent={
                          <div
                            onClick={() => setShowPass(!showPass)}
                            className="hover:cursor-pointer"
                          >
                            {showPass ? (
                              <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            ) : (
                              <IoMdEye className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            )}
                          </div>
                        }
                        onChange={(e) =>
                          setSigninData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                      />
                      <p className="text-center text-white text-small">
                        Need to create an account?{" "}
                        <Link
                          size="sm"
                          onPress={() => setSelected("sign-up")}
                          className="hover:cursor-pointer"
                        >
                          Sign up
                        </Link>
                      </p>

                      <div className="flex gap-2 justify-end">
                        <Button
                          fullWidth
                          color="primary"
                          onClick={handleSignin}
                        >
                          Login
                        </Button>
                      </div>
                    </form>
                  </Tab>
                  <Tab key="sign-up" title="Sign up">
                    <form className="flex flex-col gap-4 h-[300px]">
                      <label for="name" className="text-white text-small">
                        Name
                      </label>
                      <Input
                        isRequired
                        id="name"
                        placeholder="Enter your name"
                        labelPlacement="outside"
                        type="text"
                        startContent={
                          <IoPersonSharp className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                      <label
                        for="signup-email"
                        className="text-white text-small"
                      >
                        Email
                      </label>
                      <Input
                        isRequired
                        id="signup-email"
                        placeholder="Enter your email"
                        type="email"
                        labelPlacement="outside"
                        startContent={
                          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                      <label
                        for="signup-pass"
                        className="text-white text-small"
                      >
                        Password
                      </label>
                      <Input
                        isRequired
                        id="signup-pass"
                        placeholder="Enter your password"
                        type={showPass ? "text" : "password"}
                        labelPlacement="outside"
                        startContent={
                          <FaLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        endContent={
                          <div
                            onClick={() => setShowPass(!showPass)}
                            className="hover:cursor-pointer"
                          >
                            {showPass ? (
                              <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            ) : (
                              <IoMdEye className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            )}
                          </div>
                        }
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                      />
                      <p className="text-center text-small text-white">
                        Already have an account?{" "}
                        <Link
                          size="sm"
                          onPress={() => setSelected("login")}
                          className="hover:cursor-pointer"
                        >
                          Login
                        </Link>
                      </p>

                      <div className="flex gap-2 justify-end">
                        <Button
                          fullWidth
                          color="primary"
                          onClick={handleSignup}
                        >
                          Sign up
                        </Button>
                      </div>
                    </form>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
