// Models/LoginRequest.cs
using System.ComponentModel.DataAnnotations;

namespace JsonApp.Server.Models
{
    public class LoginRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Username { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Password { get; set; }
    }
}
