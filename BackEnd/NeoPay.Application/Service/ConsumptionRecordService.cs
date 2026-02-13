using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Exceptions;

namespace NeoPay.Application.Service;

public class ConsumptionRecordService
{
    private readonly IConsumptionRecordRepository _consumptionRecordRepository;
    private readonly IMeterRepository _meterRepository;

    public ConsumptionRecordService(
        IConsumptionRecordRepository consumptionRecordRepository,
        IMeterRepository meterRepository)
    {
        _consumptionRecordRepository = consumptionRecordRepository;
        _meterRepository = meterRepository;
    }

    public async Task<ConsumptionRecord> Create(ConsumptionRecord entity)
    {
        var meter = await _meterRepository.GetById(entity.MeterId);
        if (meter == null)
            throw new NotFoundException($"Meter with ID {entity.MeterId} not found");

        return await _consumptionRecordRepository.Insert(entity);
    }

    public async Task<ConsumptionRecord?> GetById(int id)
    {
        return await _consumptionRecordRepository.GetById(id);
    }

    public async Task<IEnumerable<ConsumptionRecord>> GetAll()
    {
        return await _consumptionRecordRepository.GetAll();
    }

    public async Task<IEnumerable<ConsumptionRecord>> GetByMeterId(int meterId)
    {
        return await _consumptionRecordRepository.GetByMeterId(meterId);
    }

    public async Task<IEnumerable<ConsumptionRecord>> GetByMeterIdAndDateRange(int meterId, DateTime startDate, DateTime endDate)
    {
        return await _consumptionRecordRepository.GetByMeterIdAndDateRange(meterId, startDate, endDate);
    }

    public async Task<ConsumptionRecord> Update(ConsumptionRecord entity)
    {
        var existingRecord = await _consumptionRecordRepository.GetById(entity.Id);
        if (existingRecord == null)
            throw new NotFoundException($"ConsumptionRecord with ID {entity.Id} not found");

        var meter = await _meterRepository.GetById(entity.MeterId);
        if (meter == null)
            throw new NotFoundException($"Meter with ID {entity.MeterId} not found");

        return await _consumptionRecordRepository.Update(entity);
    }

    public async Task Delete(int id)
    {
        var record = await _consumptionRecordRepository.GetById(id);
        if (record == null)
            throw new NotFoundException($"ConsumptionRecord with ID {id} not found");

        await _consumptionRecordRepository.Delete(record);
    }

    public async Task<ConsumptionRecord?> GetLastByMeterId(int meterId)
    {
        return await _consumptionRecordRepository.GetLastByMeterId(meterId);
    }

    public async Task<ConsumptionRecord?> GetByClientGeneratedId(string clientGeneratedId)
    {
        return await _consumptionRecordRepository.GetByClientGeneratedId(clientGeneratedId);
    }

    public async Task<decimal?> GetAverageConsumption(int meterId)
    {
        return await _consumptionRecordRepository.GetAverageConsumption(meterId);
    }
}
