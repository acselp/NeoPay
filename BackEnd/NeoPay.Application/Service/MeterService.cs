using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Exceptions;

namespace NeoPay.Application.Service;

public class MeterService
{
    private readonly IMeterRepository _meterRepository;
    private readonly IConnectionRepository _connectionRepository;

    public MeterService(IMeterRepository meterRepository, IConnectionRepository connectionRepository)
    {
        _meterRepository = meterRepository;
        _connectionRepository = connectionRepository;
    }

    public async Task<MeterEntity> Create(MeterEntity entity)
    {
        var connection = await _connectionRepository.GetById(entity.ConnectionId.Value);
        if (connection == null)
            throw new NotFoundException($"Connection with ID {entity.ConnectionId} not found");

        var existingMeter = await _meterRepository.GetBySerialNumber(entity.SerialNumber);
        if (existingMeter != null)
            throw new DuplicateException($"Meter with serial number {entity.SerialNumber} already exists");

        return await _meterRepository.Insert(entity);
    }

    public async Task<MeterEntity?> GetById(int id)
    {
        return await _meterRepository.GetById(id);
    }

    public async Task<IEnumerable<MeterEntity>> GetAll()
    {
        return await _meterRepository.GetAll();
    }

    public async Task<IEnumerable<MeterEntity>> GetByConnectionId(int connectionId)
    {
        return await _meterRepository.GetByConnectionId(connectionId);
    }

    public async Task<MeterEntity?> GetBySerialNumber(string serialNumber)
    {
        return await _meterRepository.GetBySerialNumber(serialNumber);
    }

    public async Task<MeterEntity?> GetByBarcode(string barcode)
    {
        return await _meterRepository.GetByBarcode(barcode);
    }

    public async Task<MeterEntity> Update(MeterEntity entity)
    {
        var existingMeter = await _meterRepository.GetById(entity.Id);
        if (existingMeter == null)
            throw new NotFoundException($"Meter with ID {entity.Id} not found");

        var connection = await _connectionRepository.GetById(entity.ConnectionId.Value);
        if (connection == null)
            throw new NotFoundException($"Connection with ID {entity.ConnectionId} not found");

        var meterWithSameSerial = await _meterRepository.GetBySerialNumber(entity.SerialNumber);
        if (meterWithSameSerial != null && meterWithSameSerial.Id != entity.Id)
            throw new DuplicateException($"Meter with serial number {entity.SerialNumber} already exists");

        return await _meterRepository.Update(entity);
    }

    public async Task Delete(int id)
    {
        var meter = await _meterRepository.GetById(id);
        if (meter == null)
            throw new NotFoundException($"Meter with ID {id} not found");

        await _meterRepository.Delete(meter);
    }
}
