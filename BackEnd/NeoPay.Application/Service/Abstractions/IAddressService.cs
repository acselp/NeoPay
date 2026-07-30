using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service.Abstractions;

public interface IAddressService
{
    Task<ResultWithValue<AddressEntity>> Create(AddressEntity entity);

    Task<ResultWithValue<AddressEntity>> GetById(int id);

    Task<ResultWithValue<IEnumerable<AddressEntity>>> GetAll();

    Task<ResultWithValue<PagedList<AddressEntity>>> GetAll(PagedFilter filter);

    Task<ResultWithValue<AddressEntity>> GetByCustomerId(int customerId);

    Task<ResultWithValue<AddressEntity>> Update(AddressEntity entity);

    Task<Result> Delete(int id);
}
