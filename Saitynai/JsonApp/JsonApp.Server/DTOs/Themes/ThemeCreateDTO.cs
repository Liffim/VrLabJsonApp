// DTOs/Themes/ThemeCreateDTO.cs
using System.ComponentModel.DataAnnotations;

namespace JsonApp.Server.DTOs.Themes
{
    public class ThemeCreateDTO
    {
        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        public string Description { get; set; }
    }
}
