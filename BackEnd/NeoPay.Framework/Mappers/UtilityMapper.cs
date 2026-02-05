using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Utility;

namespace NeoPay.Framework.Mappers;

public class UtilityMapper
{
    public UtilityModel Map(UtilityEntity utility)
    {
        return new UtilityModel
        {
            Id       = utility.Id,
            Name     = utility.Name,
            UnitType = utility.UnitType
        };
    }

    public UtilityEntity Map(CreateUtilityModel utility)
    {
        return new UtilityEntity
        {
            Name     = utility.Name,
            UnitType = utility.UnitType
        };
    }

    public UtilityEntity Map(UpdateUtilityModel utility)
    {
        return new UtilityEntity
        {
            Id       = utility.Id,
            Name     = utility.Name,
            UnitType = utility.UnitType
        };
    }

    public List<UtilityModel> Map(IEnumerable<UtilityEntity> utilities)
    {
        return utilities.Select(Map).ToList();
    }

    public PagedResultModel<UtilityModel> Map(PagedList<UtilityEntity> pagedList)
    {
        return new PagedResultModel<UtilityModel>
        {
            Total     = pagedList.TotalCount,
            PageIndex = pagedList.PageIndex,
            PageSize  = pagedList.PageSize,
            Data      = pagedList.ToList().Select(x => Map(x)).ToList()
        };
    }
}