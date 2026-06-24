namespace NeoPay.Framework.Models.Unit;

public class CreateUnitModel
{
    public string Code { get; set; }
    public string LongName { get; set; }
    public string? Description { get; set; }
    public string Symbol { get; set; }
}