using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Unit;

namespace NeoPay.Framework.Mappers;

public class UnitMapper
{
    public UnitModel Map(UnitEntity entity)
    {
        return new UnitModel
        {
            Id = entity.Id,
            Code = entity.Code,
            LongName = entity.LongName,
            Description = entity.Description,
            Symbol = entity.Symbol,
        };
    }

    public UnitEntity Map(CreateUnitModel model)
    {
        return new UnitEntity
        {
            Code =  model.Code,
            LongName = model.LongName,
            Description = model.Description,
            Symbol = model.Symbol
        };
    }

    public UnitEntity Map(UpdateUnitModel model)
    {
        return new UnitEntity
        {
            Id = model.Id,
            Code =  model.Code,
            LongName = model.LongName,
            Description = model.Description,
            Symbol = model.Symbol
        };
    }

    public List<UnitModel> Map(IEnumerable<UnitEntity> utilities)
    {
        return utilities.Select(Map).ToList();
    }

    public PagedResultModel<UnitModel> Map(PagedList<UnitEntity> pagedList)
    {
        return new PagedResultModel<UnitModel>
        {
            Total = pagedList.TotalCount,
            PageIndex = pagedList.PageIndex,
            PageSize = pagedList.PageSize,
            Data = pagedList.ToList().Select(x => Map(x)).ToList()
        };
    }
}