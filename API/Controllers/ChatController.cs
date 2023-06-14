using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Models;

namespace API.Controllers
{
    public class ChatController : BaseApiController
    {
        private readonly IChatRepository _chatRepository;
        public ChatController(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        [HttpPost("addChat")]
        public async Task<IActionResult> AddChat(CreateChatDto createChatDto)
        {
            if (_chatRepository.IfChatAlreadyExists(createChatDto.ChatUrl)) {
                return BadRequest("This chat has already been added!");
            }

            var isSuccess = _chatRepository.AddNewChat(createChatDto);

            if(isSuccess) return Ok("Chat added successfully!");
            else return BadRequest("Error adding chat!");
        }

        [HttpDelete("delete/chatId={chatId}")]
        public async Task<IActionResult> DeleteChat(int chatId)
        {
            var isSuccess = _chatRepository.DeleteChatById(chatId);

            if(isSuccess) return Ok("Chat deleted successfully!");
            else return BadRequest("Error deleting chat!");
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateChat(ChatDto chatDto)
        {
            var isSuccess = _chatRepository.UpdateChatUrl(chatDto);

            if(isSuccess) return Ok();
            else return BadRequest();
        }

        [HttpGet("{username}")]
        public ICollection<Chat> GetUserChats(string userName)
        {
            return _chatRepository.GetUserChats(userName);
        }
    }
}