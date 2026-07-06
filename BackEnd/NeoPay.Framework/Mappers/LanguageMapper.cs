using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Language;

namespace NeoPay.Framework.Mappers;

public class LanguageMapper
{
    public LanguageModel Map(LanguageEntity entity)
    {
        return new LanguageModel
        {
            Id = entity.Id,
            Code = entity.Code,
            Title = entity.Title,
            Status = entity.Status,
        };
    }

    public LanguageEntity Map(CreateLanguageModel model)
    {
        return new LanguageEntity
        {
            Code = model.Code,
            Title = model.Title,
            Status = model.Status
        };
    }

    public LanguageEntity Map(UpdateLanguageModel model)
    {
        return new LanguageEntity
        {
            Id = model.Id,
            Code = model.Code,
            Title = model.Title,
            Status = model.Status,
        };
    }

    public List<LanguageModel> Map(IEnumerable<LanguageEntity> languages)
    {
        return languages.Select(Map).ToList();
    }

    public PagedResultModel<LanguageModel> Map(PagedList<LanguageEntity> pagedList)
    {
        return new PagedResultModel<LanguageModel>
        {
            Total = pagedList.TotalCount,
            PageIndex = pagedList.PageIndex,
            PageSize = pagedList.PageSize,
            Data = pagedList.ToList().Select(x => Map(x)).ToList()
        };
    }
}