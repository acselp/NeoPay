using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service.Abstractions;

public interface IUtilityService
{
    Task<ResultWithValue<UtilityEntity>> Create(UtilityEntity entity);

    Task<ResultWithValue<UtilityEntity>> GetById(int id);

    Task<ResultWithValue<IEnumerable<UtilityEntity>>> GetAll();

    Task<ResultWithValue<PagedList<UtilityEntity>>> GetAll(PagedFilter filter);

    Task<ResultWithValue<UtilityEntity>> Update(UtilityEntity entity);

    Task<Result> Delete(int id);
}
