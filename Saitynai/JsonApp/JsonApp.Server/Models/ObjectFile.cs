// Models/ObjectFile.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JsonApp.Server.Models
{
    public class ObjectFile
    {
        [Key]
        public int ObjectID { get; set; }

        [Required]
        public int ThemeID { get; set; }

        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        public string Description { get; set; }

        public string FileContent { get; set; }

        public int? UploadedByUserID { get; set; }

        public DateTime DateUploaded { get; set; } = DateTime.Now;

        public int PopularityScore { get; set; } = 0;

    }
}
