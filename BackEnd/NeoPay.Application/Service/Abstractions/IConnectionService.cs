using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service.Abstractions;

public interface IConnectionService
{
    Task<Result> Create(ConnectionEntity entity);

    Task<ResultWithValue<ConnectionEntity>> GetById(int id);

    Task<ResultWithValue<IEnumerable<ConnectionEntity>>> GetAll();

    Task<ResultWithValue<PagedList<ConnectionEntity>>> GetAll(PagedFilter filter);

    Task<ResultWithValue<IEnumerable<ConnectionEntity>>> GetByCustomerId(int customerId);

    Task<ResultWithValue<IEnumerable<ConnectionEntity>>> GetByUtilityId(int utilityId);

    Task<ResultWithValue<ConnectionEntity>> Update(ConnectionEntity entity);

    Task<Result> Delete(int id);

    Task<ResultWithValue<ConnectionEntity>> GetByIdWithDetails(int id);
}
