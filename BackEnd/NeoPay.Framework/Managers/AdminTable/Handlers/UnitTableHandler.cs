using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Managers.AdminTable.Abstractions;
using NeoPay.Framework.Models.Unit;

namespace NeoPay.Framework.Managers.AdminTable.Handlers;

public class UnitTableHandler : AdminTableHandler<UnitModel, UnitEntity>
{
    public override string Entity { get; set; } = AdminTableEntities.Unit;
    protected override IQueryable<UnitEntity> Query { get; set; }

    public UnitTableHandler(IUnitRepository repository, AdminTableService service) : base(service)
    {
        Query = repository.GetQuery();
    }

    protected override UnitModel Map(UnitEntity entity)
    {
        return new UnitModel
        {
            Code = entity.Code,
            Description = entity.Description,
            LongName = entity.LongName,
            Symbol = entity.Symbol,
            Id = entity.Id
        };
    }
}