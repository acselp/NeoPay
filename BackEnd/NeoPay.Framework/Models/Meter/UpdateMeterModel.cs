namespace NeoPay.Framework.Models.Meter;

public class UpdateMeterModel
{
    public int    Id           { get; set; }
    public string SerialNumber { get; set; } = null!;
    public int    Status       { get; set; }
    public string? Description { get; set; }
}
