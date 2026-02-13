using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Exceptions;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service;

public class ConnectionService
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

    public async Task Create(ConnectionEntity entity)
    {
        var customer = await _customerRepository.GetById(entity.CustomerId);
        if (customer == null)
            throw new NotFoundException($"Customer with ID {entity.CustomerId} not found");

        var utility = await _utilityRepository.GetById(entity.UtilityId);
        if (utility == null)
            throw new NotFoundException($"Utility with ID {entity.UtilityId} not found");
        
        if (await _connectionRepository.ConnectionExists(customer.Id, utility.Id))
            throw new ConnectionExistsException($"Connection with this customerId: {customer.Id} and this utilityId: {utility.Id} already exists");

        var meterEntity = new MeterEntity
        {
            Status = 0,
            SerialNumber = "123",
            CreatedOnUtc = DateTime.UtcNow,
            UpdatedOnUtc = DateTime.UtcNow
        };

        entity.Meter = meterEntity;
        
        await _connectionRepository.Insert(entity);
    }

    public async Task<ConnectionEntity?> GetById(int id)
    {
        return await _connectionRepository.GetById(id);
    }

    public async Task<IEnumerable<ConnectionEntity>> GetAll()
    {
        return await _connectionRepository.GetAll();
    }

    public async Task<PagedList<ConnectionEntity>> GetAll(PagedFilter filter)
    {
        return await _connectionRepository.GetAll(filter);
    }

    public async Task<IEnumerable<ConnectionEntity>> GetByCustomerId(int customerId)
    {
        return await _connectionRepository.GetByCustomerId(customerId);
    }

    public async Task<IEnumerable<ConnectionEntity>> GetByUtilityId(int utilityId)
    {
        return await _connectionRepository.GetByUtilityId(utilityId);
    }

    public async Task<ConnectionEntity> Update(ConnectionEntity entity)
    {
        var existingConnection = await _connectionRepository.GetById(entity.Id);
        if (existingConnection == null)
            throw new NotFoundException($"Connection with ID {entity.Id} not found");

        var customer = await _customerRepository.GetById(entity.CustomerId);
        if (customer == null)
            throw new NotFoundException($"Customer with ID {entity.CustomerId} not found");

        var utility = await _utilityRepository.GetById(entity.UtilityId);
        if (utility == null)
            throw new NotFoundException($"Utility with ID {entity.UtilityId} not found");

        return await _connectionRepository.Update(entity);
    }

    public async Task Delete(int id)
    {
        var connection = await _connectionRepository.GetById(id);
        if (connection == null)
            throw new NotFoundException($"Connection with ID {id} not found");

        await _connectionRepository.Delete(connection);
    }

    public async Task<ConnectionEntity?> GetByIdWithDetails(int id)
    {
        return await _connectionRepository.GetByIdWithDetails(id);
    }

    public async Task<IEnumerable<ConnectionEntity>> SearchForMobile(string? query, string status)
    {
        return await _connectionRepository.SearchForMobile(query, status);
    }
}
