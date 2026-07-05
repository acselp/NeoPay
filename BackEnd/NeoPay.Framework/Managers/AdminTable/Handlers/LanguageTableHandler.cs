using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Managers.AdminTable.Abstractions;
using NeoPay.Framework.Models.Language;

namespace NeoPay.Framework.Managers.AdminTable.Handlers;

public class LanguageTableHandler : AdminTableHandler<LanguageModel, LanguageEntity>
{
    public override string Entity { get; set; } = AdminTableEntities.Language;
    protected override IQueryable<LanguageEntity> Query { get; set; }

    public LanguageTableHandler(ILanguageRepository repository, AdminTableService service) : base(service)
    {
        Query = repository.GetQuery();
    }

    protected override LanguageModel Map(LanguageEntity entity)
    {
        return new LanguageModel
        {
            Code = entity.Code,
            Title = entity.Title,
            Status = entity.Status,
            Id = entity.Id
        };
    }
}