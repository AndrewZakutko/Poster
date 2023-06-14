using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Chat
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Url { get; set; }
        public AppUser AppUser { get; set; }
    }
}