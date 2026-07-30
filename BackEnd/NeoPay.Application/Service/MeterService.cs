using NeoPay.Application.Repository;
using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;

namespace NeoPay.Application.Service;

public class MeterService : IMeterService
{
    private readonly IMeterRepository _meterRepository;
    private readonly IConnectionRepository _connectionRepository;

    public MeterService(IMeterRepository meterRepository, IConnectionRepository connectionRepository)
    {
        _meterRepository = meterRepository;
        _connectionRepository = connectionRepository;
    }

    public async Task<ResultWithValue<MeterEntity>> Create(MeterEntity entity)
    {
        var existingMeter = await _meterRepository.GetBySerialNumber(entity.SerialNumber);
        if (existingMeter != null)
            return Result.Conflict($"Meter with serial number {entity.SerialNumber} already exists");

        return Result.Success(await _meterRepository.Insert(entity));
    }

    public async Task<ResultWithValue<MeterEntity>> GetById(int id)
    {
        var meter = await _meterRepository.GetById(id);
        if (meter == null)
            return Result.NotFound($"Meter with ID {id} not found");

        return Result.Success(meter);
    }

    public async Task<ResultWithValue<IEnumerable<MeterEntity>>> GetAll()
    {
        return Result.Success(await _meterRepository.GetAll());
    }

    public async Task<ResultWithValue<MeterEntity>> GetBySerialNumber(string serialNumber)
    {
        var meter = await _meterRepository.GetBySerialNumber(serialNumber);
        if (meter == null)
            return Result.NotFound($"Meter with serial number {serialNumber} not found");

        return Result.Success(meter);
    }

    public async Task<ResultWithValue<MeterEntity>> Update(MeterEntity entity)
    {
        var existingMeter = await _meterRepository.GetById(entity.Id);
        if (existingMeter == null)
            return Result.NotFound($"Meter with ID {entity.Id} not found");

        var meterWithSameSerial = await _meterRepository.GetBySerialNumber(entity.SerialNumber);
        if (meterWithSameSerial != null && meterWithSameSerial.Id != entity.Id)
            return Result.Conflict($"Meter with serial number {entity.SerialNumber} already exists");

        return Result.Success(await _meterRepository.Update(entity));
    }

    public async Task<Result> Delete(int id)
    {
        var meter = await _meterRepository.GetById(id);
        if (meter == null)
            return Result.NotFound($"Meter with ID {id} not found");

        await _meterRepository.Delete(meter);
        return Result.Success();
    }
}
