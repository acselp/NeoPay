using NeoPay.Domain.Entities;

namespace NeoPay.Application.Repository;

public interface ILanguageRepository : IGenericRepository<LanguageEntity>
{
    Task<bool> CodeAlreadyExists(string code);
    Task<bool> LanguageExists(int languageId);
}