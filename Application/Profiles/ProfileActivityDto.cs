﻿using System.Text.Json.Serialization;
namespace Application.Profiles
{
    public class ProfileActivityDto
    {
        public Guid Id { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }

        [JsonIgnore]
        public string HostUsername { get; set; }
    }
}
