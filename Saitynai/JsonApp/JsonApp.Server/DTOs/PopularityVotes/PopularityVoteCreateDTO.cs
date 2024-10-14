// DTOs/PopularityVotes/PopularityVoteCreateDTO.cs
using System.ComponentModel.DataAnnotations;

namespace JsonApp.Server.DTOs.PopularityVotes
{
    public class PopularityVoteCreateDTO
    {
        [Required]
        public int ThemeID { get; set; }
    }
}
