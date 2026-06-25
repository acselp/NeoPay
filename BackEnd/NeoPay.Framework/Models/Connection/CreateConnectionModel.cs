namespace NeoPay.Framework.Models.Connection;

public class CreateConnectionModel
{
    public int Status     { get; set; }
    public int CustomerId { get; set; }
    public int UtilityId  { get; set; }
    public int? MeterId { get; set; }
    public int? BillingQuantity { get; set; }
    public string? Description { get; set; }
}
