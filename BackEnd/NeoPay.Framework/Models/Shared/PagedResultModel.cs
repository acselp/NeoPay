namespace NeoPay.Framework.Models.Shared;

public class PagedResultModel<T>
{
    public int      Total      { get; set; }
    public int      PageIndex  { get; set; }
    public int      PageSize   { get; set; }
    public int      TotalPages => PageSize > 0 ? (int)Math.Ceiling((double)Total / PageSize) : 0;
    public IList<T> Data       { get; set; } = new List<T>();
}