using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service.Abstractions;

public interface IUnitService
{
    Task<ResultWithValue<UnitEntity>> Create(UnitEntity entity);

    Task<ResultWithValue<UnitEntity>> GetById(int id);

    Task<ResultWithValue<IEnumerable<UnitEntity>>> GetAll();

    Task<ResultWithValue<PagedList<UnitEntity>>> GetAll(PagedFilter filter);

    Task<ResultWithValue<UnitEntity>> Update(UnitEntity entity);

    Task<Result> Delete(int id);
}
