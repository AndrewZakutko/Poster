import React from "react";
import './Dashboard-Second-Section.css';
import { Grid, Icon, Image, List } from "semantic-ui-react";
import image from '../../../images/telegram-channel-1.webp';

function Dashboard_Second_Section () {
    return (
        <div className="second-section">
            <h1 className="second-section-header">Stay connected with your readers &mdash; <br /> wherever they are</h1>
            <Grid className="second-section-grid">
                <Grid.Row>
                    <Grid.Column width={6}>
                        <div className="second-section-grid-text">
                            <h2> <Icon name="suitcase"></Icon> Manage all your posts from our site to make your work easy and fast</h2>
                            <br />
                            <p>The site allows you to enable, delete telegram channels to work with them and create various types of posts through our site. 
                                All the best qualities for convenient work with the channel are provided by our application.
                            </p>
                            <p><i>For questions - contact our support 24/7</i></p>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <img src={image} className="second-section-image" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid className="second-section-grid-1">
                <Grid.Row>
                    <Grid.Column width={8}>
                        <h2><Icon name="wait"></Icon> Fast using</h2>
                        <p className="text">The application allows you to speed up the generation of posts in Telegram. 
                            Posts can be of 3 types - a regular text post, a post using pictures and text, as well as using video
                        </p>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h2><Icon name="hand point up"></Icon> Application simplicity</h2>
                        <p className="text">The app itself is very easy to use and work with. All you need to do is register or log into your account 
                            and go to the post creator.
                        </p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <h2><Icon name="check circle"></Icon> Create beautiful posts</h2>
                        <p className="text">Create posts for every taste using our text editor using the available emoticons.</p>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h2><Icon name="wait"></Icon> Work with multiple channels at the same time</h2>
                        <p className="text">The application allows you to work with several channels that the user will add. The same post can be fasted in several channels at the same time.</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default Dashboard_Second_Section;