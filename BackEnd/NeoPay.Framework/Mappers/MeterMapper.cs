using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Models.Meter;
using NeoPay.Framework.Models.Shared;

namespace NeoPay.Framework.Mappers;

public class MeterMapper
{
    public MeterModel Map(MeterEntity meter)
    {
        return new MeterModel
        {
            Id           = meter.Id,
            SerialNumber = meter.SerialNumber,
            Status       = meter.Status,
            ConnectionId = meter.ConnectionId
        };
    }

    public MeterEntity Map(CreateMeterModel meter)
    {
        return new MeterEntity
        {
            SerialNumber = meter.SerialNumber,
            Status       = meter.Status,
            ConnectionId = meter.ConnectionId
        };
    }

    public MeterEntity Map(UpdateMeterModel meter)
    {
        return new MeterEntity
        {
            Id           = meter.Id,
            SerialNumber = meter.SerialNumber,
            Status       = meter.Status,
            ConnectionId = meter.ConnectionId
        };
    }

    public List<MeterModel> Map(IEnumerable<MeterEntity> meters)
    {
        return meters.Select(Map).ToList();
    }

    public PagedResultModel<MeterModel> Map(PagedList<MeterEntity> pagedList)
    {
        return new PagedResultModel<MeterModel>
        {
            Total     = pagedList.TotalCount,
            PageIndex = pagedList.PageIndex,
            PageSize  = pagedList.PageSize,
            Data      = pagedList.ToList().Select(x => Map(x)).ToList()
        };
    }
}
