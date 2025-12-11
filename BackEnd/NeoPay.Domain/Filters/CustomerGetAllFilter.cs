using NeoPay.Domain.Paged;

namespace NeoPay.Domain.Filters;

public class CustomerGetAllFilter : PagedFilter
{
    public string? SortField     { get; set; }
    public string? SortDirection { get; set; }
    public string? SearchTerm    { get; set; }
    public string? FirstName     { get; set; }
    public string? LastName      { get; set; }
    public string? Email         { get; set; }
    public string? Phone         { get; set; }
    public int?    AccountNr     { get; set; }
}