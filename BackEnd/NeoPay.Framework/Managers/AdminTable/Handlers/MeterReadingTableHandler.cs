using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Managers.AdminTable.Abstractions;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.MeterReading;

namespace NeoPay.Framework.Managers.AdminTable.Handlers;

public class MeterReadingTableHandler : AdminTableHandler<ListMeterReadingModel, MeterReadingEntity>
{
    public override    string                   Entity { get; set; } = AdminTableEntities.MeterReading;
    protected override IQueryable<MeterReadingEntity> Query  { get; set; }

    private readonly MeterReadingMapper _meterReadingMapper;

    public MeterReadingTableHandler(IMeterReadingRepository repository, AdminTableService service, MeterReadingMapper meterReadingMapper) : base(service)
    {
        Query = repository.GetQuery();
        _meterReadingMapper = meterReadingMapper;
    }

    protected override ListMeterReadingModel Map(MeterReadingEntity entity)
    {
        return _meterReadingMapper.Map(entity);
    }
}
