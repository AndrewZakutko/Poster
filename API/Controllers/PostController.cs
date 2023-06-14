using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Models;

namespace API.Controllers
{
    public class PostController : BaseApiController
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet("{username}")]
        public ICollection<Post> GetAll(string username)
        {
            return _postRepository.GetPosts(username);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(Post post) 
        {
            var result = await _postRepository.CreateNewsPost(post);

            if(result) return Ok();
            else return BadRequest();
        }
    }
}