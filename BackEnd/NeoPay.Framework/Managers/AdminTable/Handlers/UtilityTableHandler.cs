using Microsoft.EntityFrameworkCore;
using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Managers.AdminTable.Abstractions;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Utility;

namespace NeoPay.Framework.Managers.AdminTable.Handlers;

public class UtilityTableHandler : AdminTableHandler<UtilityModel, UtilityEntity>
{
    public override    string                    Entity { get; set; } = AdminTableEntities.Utility;
    protected override IQueryable<UtilityEntity> Query  { get; set; }

    private readonly UtilityMapper _utilityMapper;

    public UtilityTableHandler(IUtilityRepository repository, AdminTableService service, UtilityMapper utilityMapper) : base(service)
    {
        Query = repository.GetQuery();
        _utilityMapper = utilityMapper;
    }

    protected override UtilityModel Map(UtilityEntity entity)
    {
        return _utilityMapper.Map(entity);
    }
}
