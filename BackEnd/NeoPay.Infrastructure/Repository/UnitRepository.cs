using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Infrastructure.Persistence;

namespace NeoPay.Infrastructure.Repository;

public class UnitRepository : GenericRepository<UnitEntity>, IUnitRepository
{
    public UnitRepository(PostgresDbContext context) : base(context)
    {
    }
}
