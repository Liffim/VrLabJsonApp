// Controllers/AuthenticationController.cs
using Microsoft.AspNetCore.Mvc;
using JsonApp.Server.Data;
using JsonApp.Server.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
//using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace JsonApp.Server.Controllers
{
    [ApiController]
    [Route("Authentication")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthenticationController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: /Authentication/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await _context.Users.AnyAsync(u => u.Username == registerRequest.Username || u.Email == registerRequest.Email))
            {
                return BadRequest("Username or Email already exists.");
            }

            // Hash the password before storing
            string hashedPassword = registerRequest.Password;//BCrypt.Net.BCrypt.HashPassword(registerRequest.Password);

            var user = new User
            {
                Username = registerRequest.Username,
                Email = registerRequest.Email,
                PasswordHash = hashedPassword,
                DateJoined = DateTime.Now,
                Role = "member" // Default role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Prepare response without sensitive information
            var userResponse = new
            {
                userId = user.UserID,
                username = user.Username,
                email = user.Email,
                role = user.Role,
                dateJoined = user.DateJoined
            };

            return Ok(new { message = "Registration successful.", user = userResponse });
        }

        // POST: /Authentication/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginRequest.Username);

            //if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
            //{
            //    return Unauthorized("Invalid username or password.");
            //}

            if(user == null || user.PasswordHash != loginRequest.Password)
            {
                return Unauthorized("Invalid username or password.");
            }
            // Create user claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim("UserID", user.UserID.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                // Configure authentication properties if needed
                // Example:
                // IsPersistent = true,
                // ExpiresUtc = DateTimeOffset.UtcNow.AddDays(7)
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            // Prepare response without sensitive information
            var userResponse = new
            {
                userId = user.UserID,
                username = user.Username,
                email = user.Email,
                role = user.Role,
                dateJoined = user.DateJoined
            };

            return Ok(new { message = "Login successful.", user = userResponse });
        }

        // POST: /Authentication/Logout
        [HttpPost("Logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { message = "Logged out successfully." });
        }

        // GET: /Authentication/CurrentUser
        /*[HttpGet("CurrentUser")]
        public async Task<IActionResult> CurrentUser()
        {
            if (User.Identity.IsAuthenticated)
            {
                var userIdClaim = User.FindFirst("UserID");
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized();
                }

                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return Unauthorized();
                }

                var userResponse = new
                {
                    userId = user.UserID,
                    username = user.Username,
                    email = user.Email,
                    role = user.Role,
                    dateJoined = user.DateJoined
                };

                return Ok(new { user = userResponse });
            }

            return Unauthorized();
        }

        // GET: /Authentication/AccessDenied
        [HttpGet("AccessDenied")]
        public IActionResult AccessDenied()
        {
            return Forbid();
        }*/
    }
}
