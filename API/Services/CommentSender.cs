using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;

namespace API.Services
{
    public class CommentSender : ICommentSender
    {
        public async void SendComment(CommentDto commentDto)
        {
            var requestBody = new { FirstName = commentDto.FirstName, LastName = commentDto.LastName, Email = commentDto.Email, Comment = commentDto.Comment };
            var requestBodyJson = JsonSerializer.Serialize(requestBody);

            var functionUrl = "http://localhost:7285/api/Function1";

            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Post, functionUrl);
                request.Content = new StringContent(requestBodyJson, System.Text.Encoding.UTF8, "application/json");

                var response = await client.SendAsync(request);
            }
        }
    }
}