using API.DTOs;
using API.Models;

namespace API.Interfaces
{
    public interface IChatRepository
    {
        bool AddNewChat(CreateChatDto createChatDto);
        bool DeleteChatById(int chatId);
        bool UpdateChatUrl(ChatDto chatDto);
        ICollection<Chat> GetUserChats(string userName);
        bool IfChatAlreadyExists(string chatUrl);
    }
}