// Controllers/AuthenticationController.cs
using Microsoft.AspNetCore.Mvc;
using JsonApp.Server.Data;
using JsonApp.Server.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
//using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace JsonApp.Server.Controllers
{
    [ApiController]
    [Route("Authentication")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthenticationController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
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
            var tokenString = GenerateJwtToken(user);
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

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginRequest.Username);

            if (user == null || user.PasswordHash != loginRequest.Password)
            {
                return Unauthorized("Invalid username or password.");
            }

            var tokenString = GenerateJwtToken(user);

            // Prepare response without sensitive information
            var userResponse = new
            {
                userId = user.UserID,
                username = user.Username,
                email = user.Email,
                role = user.Role,
                dateJoined = user.DateJoined
            };

            return Ok(new { token = tokenString, user = userResponse });
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
        private string GenerateJwtToken(User user)
        {
            var jwtKey = _configuration["Jwt:Key"];
            var jwtIssuer = _configuration["Jwt:Issuer"];

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
        new Claim(ClaimTypes.Role, user.Role)
    };

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtIssuer,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
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
