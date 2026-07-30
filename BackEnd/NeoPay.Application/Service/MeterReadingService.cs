using NeoPay.Application.Repository;
using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;

namespace NeoPay.Application.Service;

public class MeterReadingService : IMeterReadingService
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

    public async Task<ResultWithValue<MeterReadingEntity>> Create(MeterReadingEntity entity)
    {
        var meter = await _meterRepository.GetById(entity.MeterId);
        if (meter == null)
            return Result.NotFound($"Meter with ID {entity.MeterId} not found");

        return Result.Success(await _meterReadingRepository.Insert(entity));
    }

    public async Task<ResultWithValue<MeterReadingEntity>> GetById(int id)
    {
        var reading = await _meterReadingRepository.GetById(id);
        if (reading == null)
            return Result.NotFound($"ConsumptionRecord with ID {id} not found");

        return Result.Success(reading);
    }

    public async Task<ResultWithValue<IEnumerable<MeterReadingEntity>>> GetAll()
    {
        return Result.Success(await _meterReadingRepository.GetAll());
    }

    public async Task<ResultWithValue<IEnumerable<MeterReadingEntity>>> GetByMeterId(int meterId)
    {
        return Result.Success(await _meterReadingRepository.GetByMeterId(meterId));
    }

    public async Task<ResultWithValue<MeterReadingEntity>> GetLastReadingByMeterId(int meterId)
    {
        var reading = await _meterReadingRepository.GetLastReadingByMeterId(meterId);
        if (reading == null)
            return Result.NotFound($"No reading found for meter with ID {meterId}");

        return Result.Success(reading);
    }

    public async Task<ResultWithValue<IEnumerable<MeterReadingEntity>>> GetByMeterIdAndDateRange(int meterId,
        DateTime startDate, DateTime endDate)
    {
        return Result.Success(
            await _meterReadingRepository.GetByMeterIdAndDateRange(meterId, startDate, endDate));
    }

    public async Task<ResultWithValue<MeterReadingEntity>> Update(MeterReadingEntity entity)
    {
        var existingRecord = await _meterReadingRepository.GetById(entity.Id);
        if (existingRecord == null)
            return Result.NotFound($"ConsumptionRecord with ID {entity.Id} not found");

        var meter = await _meterRepository.GetById(entity.MeterId);
        if (meter == null)
            return Result.NotFound($"Meter with ID {entity.MeterId} not found");

        return Result.Success(await _meterReadingRepository.Update(entity));
    }

    public async Task<Result> Delete(int id)
    {
        var record = await _meterReadingRepository.GetById(id);
        if (record == null)
            return Result.NotFound($"ConsumptionRecord with ID {id} not found");

        await _meterReadingRepository.Delete(record);
        return Result.Success();
    }
}
