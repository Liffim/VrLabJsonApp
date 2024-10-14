// Models/Comment.cs
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JsonApp.Server.Models
{
    public class Comment
    {
        [Key]
        public int CommentID { get; set; }

        [ForeignKey("ObjectFile")]
        public int ObjectID { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }

        public string Content { get; set; }

        public DateTime DateCommented { get; set; } = DateTime.Now;

    }
}
