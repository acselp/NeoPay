namespace NeoPay.Framework.Models.Mobile;

public class MobileMeterModel
{
    public int     Id                   { get; set; }
    public string  SerialNumber         { get; set; } = null!;
    public string? BarcodeValue         { get; set; }
    public int     Digits               { get; set; }
    public decimal Multiplier           { get; set; }
    public int     AssignedConnectionId { get; set; }
}
