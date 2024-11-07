using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JsonApp.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using JsonApp.Server.Data;

namespace JsonApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObjectFilesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ObjectFilesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /api/objectfiles
        /// <summary>
        /// Retrieves all object files from the database.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ObjectFile>>> GetObjectFiles()
        {
            return await _context.ObjectFiles.ToListAsync();
        }

        // GET: /api/objectfiles/{id}
        /// <summary>
        /// Retrieves a specific object file by ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ObjectFile>> GetObjectFile(int id)
        {
            var objectFile = await _context.ObjectFiles.FindAsync(id);

            if (objectFile == null)
            {
                return NotFound();
            }

            return objectFile;
        }

        // GET: /api/themes/{themeid}/object/{id}
        /// <summary>
        /// Retrieves a specific object file by ID under a specific theme.
        /// </summary>
        [HttpGet("/api/themes/{themeid}/object/{id}")]
        public async Task<ActionResult<ObjectFile>> GetObjectFileByTheme(int themeid, int id)
        {
            var objectFile = await _context.ObjectFiles
                .FirstOrDefaultAsync(of => of.ObjectID == id && of.ThemeID == themeid);

            if (objectFile == null)
            {
                return NotFound();
            }

            return objectFile;
        }

        // POST: /api/objectfiles
        /// <summary>
        /// Creates a new object file.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ObjectFile>> PostObjectFile(ObjectFile objectFile)
        {
            _context.ObjectFiles.Add(objectFile);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetObjectFile), new { id = objectFile.ObjectID }, objectFile);
        }

        // PUT: /api/objectfiles/{id}
        /// <summary>
        /// Updates a specific object file with new information.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutObjectFile(int id, [FromBody] ObjectFile updatedObjectFile)
        {
            if (id != updatedObjectFile.ObjectID)
            {
                return BadRequest("ObjectFile ID mismatch.");
            }

            _context.Entry(updatedObjectFile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ObjectFileExists(id))
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

        // DELETE: /api/objectfiles/{id}
        /// <summary>
        /// Deletes a specific object file by ID.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteObjectFile(int id)
        {
            var objectFile = await _context.ObjectFiles.FindAsync(id);
            if (objectFile == null)
            {
                return NotFound();
            }

            _context.ObjectFiles.Remove(objectFile);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: /api/themes/{themeid}/object/{id}/comments
        /// <summary>
        /// Retrieves all comments for a specific object file under a specific theme.
        /// </summary>
        [HttpGet("/api/themes/{themeid}/object/{id}/comments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentsForObjectFile(int themeid, int id)
        {
            var comments = await _context.Comments
                .Where(c => c.ObjectID == id &&
                            _context.ObjectFiles.Any(of => of.ObjectID == id && of.ThemeID == themeid))
                .ToListAsync();

            if (comments == null || comments.Count == 0)
            {
                return NotFound();
            }

            return comments;
        }

        // GET: /api/themes/{themeid}/object/{id}/comments/{commentid}
        /// <summary>
        /// Retrieves a specific comment by ID for a specific object file under a specific theme.
        /// </summary>
        [HttpGet("/api/themes/{themeid}/object/{id}/comments/{commentid}")]
        public async Task<ActionResult<Comment>> GetCommentForObjectFile(int themeid, int id, int commentid)
        {
            var comment = await _context.Comments
                .FirstOrDefaultAsync(c => c.CommentID == commentid &&
                                          c.ObjectID == id &&
                                          _context.ObjectFiles.Any(of => of.ObjectID == id && of.ThemeID == themeid));

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }


        private bool ObjectFileExists(int id)
        {
            return _context.ObjectFiles.Any(e => e.ObjectID == id);
        }
    }
}
