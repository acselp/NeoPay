using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Infrastructure.Persistence;

namespace NeoPay.Infrastructure.Repository;

public class LanguageRepository : GenericRepository<LanguageEntity>, ILanguageRepository
{
    public LanguageRepository(PostgresDbContext context) : base(context)
    {
    }
}
