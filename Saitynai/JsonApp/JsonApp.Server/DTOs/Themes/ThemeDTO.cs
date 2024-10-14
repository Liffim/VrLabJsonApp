// DTOs/Themes/ThemeDTO.cs
using System;
using System.Collections.Generic;

namespace JsonApp.Server.DTOs.Themes
{
    public class ThemeDTO
    {
        public int ThemeID { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int? CreatedByUserID { get; set; }

        public DateTime DateCreated { get; set; }

        // Optional: Include related data if needed
        public string CreatedByUsername { get; set; }

        // For nested data, consider using separate DTOs or omit to prevent over-fetching
    }
}
