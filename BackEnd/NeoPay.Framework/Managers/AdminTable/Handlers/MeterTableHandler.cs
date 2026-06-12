using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Managers.AdminTable.Abstractions;
using NeoPay.Framework.Models.Meter;

namespace NeoPay.Framework.Managers.AdminTable.Handlers;

public class MeterTableHandler : AdminTableHandler<MeterModel, MeterEntity>
{
    public override    string                  Entity { get; set; } = AdminTableEntities.Meter;
    protected override IQueryable<MeterEntity> Query  { get; set; }

    public MeterTableHandler(IMeterRepository repository, AdminTableService service) : base(service)
    {
        Query = repository.GetQuery();
    }

    protected override MeterModel Map(MeterEntity entity)
    {
        return new MeterModel();
    }
}
