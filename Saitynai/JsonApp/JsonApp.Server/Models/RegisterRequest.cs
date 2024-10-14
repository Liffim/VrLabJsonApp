// Models/RegisterRequest.cs
using System.ComponentModel.DataAnnotations;

namespace JsonApp.Server.Models
{
    public class RegisterRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }
    }
}
