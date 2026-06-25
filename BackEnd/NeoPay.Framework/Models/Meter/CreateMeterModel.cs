namespace NeoPay.Framework.Models.Meter;

public class CreateMeterModel
{
    public string SerialNumber { get; set; } = null!;
    public int    Status       { get; set; }
    public string? Description { get; set; }
}
