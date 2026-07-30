using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Filters;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service.Abstractions;

public interface ICustomerService
{
    Task<ResultWithValue<CustomerEntity>> Create(CustomerEntity entity);

    Task<ResultWithValue<CustomerEntity>> GetById(int id);

    Task<ResultWithValue<IEnumerable<CustomerEntity>>> GetAll();

    Task<ResultWithValue<PagedList<CustomerEntity>>> GetAll(PagedFilter filter);

    Task<ResultWithValue<CustomerEntity>> Update(CustomerEntity entity);

    Task<Result> Delete(int id);
}
