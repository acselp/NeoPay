using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Managers.AdminTable.Abstractions;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Tariff;

namespace NeoPay.Framework.Managers.AdminTable.Handlers;

public class TariffTableHandler : AdminTableHandler<TariffModel, TariffEntity>
{
    public override    string                   Entity { get; set; } = AdminTableEntities.Tariff;
    protected override IQueryable<TariffEntity> Query  { get; set; }

    private readonly TariffMapper _tariffMapper;

    public TariffTableHandler(ITariffRepository repository, AdminTableService service, TariffMapper tariffMapper) : base(service)
    {
        Query = repository.GetQuery();
        _tariffMapper = tariffMapper;
    }

    protected override TariffModel Map(TariffEntity entity)
    {
        return _tariffMapper.Map(entity);
    }
}
