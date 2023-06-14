import './MainPage.css';
import Dashboard_First_Section from "./components/how-to-use-it/Dashboard-First-Section";
import Dashboard_Second_Section from "./components/stay-in-touch/Dashboard-Second-Section";
import Dashboard_Third_Section from "./components/general-info/Dashboard-Third-Section";
import Support from "./components/support/Comment";
import Dashboard from "./components/dashboard/Dashboard";

function MainPage () {
    return (
        <div className='mainPage'>
            <Dashboard />
            <Dashboard_First_Section></Dashboard_First_Section>
            <Dashboard_Second_Section></Dashboard_Second_Section>
            <Dashboard_Third_Section></Dashboard_Third_Section>
            <Support></Support>
        </div>
    )
}

export default MainPage;