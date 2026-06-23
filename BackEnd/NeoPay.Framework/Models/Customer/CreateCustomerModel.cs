using NeoPay.Domain.Enums;

namespace NeoPay.Framework.Models.Customer;

public class CreateCustomerModel
{
    public         string        FirstName { get; set; } = null!;
    public         string        LastName  { get; set; } = null!;
    public         string?       Email     { get; set; }
    public         string       Phone     { get; set; } = null!;
    public         int           AccountNr { get; set; }
    public CustomerStatus Status { get; set; }
    public string Notes { get; set; } = null!;
}