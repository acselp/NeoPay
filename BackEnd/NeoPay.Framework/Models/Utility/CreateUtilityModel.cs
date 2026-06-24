using NeoPay.Domain.Enums;

namespace NeoPay.Framework.Models.Utility;

public class CreateUtilityModel
{
    public string Name   { get; set; }
    public int    UnitId { get; set; }
    public BillingType BillingType { get; set; }
}
