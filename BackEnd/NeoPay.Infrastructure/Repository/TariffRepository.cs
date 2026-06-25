using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Infrastructure.Persistence;

namespace NeoPay.Infrastructure.Repository;

public class TariffRepository : GenericRepository<TariffEntity>, ITariffRepository
{
    public TariffRepository(PostgresDbContext context) : base(context)
    {
    }
}
