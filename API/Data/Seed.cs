using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Enums;
using API.Models;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context) 
        {
            if(context.Posts.Any() || context.PostTypes.Any()) return;

            var posts = new List<Post> 
            {
                new Post
                {
                    Title = "What do you think about it?",
                    SubTitle = "We are creating our new technology...",
                    AuthorName = "Laly Black",
                    Information = "Today, we are working on ...",
                    Type = PostTypes.Simple.ToString(),
                    Status = PostStatus.InProcess.ToString(),
                },
                new Post
                {
                    Title = "All about .Net",
                    SubTitle = "Overview .Net platform",
                    AuthorName = "John Smith",
                    Information = "Today, we are working on ...",
                    Type = PostTypes.Simple.ToString(),
                    Status = PostStatus.InProcess.ToString(),
                },
                new Post
                {
                    Title = "All about Python",
                    SubTitle = "What python does provide us?",
                    AuthorName = "Jony Blackwood",
                    Information = "Today, we are working on ...",
                    Type = PostTypes.Simple.ToString(),
                    Status = PostStatus.InProcess.ToString(),
                },
                new Post
                {
                    Title = "All about Java",
                    SubTitle = "Jave is the most famous language in the world",
                    AuthorName = "Nata Rocket",
                    Information = "Today, we are working on ...",
                    Type = PostTypes.Simple.ToString(),
                    Status = PostStatus.InProcess.ToString(),
                },
                new Post
                {
                    Title = "How does a sugar kill us?",
                    SubTitle = "Very imprortant thing",
                    AuthorName = "Vova Golovko",
                    Information = "Today, we are working on ...",
                    Type = PostTypes.Simple.ToString(),
                    Status = PostStatus.InProcess.ToString(),
                },
            };

            var postTypes = new List<PostType>
            {
                new PostType 
                {
                    Value = "Simple"
                },
                new PostType 
                {
                    Value = "Photo"
                },
                new PostType 
                {
                    Value = "Video"
                },
            };

            await context.Posts.AddRangeAsync(posts);
            await context.PostTypes.AddRangeAsync(postTypes);

            await context.SaveChangesAsync();
        }
    }
}