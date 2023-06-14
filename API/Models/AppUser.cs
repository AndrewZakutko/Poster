using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }
        public string Index { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public ICollection<AppUserRole> UserRoles { get; set; } = new List<AppUserRole>();
        public ICollection<Chat> Chats { get; set; } = new List<Chat>();
    }
}