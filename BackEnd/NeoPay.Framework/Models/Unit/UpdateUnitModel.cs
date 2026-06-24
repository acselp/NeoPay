namespace NeoPay.Framework.Models.Unit;

public class UpdateUnitModel
{
    public int    Id       { get; set; }
    public string Code { get; set; }
    public string LongName { get; set; }
    public string? Description { get; set; }
    public string Symbol { get; set; }
}
