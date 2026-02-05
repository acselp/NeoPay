using NeoPay.Framework.Models.Shared;

namespace NeoPay.Framework.Models.Customer;

public class CustomerModel : BaseModel
{
    public string  FirstName { get; set; } = null!;
    public string  LastName  { get; set; } = null!;
    public string? Email     { get; set; }
    public string? Phone     { get; set; }
    public int     AccountNr { get; set; }
}