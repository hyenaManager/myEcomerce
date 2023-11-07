import React, { Suspense, lazy, useEffect } from "react";
import { useState } from "react";
import "./App.css";
import "./CSS/home.css";
import "./CSS/items.css";
import "./CSS/message.css";
import "./CSS/nav.css";
import "./CSS/orders.css";
import "./CSS/setting.css";
import "./CSS/userInbox.css";
import { user_datas } from "./components/datas";
import { CurrentUser, ThemeContext } from "./components/themeContext";

import { Outlet, Route, Routes, useLocation } from "react-router-dom";
const Home = lazy(() => import("./components/home"));
const Carts = lazy(() => import("./components/cartOptions"));
const MessageBox = lazy(() => import("./components/message"));
const OrderList = lazy(() => import("./components/orders"));
const Login = lazy(() => import("./components/login"));
const Register = lazy(() => import("./components/register"));
const UserInbox = lazy(() => import("./components/userInbox"));

const ItemDetail = lazy(() => import("./components/itemDetail"));
const ErrorPage = lazy(() => import("./error-page"));
const NavBarMobo = lazy(() => import("./components/pureNav"));
const Setting = lazy(() => import("./components/setting"));
const PolicyTerms = lazy(() => import("./components/eStorePolicy"));
const Privacy = lazy(() => import("./components/privacyEdit"));
import DefaultPage from "./components/defaultPage";
import { AnimatePresence } from "framer-motion";
import ThemePen, { SelectTheme } from "./components/themeChanger";

let userId = 2;
export default function App() {
  const [userDatas, setUserDatas] = useState(user_datas);
  const [navbarLoading, setNavbarLoading] = useState(true); //show home page after nav bar is loaded
  const [user, setUser] = useState(userDatas[0]);
  const [messages, setMessages] = useState([]);
  const [myTheme, setMyTheme] = useState("aqua");
  const [showTheme, setShowTheme] = useState(false);

  function ThemeVisible() {
    setShowTheme(!showTheme);
  }
  function setTheme(color) {
    setMyTheme(color);
  }
  function changeProfilePicture(picture) {
    setUserDatas(
      userDatas.map((user_data) => {
        if (user_data.user_id === user.user_id) {
          return {
            ...user_data,
            profile_picture: picture,
          };
        }
        return user_data;
      })
    );
    setUser({
      ...user,
      profile_picture: picture,
    });
  }

  //when login is success successLogin()
  function successLogin(userName) {
    setUser(userDatas.find((user) => user.user_name === userName));
  }
  function onLogout() {
    setUser(null);
  }
  //////////userInbox message functions/////////
  ///////////registration functions/////////
  function createUser(newUser) {
    setUserDatas((userDatas) => [
      ...userDatas,
      {
        user_id: userId++,
        user_name: newUser.user_name,
        email: newUser.email,
        password: newUser.password,
        address: newUser.address,
        phone_number: newUser.phone_number,
        profile_picture: "/src/svgs/1.svg",
      },
    ]);
    setUser(newUser);
  }

  /////////MessageBox Functions Start///////////
  function onSendMessage(messageObj) {
    setMessages((messages) => [
      ...messages,
      {
        user_name: messageObj.name,
        title: messageObj.title,
        message: messageObj.message,
      },
    ]);
  }
  useEffect(() => {
    setTimeout(() => {
      return setNavbarLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <ThemeContext.Provider value={myTheme}>
        <CurrentUser.Provider value={user}>
          <div className="mainApp">
            <NavBarMobo />

            <Outlet />
            <AnimatePresence>
              {showTheme ? <SelectTheme setTheme={setTheme} /> : null}
            </AnimatePresence>
            <ThemePen showOrHideTheme={ThemeVisible} />
          </div>
          <AnimatePresence>
            <Routes>
              <Route
                path="/"
                element={
                  navbarLoading ? (
                    <DefaultPage />
                  ) : (
                    <Suspense fallback={<DefaultPage />}>
                      <Home />
                    </Suspense>
                  )
                }
                errorElement={<ErrorPage />}
              />

              <Route
                path="Cart"
                element={
                  <Suspense fallback={<DefaultPage />}>
                    <Carts />
                  </Suspense>
                }
              />
              <Route
                path="message"
                element={
                  <Suspense fallback={<DefaultPage />}>
                    <MessageBox user={user} onSendMessage={onSendMessage} />
                  </Suspense>
                }
              />
              <Route
                path="order-list"
                element={
                  <Suspense fallback={<DefaultPage />}>
                    <OrderList />
                  </Suspense>
                }
              />
              <Route
                path="setting/login"
                element={
                  <Suspense fallback={<DefaultPage />}>
                    <Login userDatas={userDatas} isLogin={successLogin} />
                  </Suspense>
                }
              />
              <Route
                path="setting/login/register"
                element={
                  <Suspense fallback={<DefaultPage />}>
                    <Register userDatas={userDatas} createUser={createUser} />
                  </Suspense>
                }
              />
              <Route
                path="inbox"
                element={
                  <Suspense fallback={<DefaultPage />}>
                    <UserInbox />
                  </Suspense>
                }
              />
              <Route
                path="detail/:id"
                element={
                  <Suspense fallback={<DefaultPage />}>
                    <ItemDetail />
                  </Suspense>
                }
              />
              <Route
                path="setting"
                element={
                  <Suspense fallback={<DefaultPage />}>
                    <Setting onLogout={onLogout} />
                  </Suspense>
                }
              />
              <Route
                path="setting/policy"
                element={
                  <Suspense fallback={<DefaultPage />}>
                    <PolicyTerms />
                  </Suspense>
                }
              />
              <Route
                path="setting/privacy"
                element={
                  <Suspense fallback={<DefaultPage />}>
                    <Privacy changeProfilePicture={changeProfilePicture} />
                  </Suspense>
                }
              />
            </Routes>
          </AnimatePresence>
        </CurrentUser.Provider>
      </ThemeContext.Provider>
    </>
  );
}
