using NeoPay.Domain.Entities;

namespace NeoPay.Application.Repository;

public interface IMeterReadingRepository : IGenericRepository<MeterReadingEntity>
{
    Task<IEnumerable<MeterReadingEntity>> GetByMeterId(int meterId);
    Task<IEnumerable<MeterReadingEntity>> GetByMeterIdAndDateRange(int meterId, DateTime startDate, DateTime endDate);
}
