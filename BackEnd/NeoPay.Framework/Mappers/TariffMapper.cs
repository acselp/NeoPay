using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Tariff;

namespace NeoPay.Framework.Mappers;

public class TariffMapper
{
    public TariffModel Map(TariffEntity entity)
    {
        return new TariffModel
        {
            Id        = entity.Id,
            Title     = entity.Title,
            UnitPrice = entity.UnitPrice,
            UtilityId = entity.UtilityId,
        };
    }

    public TariffEntity Map(CreateTariffModel model)
    {
        return new TariffEntity
        {
            Title     = model.Title,
            UnitPrice = model.UnitPrice,
            UtilityId = model.UtilityId,
        };
    }

    public TariffEntity Map(UpdateTariffModel model)
    {
        return new TariffEntity
        {
            Id        = model.Id,
            Title     = model.Title,
            UnitPrice = model.UnitPrice,
            UtilityId = model.UtilityId,
        };
    }

    public List<TariffModel> Map(IEnumerable<TariffEntity> tariffs)
    {
        return tariffs.Select(Map).ToList();
    }

    public PagedResultModel<TariffModel> Map(PagedList<TariffEntity> pagedList)
    {
        return new PagedResultModel<TariffModel>
        {
            Total     = pagedList.TotalCount,
            PageIndex = pagedList.PageIndex,
            PageSize  = pagedList.PageSize,
            Data      = pagedList.ToList().Select(x => Map(x)).ToList()
        };
    }
}
