// Models/PopularityVote.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace JsonApp.Server.Models
{
    public class PopularityVote
    {
        [Key]
        public int VoteID { get; set; }

        [ForeignKey("ObjectFile")]
        public int ObjectID { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }

        public string VoteType { get; set; }
        public DateTime VoteDate { get; set; } = DateTime.Now;
    }
}
