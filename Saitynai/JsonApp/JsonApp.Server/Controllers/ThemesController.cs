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
    public class ThemesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ThemesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /api/themes
        /// <summary>
        /// Retrieves all themes from the database.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Theme>>> GetThemes()
        {
            return await _context.Themes.ToListAsync();
        }

        // GET: /api/themes/{id}
        /// <summary>
        /// Retrieves a specific theme by ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Theme>> GetTheme(int id)
        {
            var theme = await _context.Themes.FindAsync(id);

            if (theme == null)
            {
                return NotFound();
            }

            return theme;
        }

        // POST: /api/themes
        /// <summary>
        /// Creates a new theme.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Theme>> PostTheme(Theme theme)
        {
            _context.Themes.Add(theme);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTheme), new { id = theme.ThemeID }, theme);
        }

        // DELETE: /api/themes/{id}
        /// <summary>
        /// Deletes a specific theme by ID.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTheme(int id)
        {
            var theme = await _context.Themes.FindAsync(id);
            if (theme == null)
            {
                return NotFound();
            }

            _context.Themes.Remove(theme);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
