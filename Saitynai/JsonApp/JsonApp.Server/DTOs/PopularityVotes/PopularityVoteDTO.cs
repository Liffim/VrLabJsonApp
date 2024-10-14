// DTOs/PopularityVotes/PopularityVoteDTO.cs
namespace JsonApp.Server.DTOs.PopularityVotes
{
    public class PopularityVoteDTO
    {
        public int VoteID { get; set; }

        public int ThemeID { get; set; }

        public int UserID { get; set; }

        // Optional: Include related data
        public string Username { get; set; }

        public string ThemeTitle { get; set; }
    }
}
