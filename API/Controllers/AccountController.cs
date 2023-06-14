using API.Data;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(DataContext context, ITokenService tokenService, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _signInManager = signInManager;
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExist(registerDto.UserName)) return BadRequest("Username is taken");

            var user = new AppUser
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                Country = registerDto.Country,
                Address = registerDto.Address,
                Index = registerDto.Index,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(result.Succeeded) {
                var userDto = new UserDto 
                {
                    UserName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                };
                return userDto;
            }
            else {
                return BadRequest();
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.Where(x => x.Email == loginDto.Email).FirstAsync();

            if(user == null) return BadRequest("User hasn't founded");

            var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, isPersistent: false, lockoutOnFailure: false);

            if(result.Succeeded)    
            {
                return new UserDto 
                {
                    UserName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                };
            }
            else {
                return BadRequest("Login Failed! Try again, please.");
            }
        }

        private async Task<bool> UserExist(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}