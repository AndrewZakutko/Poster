import './WorkspacePage.css';
import NavBar from './components/nav-bar/NavBar';
import { useEffect, useState } from 'react';
import Channel from '../../models/channel';
import { Accordion, Button, Checkbox, Dropdown, Form, Icon, Input, List, Loader, Message, Popup, Step } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import ChatService from '../../services/chat.service';
import 'draft-js/dist/Draft.css';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Buffer } from "buffer";
import { AnonymousCredential, BlobServiceClient } from '@azure/storage-blob';
import axios from 'axios';
import config from '../../config';

(window as any).Buffer = Buffer;

function WorkspacePage (this: any) {
    const [sasToken] = useState(config.sasToken)
    const [channels, setChannels] = useState<Channel[]>();
    const [isActive, setIsActive] = useState(false);
    const [successfulResponseMessage, setSuccessfulResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const chatService = new ChatService();

    const [step, setStep] = useState(1);
    const [chats, setChats] = useState<{ key: number; url: string }[]>([]);
    const [selectedChats, setSelectedChats] = useState<string[]>([]);
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageNotUsing, setImageNotUsing] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoNotUsing, setVideoNotUsing] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [isUploadActive, setIsUploadActive] = useState(false);

    const modules = {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["link"],
        ]
    };

    const formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ];

    const handleProcedureContentChange = (content: any) => {
        if(content === '<p><br></p>') {
            setContent('');
        }
        else {
            setContent(content);
        }
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (selectedChats.length === 0) {
                alert("Please select at least one chat.")
                return;
            }
        }
    
        if (step === 2 && content.trim().length === 0) {
            alert("Enter your post text.")
            return;
        }
    
        if (step === 3 && !imageNotUsing && imageUrl === null) {
            alert("Add an image or check the checkbox that you won't use an image.")
            return;
        }
        

        if (step === 3 && imageUrl !== null) {
            setVideoNotUsing(true);
            setStep(step + 1);
        }
    
        if (step === 4 && !videoNotUsing && videoUrl === null) {
            alert("Add an video or check the checkbox that you won't use an video.")
            return;
        }
    
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleClick = () => {
        setIsActive(!isActive);
    };

    const { handleSubmit, setValue, formState: { errors } } = useForm();

    const handleChange = (event: any) => {
        setValue(event.target.name, event.target.value);
    };

    const uploadImageToBlobStorage = async () => {
        setIsUploadActive(true);
        const containerName = config.imagesContainerName;
      
        const blobServiceClient = new BlobServiceClient(`${config.blobUrl}${sasToken}`, new AnonymousCredential());
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobName = imageFile!.name;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      
        await blockBlobClient.uploadData(imageFile!, {
          blobHTTPHeaders: { blobContentType: imageFile!.type },
        });

        setImageUrl(blockBlobClient.url);
        setIsUploadActive(false);
    };

    const uploadVideoToBlobStorage = async () => {
        setIsUploadActive(true);
        const containerName = config.videosContainerName;
    
        const blobServiceClient = new BlobServiceClient(`${config.blobUrl}${sasToken}`, new AnonymousCredential());
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobName = videoFile!.name;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
        await blockBlobClient.uploadData(videoFile!, {
        blobHTTPHeaders: { blobContentType: videoFile!.type },
        });

        setVideoUrl(blockBlobClient.url);
        setIsUploadActive(false);
    };

    const getAllChats = async () => {
        const response = await chatService.getAllChats();
        setChannels(response.data);
        const updatedChats = response.data.map((channel:any, index: any) => ({
            key: index,
            id: channel.id,
            url: channel.url,
        }));
        setChats(updatedChats);
    }

    const onAddChatUrlSubmit = async (data: any) => {
        try {
            const response = await chatService.addChat(data);
            setSuccessfulResponseMessage(response.data);
            setIsActive(false);
            getAllChats();
        }
        catch (error: any) {
            setErrorMessage(error.response.data);
            setIsActive(false);
        }
    }

    const onDeleteChatClick = async (chatId: any) => {
        try {
            const response = await chatService.deleteChat(chatId);
            setSuccessfulResponseMessage(response.data);
            getAllChats();
        }
        catch (error: any) {
            setErrorMessage(error.response.data);
        }
    }

    const onConfirmAddingClick = () => {
        const model = {
            author: localStorage.getItem('username'),
            urls: selectedChats,
            content: content.replace(/<p>/gi, '\n\n').replace(/<\/p>/gi, ''),
            imageUrl: imageUrl,
            videoUrl: videoUrl
        }

        axios.post('https://localhost:5011/api/post/create', model);
        setDefaultAfterAdding();
    }

    const setDefaultAfterAdding = () => {
        setSelectedChats([]);
        setContent('');
        setImageUrl(null);
        setImageNotUsing(false);
        setVideoUrl(null);
        setVideoNotUsing(false);

        setStep(1);
    }
    
    useEffect(() => {   
        getAllChats();
        
        let timeoutId: any;

        if (successfulResponseMessage) {
            timeoutId = setTimeout(() => {
                setSuccessfulResponseMessage('');
            }, 3000);
        }

        if (errorMessage) {
            timeoutId = setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [successfulResponseMessage, errorMessage])

    const renderStepContent = () => {
        switch (step) {
          case 1:
            return (
                <div className='posts-management-steps-content'>
                    <Form>
                        <Form.Field>
                            <label>Select chats:</label>
                            <Dropdown
                            placeholder="Select chats"
                            fluid
                            multiple
                            selection
                            options={chats.map(chat => ({
                                key: chat.key,
                                text: chat.url,
                                value: chat.url
                            }))}
                            value={selectedChats}
                            onChange={(e, { value }) => setSelectedChats(value as string[])}
                            />
                        </Form.Field>
                    </Form>
                </div>
            );
          case 2:
            return (
                <div className='posts-management-steps-content'>
                    <label>Enter the content of your post:</label>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder="write your content ...."
                        value={content}
                        onChange={handleProcedureContentChange}
                    />
              </div>
            );
          case 3:
            return (
                <div className='posts-management-steps-content'>
                    <Form>
                        <Form.Field disabled={videoUrl !== null}>
                            <label>Upload image or check if not using:</label>
                            <div className="upload-container">
                                <Input type="file" onChange={(e) => setImageFile(e.target.files![0])} accept="image/png, image/gif, image/jpeg" disabled={imageNotUsing || imageUrl !== null}/>
                                <Popup disabled={imageNotUsing} content='Upload image' trigger={
                                    !isUploadActive ? (
                                        <Icon onClick={uploadImageToBlobStorage} disabled={imageFile === null} name='upload'></Icon>
                                    ) 
                                    : (
                                        <Icon><Loader active></Loader></Icon>
                                    )
                                } />
                            </div>
                        </Form.Field>
                        <Form.Field disabled={videoUrl !== null}>
                            <Checkbox
                                label="Don't use an image."
                                checked={imageNotUsing}
                                disabled={imageUrl !== null}
                                onChange={() => setImageNotUsing(!imageNotUsing)}
                            />
                        </Form.Field>
                    </Form>
                </div>
            );
          case 4:
            return (
                <div className='posts-management-steps-content'>
                <Form>
                    <Form.Field disabled={imageUrl !== null}>
                        <label>Upload video or check if not using:</label>
                        <div className="upload-container">
                            <Input type="file" onChange={(e) => setVideoFile(e.target.files![0])} accept="video/*" disabled={videoNotUsing || videoUrl !== null}/>
                            <Popup disabled={videoNotUsing} content='Upload video' trigger={
                                !isUploadActive ? (
                                    <Icon onClick={uploadVideoToBlobStorage} disabled={videoFile === null} name='upload'></Icon>
                                ) : (
                                    <Icon><Loader active></Loader></Icon>
                                )
                            } />
                        </div>
                    </Form.Field>
                    <Form.Field disabled={imageUrl !== null}>
                        <Checkbox
                        label="Don't use an video."
                        checked={videoNotUsing}
                        disabled={videoUrl !== null}
                        onChange={() => setVideoNotUsing(!videoNotUsing)}
                        />
                    </Form.Field>
                </Form>
            </div>
            );
          case 5:
            return (
                <div className='posts-management-steps-content'>
                    <Button onClick={onConfirmAddingClick} className='confirm-adding-btn' primary>Confirm Adding</Button>
                </div>
            );
          default:
            return null;
        }
      };

    return (
        <div className='workspacePage'>
            <NavBar />
            <h1 className="workspacePage-header">Workspace</h1>
            <div className='posts-management-wrapper'>
                <div className="chats-list">
                    <h1 className="chats-list-header">Your chats</h1>
                    <List>
                        <>
                        {channels && channels.map((channel) => (
                        <List.Item key={channel.id}>
                            <List.Icon name='telegram plane' />
                            <List.Content>{channel.url}</List.Content>
                            <Icon onClick={() => onDeleteChatClick(channel.id)} name='remove'></Icon>
                        </List.Item>
                        ))}
                        </>
                    </List>
                    <Accordion>
                        <Accordion.Title active={isActive} onClick={handleClick}>
                            <Popup content='Add chat url to your feed' trigger={<Icon name='add'></Icon>} />
                        </Accordion.Title>
                        <Accordion.Content active={isActive}>
                            <Form onSubmit={handleSubmit(onAddChatUrlSubmit)}>
                                <Form.Input pattern="@[\w]+" required label="Chat url:" placeholder="@chat_url" name="chatUrl" onChange={handleChange} error={!!errors.input}/>
                                <Button type="submit">Add chat</Button>
                            </Form>
                        </Accordion.Content>
                    </Accordion>
                    {successfulResponseMessage && (
                        <Message color='blue'>
                            <Message.Header >{successfulResponseMessage}</Message.Header>
                        </Message>
                    )}
                    {errorMessage && (
                        <Message color='red'>
                            <Message.Header >{errorMessage}</Message.Header>
                        </Message>
                    )} 
                </div>
                <div className="posts-management">
                    <h1 className="posts-management-header">Add new Post</h1>
                    <div className='posts-management-steps'>
                        <Step.Group ordered>
                            <Step active={step === 1} completed={selectedChats.length > 0}>
                                <Step.Content>
                                    <Step.Title>Chats</Step.Title>
                                    <Step.Description>Select the chats</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step disabled={step === 1} active={step === 2} completed={content.trim().length > 0}>
                                <Step.Content>
                                    <Step.Title>Content</Step.Title>
                                    <Step.Description>Enter the content of your post</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step disabled={step === 1 || step === 2} active={step === 3} completed={imageUrl !== null || imageNotUsing}>
                                <Step.Content>
                                    <Step.Title>Image</Step.Title>
                                    <Step.Description>Upload image</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step disabled={step === 1 || step === 2 || step === 3} active={step === 4} completed={videoUrl !== null || videoNotUsing}>
                                <Step.Content>
                                    <Step.Title>Video</Step.Title>
                                    <Step.Description>Upload video</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step disabled={step === 1 || step === 2 || step === 3 || step === 4} active={step === 5}>
                                <Step.Content>
                                    <Step.Title>Confirm adding</Step.Title>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                        <div>{renderStepContent()}</div>
                        <div className='posts-management-steps-btns'>
                            <Button disabled={step === 1} onClick={handlePreviousStep}>Previous</Button>
                            <Button disabled={step === 5} onClick={handleNextStep}>Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkspacePage;