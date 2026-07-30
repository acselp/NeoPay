using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;

namespace NeoPay.Application.Service.Abstractions;

public interface IMeterReadingService
{
    Task<ResultWithValue<MeterReadingEntity>> Create(MeterReadingEntity entity);

    Task<ResultWithValue<MeterReadingEntity>> GetById(int id);

    Task<ResultWithValue<IEnumerable<MeterReadingEntity>>> GetAll();

    Task<ResultWithValue<IEnumerable<MeterReadingEntity>>> GetByMeterId(int meterId);

    Task<ResultWithValue<MeterReadingEntity>> GetLastReadingByMeterId(int meterId);

    Task<ResultWithValue<IEnumerable<MeterReadingEntity>>> GetByMeterIdAndDateRange(int meterId, DateTime startDate,
        DateTime endDate);

    Task<ResultWithValue<MeterReadingEntity>> Update(MeterReadingEntity entity);

    Task<Result> Delete(int id);
}
