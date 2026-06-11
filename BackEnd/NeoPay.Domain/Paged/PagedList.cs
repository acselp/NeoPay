using Microsoft.EntityFrameworkCore;

namespace NeoPay.Domain.Paged;

public class PagedList<T> : List<T>
{
    public PagedList(IEnumerable<T> source, int totalCount, int pageSize, int pageIndex)
    {
        TotalCount = totalCount;
        PageSize   = pageSize;
        PageIndex  = pageIndex;
        TotalPages = (int)Math.Ceiling(TotalCount / (double)PageSize);
        AddRange(source);
    }

    public int  PageIndex       { get; }
    public int  PageSize        { get; }
    public int  TotalCount      { get; }
    public int  TotalPages      { get; }
    public bool HasPreviousPage => PageIndex > 0;

    public bool HasNextPage => PageIndex + 1 < TotalPages;
}

public static class PagedListExtension
{
    public static PagedList<T> ToPaged<T>(this IQueryable<T> source, int pageIndex, int pageSize)
    {
        var totalCount = source.Count();
        var data       = source.Skip(pageIndex * pageSize).Take(pageSize);
        return new PagedList<T>(data, pageIndex, pageSize, totalCount);
    }

    public static async Task<PagedList<T>> ToPagedAsync<T>(this IQueryable<T> source, int pageIndex, int pageSize)
    {
        var totalCount = source.Count();
        var data = source
                  .Skip(pageIndex * pageSize)
                  .Take(pageSize);
        var fetched = await data.ToListAsync() ?? new List<T>();
        return new PagedList<T>(fetched, totalCount, pageSize, pageIndex);
    }
}