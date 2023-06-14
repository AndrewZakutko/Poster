using API.DTOs;

namespace API.Interfaces
{
    public interface ICommentSender
    {
        void SendComment(CommentDto commentDto);
    }
}