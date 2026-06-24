using Microsoft.EntityFrameworkCore;
using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Infrastructure.Persistence;

namespace NeoPay.Infrastructure.Repository;

public class MeterRepository : GenericRepository<MeterEntity>, IMeterRepository
{
    private readonly PostgresDbContext _context;

    public MeterRepository(PostgresDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<MeterEntity?> GetBySerialNumber(string serialNumber)
    {
        return await _context.Set<MeterEntity>()
            .FirstOrDefaultAsync(m => m.SerialNumber == serialNumber);
    }
}
