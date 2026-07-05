using Microsoft.EntityFrameworkCore;
using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Infrastructure.Persistence;

namespace NeoPay.Infrastructure.Repository;

public class LanguageRepository : GenericRepository<LanguageEntity>, ILanguageRepository
{
    public LanguageRepository(PostgresDbContext context) : base(context)
    {
    }
    
    public Task<bool> CodeAlreadyExists(string code)
    {
        return Table.AnyAsync(x => x.Code == code);
    }

    public Task<bool> LanguageExists(int languageId)
    {
        return Table.AnyAsync(x => x.Id == languageId);
    }
}
