using Microsoft.EntityFrameworkCore;
using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Infrastructure.Persistence;

namespace NeoPay.Infrastructure.Repository;

public class ConsumptionRecordRepository : GenericRepository<ConsumptionRecord>, IConsumptionRecordRepository
{
    private readonly PostgresDbContext _context;

    public ConsumptionRecordRepository(PostgresDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ConsumptionRecord>> GetByMeterId(int meterId)
    {
        return await _context.Set<ConsumptionRecord>()
            .Where(cr => cr.MeterId == meterId)
            .ToListAsync();
    }

    public async Task<IEnumerable<ConsumptionRecord>> GetByMeterIdAndDateRange(int meterId, DateTime startDate, DateTime endDate)
    {
        return await _context.Set<ConsumptionRecord>()
            .Where(cr => cr.MeterId == meterId &&
                        cr.CreatedOnUtc >= startDate &&
                        cr.CreatedOnUtc <= endDate)
            .ToListAsync();
    }

    public async Task<ConsumptionRecord?> GetLastByMeterId(int meterId)
    {
        return await _context.Set<ConsumptionRecord>()
            .Where(cr => cr.MeterId == meterId)
            .OrderByDescending(cr => cr.ReadingTimestamp)
            .FirstOrDefaultAsync();
    }

    public async Task<ConsumptionRecord?> GetByClientGeneratedId(string clientGeneratedId)
    {
        return await _context.Set<ConsumptionRecord>()
            .FirstOrDefaultAsync(cr => cr.ClientGeneratedId == clientGeneratedId);
    }

    public async Task<decimal?> GetAverageConsumption(int meterId)
    {
        var records = await _context.Set<ConsumptionRecord>()
            .Where(cr => cr.MeterId == meterId && cr.AmountUsed > 0)
            .OrderByDescending(cr => cr.ReadingTimestamp)
            .Take(10)
            .ToListAsync();

        if (records.Count == 0)
            return null;

        return records.Average(r => r.AmountUsed);
    }
}
