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

    public async Task<IEnumerable<MeterEntity>> GetByConnectionId(int connectionId)
    {
        return await _context.Set<MeterEntity>()
            .Where(m => m.ConnectionId == connectionId)
            .ToListAsync();
    }

    public async Task<MeterEntity?> GetBySerialNumber(string serialNumber)
    {
        return await _context.Set<MeterEntity>()
            .FirstOrDefaultAsync(m => m.SerialNumber == serialNumber);
    }

    public async Task<MeterEntity?> GetByBarcode(string barcode)
    {
        return await _context.Set<MeterEntity>()
            .FirstOrDefaultAsync(m => m.BarcodeValue == barcode);
    }
}
