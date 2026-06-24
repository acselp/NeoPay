using NeoPay.Domain.Enums;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Unit;

namespace NeoPay.Framework.Models.Utility;

public class UtilityModel : BaseModel
{
    public string     Name   { get; set; } = null!;
    public int        UnitId { get; set; }
    public UnitModel? Unit   { get; set; }
    public BillingType BillingType { get; set; }
}
