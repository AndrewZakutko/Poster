using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public string? ImageUrl { get; set; }
        [NotMapped]
        public string[] Urls { get; set; }
        public string? VideoUrl { get; set; }
        public DateTime? PablishedAt { get; set; }
    }
}