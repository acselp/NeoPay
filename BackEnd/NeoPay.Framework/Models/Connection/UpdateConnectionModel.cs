namespace NeoPay.Framework.Models.Connection;

public class UpdateConnectionModel
{
    public int Id         { get; set; }
    public int Status     { get; set; }
    public int CustomerId { get; set; }
    public int UtilityId  { get; set; }
    public int? BillingQuantity { get; set; }
    public int? MeterId { get; set; }
    public string? Description { get; set; }
}
