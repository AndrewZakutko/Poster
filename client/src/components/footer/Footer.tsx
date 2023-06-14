import React from "react";
import './Footer.css';
import { Button, Divider, Icon } from "semantic-ui-react";

function Footer () {
    return(
        <div className="footer">
            <div className="footer-left-items">
                <h2>SENDmaster</h2>
                <div className="footer-btns">
                    <Button circular color='blue' icon='telegram' />
                    <Button circular color='orange' icon='instagram' />
                    <Button circular color='google plus' icon='google plus' />
                </div>
            </div>
            <div className="footer-right-items">
                <h4>Contact us:</h4>
                <p><i>+380 099 1234 345</i>, <i> +380 066 1234 345</i></p>
            </div>
        </div>  
    )
}

export default Footer;