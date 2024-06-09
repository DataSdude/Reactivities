namespace Domain
{
    public class UserFollowing
    {
        // It naming could be understood as "Observer following Target"
        public string ObserverId { get; set; }
        public AppUser Observer { get; set; }
        public string TargetId { get; set; }
        public AppUser Target { get; set; }
    }
}
