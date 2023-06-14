import axios from 'axios';

class ChatService {
    api: any;
    constructor() {
      this.api = axios.create({
        baseURL: 'https://localhost:5011/api/chat',
      });
    }

    getAllChats() {
      return this.api.get(`/${localStorage.getItem('username')}`);
    }

    addChat(chatUrl: any) {
      const addChatData: any = {
        UserName: localStorage.getItem('username'),
        ChatUrl: chatUrl.chatUrl
      }
      return this.api.post('/addChat', addChatData);
    }

    deleteChat(chatId: any) {
      return this.api.delete(`delete/chatId=${chatId}`);
    }
}

export default ChatService;