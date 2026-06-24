using NeoPay.Domain.Entities;
using NeoPay.Framework.Models.Shared;

namespace NeoPay.Framework.Models.Unit;

public class UnitModel : BaseModel
{
    public string Code { get; set; }
    public string LongName { get; set; }
    public string? Description { get; set; }
    public string Symbol { get; set; }
}