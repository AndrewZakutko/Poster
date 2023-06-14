import './Dashboard-First-Section.css';
import { Divider, Grid, Icon } from "semantic-ui-react";
import step1 from '../../../../images/Step1.jpg';
import step2 from '../../../../images/Step2.jpg';
import step3 from '../../../../images/Step3.jpg';
import step4 from '../../../../images/Step4.jpg';

function Dashboard_First_Section (ref: any) {
    return(
        <div className="create-channel-section" id='howToUse'>
            <h1 className="create-channel-section-header"><Icon name="help circle"></Icon> How to use it?</h1>
            <Grid className="create-channel-section-grid">
                <Grid.Row>
                    <Grid.Column width={4}>
                        <div className="create-channel-section-grid-column">
                            <Divider horizontal>Step 1</Divider>
                            <img className="create-channel-section-grid-column-image" src={step1} alt="" /> 
                            <Divider></Divider>
                            <h5>Create new telegram channel</h5>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <div className="create-channel-section-grid-column">
                            <Divider horizontal>Step 2</Divider>
                            <img className="create-channel-section-grid-column-image" src={step2} alt="" /> 
                            <Divider></Divider>
                            <h5>Find and add <i>@rocket_sender_bot</i> in subscribers of channel</h5>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <div className="create-channel-section-grid-column">
                            <Divider horizontal>Step 3</Divider>
                            <img className="create-channel-section-grid-column-image" src={step3} alt="" /> 
                            <Divider></Divider>
                            <h5>Give administrator rights to telegram bot</h5>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <div className="create-channel-section-grid-column">
                            <Divider horizontal>Step 4</Divider>
                            <img className="create-channel-section-grid-column-image" src={step4} alt="" /> 
                            <Divider></Divider>
                            <h5>Start use sender</h5>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default Dashboard_First_Section;