import React from "react";
import { CSSTransition } from "react-transition-group";
import { getUserFromCanister } from "../utils";
import { Media } from "../views/Media";
import { DropDayNotification } from "./DropDayNotification";
import { RewardShowerNotification } from "./RewardShowerNotification";
import { MainNav } from "./MainNav";
import { Route } from "react-router-dom";

function wrapPrivateRouteWithSlide(render) {
  return ({ match }) => (
    <CSSTransition
      in={match != null}
      timeout={250}
      classNames="page-slide"
      unmountOnExit
    >
      <div className="page-slide">{render({ match })}</div>
    </CSSTransition>
  );
}

export function SingleImage({
  videoHash,
  user,
  isAuthenticated,
  setUser,
  logOut,
}) {
  function refreshProfileInfo() {
    getUserFromCanister(user?.userName).then((user) => {
      if (user) {
        setUser(user);
      }
    });
  }

  const privateRoutes = [
    {
      path: "/Media/:videoHash",
      render: ({ match }) => (
        <Media currentUser={user} />
      ),
    },
  ];
  const privatePaths = privateRoutes.map(({ path }) => path);

  return (
    <Route path={privatePaths}>
      {(
        <>
          <DropDayNotification />
          <RewardShowerNotification currentUser={user} />
          <MainNav paths={privatePaths} />
              <Route key={privateRoutes[0].path} path={privateRoutes[0].path}>
                {wrapPrivateRouteWithSlide(privateRoutes[0].render)}
              </Route>
        </>
      )}
    </Route>
  );
}
