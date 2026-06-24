using NeoPay.Domain.Enums;

namespace NeoPay.Framework.Models.Utility;

public class UpdateUtilityModel
{
    public int    Id     { get; set; }
    public string Name   { get; set; } = null!;
    public int    UnitId { get; set; }
    public BillingType BillingType { get; set; }
}
