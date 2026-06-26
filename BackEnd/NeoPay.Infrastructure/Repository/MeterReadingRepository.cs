using Microsoft.EntityFrameworkCore;
using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Infrastructure.Persistence;

namespace NeoPay.Infrastructure.Repository;

public class MeterReadingRepository : GenericRepository<MeterReadingEntity>, IMeterReadingRepository
{
    private readonly PostgresDbContext _context;

    public MeterReadingRepository(PostgresDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<MeterReadingEntity>> GetByMeterId(int meterId)
    {
        return await _context.Set<MeterReadingEntity>()
            .Where(cr => cr.MeterId == meterId)
            .ToListAsync();
    }
    
    public async Task<MeterReadingEntity?> GetLastReadingByMeterId(int meterId)
    {
        return await _context.Set<MeterReadingEntity>()
                             .Where(cr => cr.MeterId == meterId)
                             .OrderBy(x => x.CreatedOnUtc)
                             .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<MeterReadingEntity>> GetByMeterIdAndDateRange(
        int meterId, DateTime startDate, DateTime endDate)
    {
        return await _context.Set<MeterReadingEntity>()
                             .Where(cr => cr.MeterId      == meterId   &&
                                          cr.CreatedOnUtc >= startDate &&
                                          cr.CreatedOnUtc <= endDate)
                             .ToListAsync();
    }
}