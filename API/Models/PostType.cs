using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class PostType
    {
        [Key]
        public int Id { get; set; }
        public string Value { get; set; }
    }
}