// DTOs/Authentication/RegisterRequestDTO.cs
using System.ComponentModel.DataAnnotations;

namespace JsonApp.Server.DTOs.Authentication
{
    public class RegisterRequestDTO
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
