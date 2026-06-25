using NeoPay.Framework.Models.Shared;

namespace NeoPay.Framework.Models.Meter;

public class MeterModel : BaseModel
{
    public string SerialNumber { get; set; } = null!;
    public int    Status       { get; set; }
    public string? Description { get; set; }
}
