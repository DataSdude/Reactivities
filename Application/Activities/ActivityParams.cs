using Application.Core;

namespace Application.Activities
{
    public class ActivityParams: PagingParams
    {
        public bool isGoing {  get; set; }
        public bool isHost { get; set; }
        public DateTime startDate { get; set; }= DateTime.UtcNow;
    }
}
