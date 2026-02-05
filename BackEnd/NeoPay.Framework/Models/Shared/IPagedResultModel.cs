namespace NeoPay.Framework.Models.Shared;

public interface IPagedResultModel
{
    int Total     { get; set; }
    int PageIndex { get; set; }
    int PageSize  { get; set; }
}