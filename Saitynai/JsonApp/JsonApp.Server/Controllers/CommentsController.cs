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
    public class CommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CommentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /api/comments
        /// <summary>
        /// Retrieves all comments from the database.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }
        // POST: /api/comments
        /// <summary>
        /// Creates a new comment and adds it to the database.
        /// </summary>
        [Authorize(Roles = "member,administrator")]
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment newComment)
        {
            // Set the current date for the comment
            newComment.DateCommented = DateTime.Now;

            _context.Comments.Add(newComment);
            await _context.SaveChangesAsync();

            // Return a 201 Created status with the created comment
            return CreatedAtAction(nameof(GetComment), new { id = newComment.CommentID }, newComment);
        }
        // GET: /api/comments/{id}
        /// <summary>
        /// Retrieves a specific comment by ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // DELETE: /api/comments/{id}
        /// <summary>
        /// Deletes a specific comment by ID.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: /api/comments/{id}
        /// <summary>
        /// Updates a specific comment with new information.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, [FromBody] Comment updatedComment)
        {
            if (id != updatedComment.CommentID)
            {
                return BadRequest("Comment ID mismatch.");
            }

            _context.Entry(updatedComment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.CommentID == id);
        }
    }
}
