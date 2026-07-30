using NeoPay.Application.Repository;
using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Filters;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service;

public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _customerRepository;

    public CustomerService(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public async Task<ResultWithValue<CustomerEntity>> Create(CustomerEntity entity)
    {
        if (await _customerRepository.AccountNrExists(entity.AccountNr))
            return Result.Conflict($"Customer with account number: {entity.AccountNr} already exists");

        return Result.Success(await _customerRepository.Insert(entity));
    }

    public async Task<ResultWithValue<CustomerEntity>> GetById(int id)
    {
        var customer = await _customerRepository.GetById(id);
        if (customer == null)
            return Result.NotFound($"Customer with ID {id} not found");

        return Result.Success(customer);
    }

    public async Task<ResultWithValue<IEnumerable<CustomerEntity>>> GetAll()
    {
        return Result.Success(await _customerRepository.GetAll());
    }

    public async Task<ResultWithValue<PagedList<CustomerEntity>>> GetAll(PagedFilter filter)
    {
        return Result.Success(await _customerRepository.GetAll(filter));
    }

    public async Task<ResultWithValue<CustomerEntity>> Update(CustomerEntity entity)
    {
        var existingCustomer = await _customerRepository.GetById(entity.Id);
        if (existingCustomer == null)
            return Result.NotFound($"Customer with ID {entity.Id} not found");

        return Result.Success(await _customerRepository.Update(entity));
    }

    public async Task<Result> Delete(int id)
    {
        var customer = await _customerRepository.GetById(id);
        if (customer == null)
            return Result.NotFound($"Customer with ID {id} not found");

        await _customerRepository.Delete(customer);
        return Result.Success();
    }
}
