using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Managers.AdminTable.Abstractions;
using NeoPay.Framework.Models.Utility;

namespace NeoPay.Framework.Managers.AdminTable.Handlers;

public class UtilityTableHandler : AdminTableHandler<UtilityModel, UtilityEntity>
{
    public override    string                    Entity { get; set; } = AdminTableEntities.Utility;
    protected override IQueryable<UtilityEntity> Query  { get; set; }

    public UtilityTableHandler(IUtilityRepository repository, AdminTableService service) : base(service)
    {
        Query = repository.GetQuery();
    }

    public override Dictionary<string, string> ColumnMappings => new()
    {
        { nameof(UtilityModel.Id), nameof(UtilityEntity.Id) },
        { nameof(UtilityModel.Name), nameof(UtilityEntity.Name) },
        { nameof(UtilityModel.UnitType), nameof(UtilityEntity.UnitType) }
    };
}