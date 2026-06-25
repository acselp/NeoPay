using Microsoft.EntityFrameworkCore;
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
        Query = repository.GetQuery()
            .Include(c => c.CustomerEntity)
            .Include(c => c.UtilityEntity);
    }

    protected override ConnectionModel Map(ConnectionEntity entity)
    {
        return new ConnectionModel
        {
            Id           = entity.Id,
            Status       = entity.Status,
            CustomerId   = entity.CustomerId,
            UtilityId    = entity.UtilityId,
            CustomerName = entity.CustomerEntity != null
                ? $"{entity.CustomerEntity.FirstName} {entity.CustomerEntity.LastName}"
                : null,
            UtilityName  = entity.UtilityEntity?.Name,
            Description =  entity.Description
        };
    }
}
