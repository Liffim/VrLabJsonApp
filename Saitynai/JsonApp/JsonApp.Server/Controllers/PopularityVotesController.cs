using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JsonApp.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using JsonApp.Server.Data;
using Microsoft.AspNetCore.Authorization;

namespace JsonApp.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PopularityVotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PopularityVotesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /api/popularityvotes
        /// <summary>
        /// Retrieves all popularity votes from the database.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PopularityVote>>> GetPopularityVotes()
        {
            return await _context.PopularityVotes.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<PopularityVote>> PostPopularityVote(PopularityVote vote)
        {
            // Check if a vote already exists for the same ObjectID and UserID
            var existingVote = await _context.PopularityVotes
                .FirstOrDefaultAsync(v => v.ObjectID == vote.ObjectID && v.UserID == vote.UserID);

            if (existingVote != null)
            {
                // Return a 409 Conflict response or another appropriate status code
                return Conflict("User has already voted for this object.");
            }

            // Set the vote date to the current time
            vote.VoteDate = DateTime.Now;

            // Add the new vote
            _context.PopularityVotes.Add(vote);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPopularityVote), new { id = vote.VoteID }, vote);
        }


        
        // GET: /api/popularityvotes/{id}
        /// <summary>
        /// Retrieves a specific popularity vote by ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<PopularityVote>> GetPopularityVote(int id)
        {
            var vote = await _context.PopularityVotes.FindAsync(id);

            if (vote == null)
            {
                return NotFound();
            }

            return vote;
        }
    }
}
