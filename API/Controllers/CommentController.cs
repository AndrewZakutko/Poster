using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CommentController : BaseApiController
    {
        private readonly ICommentSender _commentSender;
        public CommentController(ICommentSender commentSender)
        {
            _commentSender = commentSender;
        }

        [HttpPost("send")]
        public IActionResult SendNewComment(CommentDto commentDto)
        {
            _commentSender.SendComment(commentDto);
            return Ok();
        }
    }
}