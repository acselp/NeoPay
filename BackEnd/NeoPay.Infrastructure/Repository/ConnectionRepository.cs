using Microsoft.EntityFrameworkCore;
using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Infrastructure.Persistence;

namespace NeoPay.Infrastructure.Repository;

public class ConnectionRepository : GenericRepository<ConnectionEntity>, IConnectionRepository
{
    private readonly PostgresDbContext _context;

    public ConnectionRepository(PostgresDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ConnectionEntity>> GetByCustomerId(int customerId)
    {
        return await _context.Set<ConnectionEntity>()
            .Where(c => c.CustomerId == customerId)
            .ToListAsync();
    }

    public async Task<IEnumerable<ConnectionEntity>> GetByUtilityId(int utilityId)
    {
        return await _context.Set<ConnectionEntity>()
            .Where(c => c.UtilityId == utilityId)
            .ToListAsync();
    }

    public async Task<bool> ConnectionExists(int customerId, int utilityId)
    {
        return await Table.AnyAsync(c => c.CustomerId == customerId && c.UtilityId == utilityId);
    }

    public async Task<ConnectionEntity?> GetByIdWithDetails(int id)
    {
        return await _context.Set<ConnectionEntity>()
            .Include(c => c.CustomerEntity)
            .Include(c => c.UtilityEntity)
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}
