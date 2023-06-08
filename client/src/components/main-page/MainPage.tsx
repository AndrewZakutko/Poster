import React, { useRef } from "react";
import './MainPage.css'
import Dashboard from "../nav-bar/dashboard/Dashboard";
import Dashboard_First_Section from "./how-to-use-it/Dashboard-First-Section";
import Dashboard_Second_Section from "./stay-in-touch/Dashboard-Second-Section";
import Dashboard_Third_Section from "./general-info/Dashboard-Third-Section";
import Support from "./support/Comment";

function MainPage () {
    return (
        <div className='mainPage'>
            <Dashboard_First_Section></Dashboard_First_Section>
            <Dashboard_Second_Section></Dashboard_Second_Section>
            <Dashboard_Third_Section></Dashboard_Third_Section>
            <Support></Support>
        </div>
    )
}

export default MainPage;