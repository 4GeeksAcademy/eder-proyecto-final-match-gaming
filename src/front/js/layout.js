import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";

import { Home } from "./pages/home.jsx";
import { Login } from "./pages/login.jsx";
import { AgeVerification } from "./pages/age_verification.jsx";
import { Profile } from "./pages/profile.jsx";
import { Search } from "./pages/search.jsx";
import { SearchMatch } from "./pages/search_match.jsx";
import { MatchResults } from "./pages/match_results.jsx";
import { PlatformSelection } from "./pages/platform_selection.jsx";
import { GameSelection } from "./pages/game_selection.jsx";
import { RegistrationForm } from "./pages/registration_form.jsx";
import { GenreSelection } from "./pages/genre_selection.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>            
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<AgeVerification />} path="/age-verification" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Search />} path="/search" />
                        <Route element={<SearchMatch />} path="/search-match" />
                        <Route element={<MatchResults />} path="/match-results" />
                        <Route element={<PlatformSelection />} path="/platform-selection" />
                        <Route element={<GameSelection />} path="/game-selection" />
                        <Route element={<RegistrationForm />} path="/registration-form" />
                        <Route element={<GenreSelection />} path="/genre-selection" />
                        <Route element={<h1>Page Not Found</h1>} path="*"/>
                    </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
