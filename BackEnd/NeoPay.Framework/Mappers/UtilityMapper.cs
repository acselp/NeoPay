using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Unit;
using NeoPay.Framework.Models.Utility;

namespace NeoPay.Framework.Mappers;

public class UtilityMapper
{
    private readonly UnitMapper _unitMapper;

    public UtilityMapper(UnitMapper unitMapper)
    {
        _unitMapper = unitMapper;
    }

    public UtilityModel Map(UtilityEntity utility)
    {
        return new UtilityModel
        {
            Id     = utility.Id,
            Name   = utility.Name,
            UnitId = utility.UnitId,
            Unit   = utility.Unit != null ? _unitMapper.Map(utility.Unit) : null,
            BillingType = utility.BillingType
        };
    }

    public UtilityEntity Map(CreateUtilityModel utility)
    {
        return new UtilityEntity
        {
            Name   = utility.Name,
            UnitId = utility.UnitId,
            BillingType = utility.BillingType
        };
    }

    public UtilityEntity Map(UpdateUtilityModel utility)
    {
        return new UtilityEntity
        {
            Id     = utility.Id,
            Name   = utility.Name,
            UnitId = utility.UnitId,
            BillingType = utility.BillingType
        };
    }

    public List<UtilityModel> Map(IEnumerable<UtilityEntity> utilities)
    {
        return utilities.Select(Map).ToList();
    }
    
    public List<SelectListItem> MapToSelectListItem(IEnumerable<UtilityEntity> utilities)
    {
        return utilities.Select(x => new SelectListItem
        {
            Selected = false,
            Text = x.Name,
            Value = x.Id.ToString()
        }).ToList();
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
