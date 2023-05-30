using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string AuthorName { get; set; }
        public string Information { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string? PhotoUrl { get; set; }
        public string? VideoUrl { get; set; }
        public DateTime? PublishedAt { get; set; }
        public DateTime? EditedAt { get; set; }
    }
}