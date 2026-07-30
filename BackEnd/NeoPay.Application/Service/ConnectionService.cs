using NeoPay.Application.Repository;
using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service;

public class ConnectionService : IConnectionService
{
    private readonly IConnectionRepository _connectionRepository;
    private readonly ICustomerRepository _customerRepository;
    private readonly IUtilityRepository _utilityRepository;

    public ConnectionService(
        IConnectionRepository connectionRepository,
        ICustomerRepository customerRepository,
        IUtilityRepository utilityRepository)
    {
        _connectionRepository = connectionRepository;
        _customerRepository = customerRepository;
        _utilityRepository = utilityRepository;
    }

    public async Task<Result> Create(ConnectionEntity entity)
    {
        var customer = await _customerRepository.GetById(entity.CustomerId);
        if (customer == null)
            return Result.NotFound($"Customer with ID {entity.CustomerId} not found");

        var utility = await _utilityRepository.GetById(entity.UtilityId);
        if (utility == null)
            return Result.NotFound($"Utility with ID {entity.UtilityId} not found");

        await _connectionRepository.Insert(entity);
        return Result.Success();
    }

    public async Task<ResultWithValue<ConnectionEntity>> GetById(int id)
    {
        var connection = await _connectionRepository.GetById(id);
        if (connection == null)
            return Result.NotFound($"Connection with ID {id} not found");

        return Result.Success(connection);
    }

    public async Task<ResultWithValue<IEnumerable<ConnectionEntity>>> GetAll()
    {
        return Result.Success(await _connectionRepository.GetAll());
    }

    public async Task<ResultWithValue<PagedList<ConnectionEntity>>> GetAll(PagedFilter filter)
    {
        return Result.Success(await _connectionRepository.GetAll(filter));
    }

    public async Task<ResultWithValue<IEnumerable<ConnectionEntity>>> GetByCustomerId(int customerId)
    {
        return Result.Success(await _connectionRepository.GetByCustomerId(customerId));
    }

    public async Task<ResultWithValue<IEnumerable<ConnectionEntity>>> GetByUtilityId(int utilityId)
    {
        return Result.Success(await _connectionRepository.GetByUtilityId(utilityId));
    }

    public async Task<ResultWithValue<ConnectionEntity>> Update(ConnectionEntity entity)
    {
        var existingConnection = await _connectionRepository.GetById(entity.Id);
        if (existingConnection == null)
            return Result.NotFound($"Connection with ID {entity.Id} not found");

        var customer = await _customerRepository.GetById(entity.CustomerId);
        if (customer == null)
            return Result.NotFound($"Customer with ID {entity.CustomerId} not found");

        var utility = await _utilityRepository.GetById(entity.UtilityId);
        if (utility == null)
            return Result.NotFound($"Utility with ID {entity.UtilityId} not found");

        return Result.Success(await _connectionRepository.Update(entity));
    }

    public async Task<Result> Delete(int id)
    {
        var connection = await _connectionRepository.GetById(id);
        if (connection == null)
            return Result.NotFound($"Connection with ID {id} not found");

        await _connectionRepository.Delete(connection);
        return Result.Success();
    }

    public async Task<ResultWithValue<ConnectionEntity>> GetByIdWithDetails(int id)
    {
        var connection = await _connectionRepository.GetByIdWithDetails(id);
        if (connection == null)
            return Result.NotFound($"Connection with ID {id} not found");

        return Result.Success(connection);
    }
}
