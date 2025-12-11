namespace NeoPay.Framework.Models.Customer;

public class GetCustomerFilterModel
{
    public int     PageIndex     { get; set; } = 0;
    public int     PageSize      { get; set; } = 10;
    public string? SortField     { get; set; }
    public string? SortDirection { get; set; } = "asc";
    public string? SearchTerm    { get; set; }
    public string? FirstName     { get; set; }
    public string? LastName      { get; set; }
    public string? Email         { get; set; }
    public string? Phone         { get; set; }
    public int?    AccountNr     { get; set; }
}
