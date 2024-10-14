// DTOs/Authentication/LoginRequestDTO.cs
using System.ComponentModel.DataAnnotations;

namespace JsonApp.Server.DTOs.Authentication
{
    public class LoginRequestDTO
    {
        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Username { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Password { get; set; }
    }
}
