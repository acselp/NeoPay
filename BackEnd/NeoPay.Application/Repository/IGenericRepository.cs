using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Repository;

public interface IGenericRepository<T> where T : BaseEntity
{
    IQueryable<T>        GetQuery();
    Task<T?>             GetById(int id);
    Task<IEnumerable<T>> GetAll();
    Task<T>              Insert(T                   entity);
    Task<IEnumerable<T>> InsertRange(IEnumerable<T> entities);
    Task<T>              Update(T                   entity);
    Task<IEnumerable<T>> UpdateRange(IEnumerable<T> entities);
    Task                 Delete(T                   entity);
    Task                 DeleteRange(IEnumerable<T> entities);
    Task<PagedList<T>>   GetAll(PagedFilter         filter);
}