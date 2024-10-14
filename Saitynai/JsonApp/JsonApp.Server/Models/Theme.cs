// Models/Theme.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JsonApp.Server.Models
{
    public class Theme
    {
        [Key]
        public int ThemeID { get; set; }

        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        public string Description { get; set; }

        public int? CreatedByUserID { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.Now;

    }
}
