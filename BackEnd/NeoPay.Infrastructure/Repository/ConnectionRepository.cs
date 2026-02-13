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
            .Include(c => c.Customer)
                .ThenInclude(cust => cust.Address)
            .Include(c => c.UtilityEntity)
            .Include(c => c.Meter)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<ConnectionEntity>> SearchForMobile(string? query, string status)
    {
        var queryable = _context.Set<ConnectionEntity>()
            .Include(c => c.Customer)
                .ThenInclude(cust => cust.Address)
            .Include(c => c.UtilityEntity)
            .Include(c => c.Meter)
            .AsQueryable();

        // Filter by status
        if (status != "all")
        {
            var statusValue = status switch
            {
                "Active" => 1,
                "Inactive" => 0,
                "Suspended" => 2,
                _ => 1
            };
            queryable = queryable.Where(c => c.Status == statusValue);
        }

        // Search query
        if (!string.IsNullOrWhiteSpace(query))
        {
            var lowerQuery = query.ToLower();
            queryable = queryable.Where(c =>
                (c.Customer.FirstName + " " + c.Customer.LastName).ToLower().Contains(lowerQuery) ||
                (c.Customer.Address.Street + " " + c.Customer.Address.City).ToLower().Contains(lowerQuery) ||
                c.Id.ToString().Contains(lowerQuery) ||
                (c.Meter != null && c.Meter.SerialNumber.ToLower().Contains(lowerQuery)));
        }

        return await queryable.Take(50).ToListAsync();
    }
}
