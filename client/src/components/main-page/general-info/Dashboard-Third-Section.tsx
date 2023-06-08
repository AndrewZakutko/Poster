import React from "react";
import './Dashboard-Third-Section.css';
import telegram from '../../../images/telegram.webp';
import { Divider } from "semantic-ui-react";

function Dashboard_Third_Section () {
    return (
        <div className="dashboard-third-section" id="generalInfo">
            <h1 className="dashboard-third-section-header">General information about Telegram</h1>
            <img src={telegram} className="dashboard-third-section-image" />
            <div className="dashboard-third-section-content">
                <h2>What is Telegram?</h2>
                <Divider />
                <p>
                    Telegram is an instant messaging tool that allows you to send and receive messages from your contacts even without sharing your phone number. 
                    It does this through a communications protocol known as MTProto that gives you the ability to open different sessions on multiple devices without being connected at the same time.
                    The program was created in 2013 by brothers Pavel and Nicolai Durov as an alternative way to communicate outside WhatsApp. This is how you can send from messages, video files, voice notes and much more using its own cloud.
                    It also offers you end-to-end encryption so no one else can know what you’re talking about. 
                </p>
                <h2>What can you use Telegram for?</h2>
                <Divider />
                <ol>
                    <li>
                        <h4>Sending messages</h4>
                        <p>
                            Of course, being an instant messaging platform it allows you to send and receive messages to and from your contacts. You don’t need to share your phone number, in fact, you can hide it to protect your privacy.
                            Telegram gives you the possibility to create your own username so you can be found through its search engine. You only need to know people’s username and you will find them in a few seconds.
                            You can send videos, audios, texts, make unlimited video calls with many participants. All this on your cell phone or computer.
                        </p>
                    </li>
                    <br />
                    <li>
                        <h4>Storing files</h4>
                        <p>
                            Without a doubt this is one of the most important advantages offered by Telegram. 
                            The platform has its own cloud, so all messages and files you have in chats will be stored until you delete them yourself. 
                            How much can you save? The amount you want, its capacity is infinite and you will store videos, audios and any audiovisual document.
                            Create specific chats to divide them into different themes. An example would be: family photos, work items and more.
                            Is there a limit when sending a file? Yes, the size cannot exceed 15 GB, but this is enough capacity for almost any document.
                        </p>
                    </li>
                    <br />
                    <li>
                        <h4>Create super groups</h4>
                        <p>
                            Creating groups is a basic feature of any instant messaging app, but super groups are something very different.
                            With WhatsApp you can create groups with a maximum of 250 members and it has not updated this requirement for a long time. Do you know what the limit is that Telegram offers you? More than 20,000 members.
                            Which is a real wonder, and there are people like you who work in giant organizations that need to be in constant contact. 
                            With Telegram you will do so without any problems and without taking up space in the memory of your device. 
                        </p>
                    </li>
                    <br />
                    <li>
                        <h4>Creating channels</h4>
                        <p>
                            Telegram channels are a wonderful tool, especially if you have a digital venture.
                            It’s a one-way chat in which only the administrator will be able to send messages to their subscribers. The folders can be public or private and it works as a communication channel with a community.
                            The channels are wonderful for your brand, as they allow you to be in contact with potential customers, to let them know about the latest news of your products or services, as well as to know their opinions about improvements to make.
                        </p>
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default Dashboard_Third_Section; 