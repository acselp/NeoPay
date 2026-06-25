using NeoPay.Framework.Models.Shared;

namespace NeoPay.Framework.Models.Connection;

public class ConnectionModel : BaseModel
{
    public int     Status       { get; set; }
    public int     CustomerId   { get; set; }
    public int     UtilityId    { get; set; }
    public string? CustomerName { get; set; }
    public string? UtilityName  { get; set; }
    public int? BillingQuantity { get; set; }
    public string? Description { get; set; }
}
