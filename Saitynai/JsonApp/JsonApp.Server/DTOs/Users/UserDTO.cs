// DTOs/Users/UserDTO.cs
using System;

namespace JsonApp.Server.DTOs.Users
{
    public class UserDTO
    {
        public int UserID { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        public DateTime DateJoined { get; set; }
    }
}
