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

    public override Dictionary<string, string> ColumnMappings => new()
    {
        { nameof(MeterModel.Id), nameof(MeterEntity.Id) },
        { nameof(MeterModel.SerialNumber), nameof(MeterEntity.SerialNumber) },
        { nameof(MeterModel.Status), nameof(MeterEntity.Status) },
        { nameof(MeterModel.ConnectionId), nameof(MeterEntity.ConnectionId) }
    };
}
