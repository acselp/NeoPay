namespace NeoPay.Framework.Models.Shared;

public class PagedResultModel<T> : IPagedResultModel
{
    public int      Total     { get; set; }
    public int      PageIndex { get; set; }
    public int      PageSize  { get; set; }
    public IList<T> Data      { get; set; } = new List<T>();
}