using NeoPay.Application.Repository;
using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service;

public class AddressService : IAddressService
{
    private readonly IAddressRepository _addressRepository;
    private readonly ICustomerRepository _customerRepository;

    public AddressService(IAddressRepository addressRepository, ICustomerRepository customerRepository)
    {
        _addressRepository = addressRepository;
        _customerRepository = customerRepository;
    }

    public async Task<ResultWithValue<AddressEntity>> Create(AddressEntity entity)
    {
        var customer = await _customerRepository.GetById(entity.CustomerId);
        if (customer == null)
            return Result.NotFound($"Customer with ID {entity.CustomerId} not found");

        return Result.Success(await _addressRepository.Insert(entity));
    }

    public async Task<ResultWithValue<AddressEntity>> GetById(int id)
    {
        var address = await _addressRepository.GetById(id);
        if (address == null)
            return Result.NotFound($"Address with ID {id} not found");

        return Result.Success(address);
    }

    public async Task<ResultWithValue<IEnumerable<AddressEntity>>> GetAll()
    {
        return Result.Success(await _addressRepository.GetAll());
    }

    public async Task<ResultWithValue<PagedList<AddressEntity>>> GetAll(PagedFilter filter)
    {
        return Result.Success(await _addressRepository.GetAll(filter));
    }

    public async Task<ResultWithValue<AddressEntity>> GetByCustomerId(int customerId)
    {
        var address = await _addressRepository.GetByCustomerId(customerId);
        if (address == null)
            return Result.NotFound($"Address for customer with ID {customerId} not found");

        return Result.Success(address);
    }

    public async Task<ResultWithValue<AddressEntity>> Update(AddressEntity entity)
    {
        var existingAddress = await _addressRepository.GetById(entity.Id);
        if (existingAddress == null)
            return Result.NotFound($"Address with ID {entity.Id} not found");

        var customer = await _customerRepository.GetById(entity.CustomerId);
        if (customer == null)
            return Result.NotFound($"Customer with ID {entity.CustomerId} not found");

        return Result.Success(await _addressRepository.Update(entity));
    }

    public async Task<Result> Delete(int id)
    {
        var address = await _addressRepository.GetById(id);
        if (address == null)
            return Result.NotFound($"Address with ID {id} not found");

        await _addressRepository.Delete(address);
        return Result.Success();
    }
}
