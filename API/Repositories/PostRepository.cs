using API.Data;
using API.Interfaces;
using API.Models;
using System.Text.Json;

namespace API.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;
		private readonly IConfiguration _configuration;

		public PostRepository(DataContext context, IConfiguration configuration)
        {
            _context = context;
			_configuration = configuration;
		}

        public async Task<bool> CreateNewsPost(Post post)
        {
            if(post != null) {
                var requestBody = new { Author = post.Author, Content = post.Content, ImageUrl = post.ImageUrl, Urls = post.Urls, VideoUrl = post.VideoUrl };
                var requestBodyJson = JsonSerializer.Serialize(requestBody);

                var functionUrl = _configuration.GetSection("SenderFunctionUrl").Value;

                using (var client = new HttpClient())
                {
                    var request = new HttpRequestMessage(HttpMethod.Post, functionUrl);
                    request.Content = new StringContent(requestBodyJson, System.Text.Encoding.UTF8, "application/json");

                    var response = await client.SendAsync(request);

                    if(response.IsSuccessStatusCode) {
                        post.PablishedAt = DateTime.UtcNow;
                        _context.Posts.Add(post);
                        _context.SaveChanges();
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }

		public ICollection<Post> GetPosts(string username)
		{
			return _context.Posts.Where(x => x.Author == username).ToList();
		}
	}
}