import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";

import ScrollToTop from "./component/scrollToTop.jsx";
import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

import { Home } from "./pages/home.jsx";
import  Login  from "./pages/login.jsx";
import { AgeVerification } from "./pages/age_verification.jsx";
import { Profile } from "./pages/profile.jsx";
import { Search } from "./pages/search.jsx";
import { SearchMatch } from "./pages/search_match.jsx";
import { MatchResults } from "./pages/match_results.jsx";
import { PlatformSelection } from "./pages/platform_selection.jsx";
import { GameSelection } from "./pages/game_selection.jsx";
import { RegistrationForm } from "./pages/registration_form.jsx";
import { GenreSelection } from "./pages/genre_selection.jsx";
import { CreateSession } from "./pages/create-session.jsx";
import { Session } from "./pages/session.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<AgeVerification />} path="/age-verification" />
            <Route element={<Profile />} path="/profile/:userId" />
            <Route element={<Search />} path="/search" />
            <Route element={<SearchMatch />} path="/search-match" />
            <Route element={<MatchResults />} path="/match-results/:id_game" />
            <Route element={<PlatformSelection />} path="/platform-selection" />
            <Route element={<GameSelection />} path="/game-selection" />
            <Route element={<RegistrationForm />} path="/registration-form" />
            <Route element={<GenreSelection />} path="/genre-selection" />
            <Route element={<CreateSession/>} path="/create-session"/>
            <Route element={<Session/>} path="/session"/>
            <Route element={<h1>Page Not Found</h1>} path="*" />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
