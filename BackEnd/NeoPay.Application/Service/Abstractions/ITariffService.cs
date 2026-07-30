using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service.Abstractions;

public interface ITariffService
{
    Task<ResultWithValue<TariffEntity>> Create(TariffEntity entity);

    Task<ResultWithValue<TariffEntity>> GetById(int id);

    Task<ResultWithValue<IEnumerable<TariffEntity>>> GetAll();

    Task<ResultWithValue<PagedList<TariffEntity>>> GetAll(PagedFilter filter);

    Task<ResultWithValue<TariffEntity>> Update(TariffEntity entity);

    Task<Result> Delete(int id);
}
