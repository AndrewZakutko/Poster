using API.Data;
using API.DTOs;
using API.Interfaces;
using API.Models;

namespace API.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private readonly DataContext _context;
        public ChatRepository(DataContext context)
        {
            _context = context;
        }

        public bool AddNewChat(CreateChatDto createChatDto)
        {
            var user = _context.Users.Where(x => x.UserName == createChatDto.UserName).FirstOrDefault();
            if(user == null) return false;

            try {
                var chat = new Chat
                {
                    Url = createChatDto.ChatUrl,
                    AppUser = user
                };

                _context.Chats.Add(chat);
                _context.SaveChanges();

                return true;
            }
            catch {
                return false;
            }
        }

        public bool DeleteChatById(int chatId)
        {
            var chat = _context.Chats.Find(chatId);
            if(chat == null) return false;

            try {
                _context.Remove(chat);
                _context.SaveChanges();

                return true;
            }
            catch {
                return false;
            }
        }

        public bool IfChatAlreadyExists(string chatUrl)
        {
            if (_context.Chats.Where(x => x.Url == chatUrl).FirstOrDefault() != null) {
                return true;
            }

            return false;
        }

        public ICollection<Chat> GetUserChats(string userName)
        {
            return _context.Chats.Where(x => x.AppUser.UserName == userName).ToList();
        }

        public bool UpdateChatUrl(ChatDto chatDto)
        {
            var chatToUpdate = _context.Chats.Find(chatDto.Id);
            if(chatToUpdate == null) return false;

            try {
                chatToUpdate.Url = chatDto.Url;
                _context.SaveChanges();

                return true;
            }
            catch {
                return false;
            }
        }
    }
}