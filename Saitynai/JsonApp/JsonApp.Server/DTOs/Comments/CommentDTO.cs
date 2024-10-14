// DTOs/Comments/CommentDTO.cs
using System;

namespace JsonApp.Server.DTOs.Comments
{
    public class CommentDTO
    {
        public int CommentID { get; set; }

        public int ThemeID { get; set; }

        public int UserID { get; set; }

        public string Content { get; set; }

        public DateTime DateCommented { get; set; }

        // Optional: Include related data
        public string Username { get; set; }

        public string ThemeTitle { get; set; }
    }
}
