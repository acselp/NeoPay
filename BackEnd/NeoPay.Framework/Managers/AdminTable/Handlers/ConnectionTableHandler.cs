using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Managers.AdminTable.Abstractions;
using NeoPay.Framework.Models.Connection;

namespace NeoPay.Framework.Managers.AdminTable.Handlers;

public class ConnectionTableHandler : AdminTableHandler<ConnectionModel, ConnectionEntity>
{
    public override    string                       Entity { get; set; } = AdminTableEntities.Connection;
    protected override IQueryable<ConnectionEntity> Query  { get; set; }

    public ConnectionTableHandler(IConnectionRepository repository, AdminTableService service) : base(service)
    {
        Query = repository.GetQuery();
    }

    protected override ConnectionModel Map(ConnectionEntity entity)
    {
        return new ConnectionModel();
    }
}
