using NeoPay.Application.Models.MeterReading;
using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Exceptions;

namespace NeoPay.Application.Service;

public class MeterReadingService
{
    private readonly IMeterReadingRepository _meterReadingRepository;
    private readonly IMeterRepository _meterRepository;

    public MeterReadingService(
        IMeterReadingRepository meterReadingRepository,
        IMeterRepository meterRepository)
    {
        _meterReadingRepository = meterReadingRepository;
        _meterRepository = meterRepository;
    }

    public async Task<MeterReadingEntity> Create(MeterReadingEntity entity)
    {
        var meter = await _meterRepository.GetById(entity.MeterId);
        if (meter == null)
            throw new NotFoundException($"Meter with ID {entity.MeterId} not found");

        return await _meterReadingRepository.Insert(entity);
    }

    public async Task<MeterReadingEntity?> GetById(int id)
    {
        return await _meterReadingRepository.GetById(id);
    }

    public async Task<IEnumerable<MeterReadingEntity>> GetAll()
    {
        return await _meterReadingRepository.GetAll();
    }

    public async Task<IEnumerable<MeterReadingEntity>> GetByMeterId(int meterId)
    {
        return await _meterReadingRepository.GetByMeterId(meterId);
    }
    
    public async Task<MeterReadingEntity?> GetLastReadingByMeterId(int meterId)
    {
        return await _meterReadingRepository.GetLastReadingByMeterId(meterId);
    }

    public async Task<IEnumerable<MeterReadingEntity>> GetByMeterIdAndDateRange(int meterId, DateTime startDate, DateTime endDate)
    {
        return await _meterReadingRepository.GetByMeterIdAndDateRange(meterId, startDate, endDate);
    }

    public async Task<MeterReadingEntity> Update(MeterReadingEntity entity)
    {
        var existingRecord = await _meterReadingRepository.GetById(entity.Id);
        if (existingRecord == null)
            throw new NotFoundException($"ConsumptionRecord with ID {entity.Id} not found");

        var meter = await _meterRepository.GetById(entity.MeterId);
        if (meter == null)
            throw new NotFoundException($"Meter with ID {entity.MeterId} not found");

        return await _meterReadingRepository.Update(entity);
    }

    public async Task Delete(int id)
    {
        var record = await _meterReadingRepository.GetById(id);
        if (record == null)
            throw new NotFoundException($"ConsumptionRecord with ID {id} not found");

        await _meterReadingRepository.Delete(record);
    }
}
