using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace JsonApp.Server.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        [Required]
        public string Username { get; set; }  // Unique

        [Required]
        public string Email { get; set; }     // Unique

        [Required]
        public string PasswordHash { get; set; }
        public DateTime DateJoined { get; set; } = DateTime.Now;
        public string Role { get; set; } = "member";

    }
}
