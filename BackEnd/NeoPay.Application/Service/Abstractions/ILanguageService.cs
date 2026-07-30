using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service.Abstractions;

public interface ILanguageService
{
    Task<ResultWithValue<LanguageEntity>> Create(LanguageEntity entity);

    Task<ResultWithValue<LanguageEntity>> GetById(int id);

    Task<ResultWithValue<IEnumerable<LanguageEntity>>> GetAll();

    Task<ResultWithValue<PagedList<LanguageEntity>>> GetAll(PagedFilter filter);

    Task<ResultWithValue<LanguageEntity>> Update(LanguageEntity entity);

    Task<Result> Delete(int id);
}
