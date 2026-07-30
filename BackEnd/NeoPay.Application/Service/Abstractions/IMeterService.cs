using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;

namespace NeoPay.Application.Service.Abstractions;

public interface IMeterService
{
    Task<ResultWithValue<MeterEntity>> Create(MeterEntity entity);

    Task<ResultWithValue<MeterEntity>> GetById(int id);

    Task<ResultWithValue<IEnumerable<MeterEntity>>> GetAll();

    Task<ResultWithValue<MeterEntity>> GetBySerialNumber(string serialNumber);

    Task<ResultWithValue<MeterEntity>> Update(MeterEntity entity);

    Task<Result> Delete(int id);
}
