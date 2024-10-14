// DTOs/Comments/CommentCreateDTO.cs
using System.ComponentModel.DataAnnotations;

namespace JsonApp.Server.DTOs.Comments
{
    public class CommentCreateDTO
    {
        [Required]
        public int ThemeID { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
