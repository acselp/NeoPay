using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Models.Connection;
using NeoPay.Framework.Models.Shared;

namespace NeoPay.Framework.Mappers;

public class ConnectionMapper
{
    public ConnectionModel Map(ConnectionEntity connection)
    {
        return new ConnectionModel
        {
            Id         = connection.Id,
            Status     = connection.Status,
            CustomerId = connection.CustomerId,
            UtilityId  = connection.UtilityId
        };
    }

    public ConnectionEntity Map(CreateConnectionModel connection)
    {
        return new ConnectionEntity
        {
            Status     = connection.Status,
            CustomerId = connection.CustomerId,
            UtilityId  = connection.UtilityId
        };
    }

    public ConnectionEntity Map(UpdateConnectionModel connection)
    {
        return new ConnectionEntity
        {
            Id         = connection.Id,
            Status     = connection.Status,
            CustomerId = connection.CustomerId,
            UtilityId  = connection.UtilityId
        };
    }

    public List<ConnectionModel> Map(IEnumerable<ConnectionEntity> connections)
    {
        return connections.Select(Map).ToList();
    }

    public PagedResultModel<ConnectionModel> Map(PagedList<ConnectionEntity> pagedList)
    {
        return new PagedResultModel<ConnectionModel>
        {
            Total     = pagedList.TotalCount,
            PageIndex = pagedList.PageIndex,
            PageSize  = pagedList.PageSize,
            Data      = pagedList.ToList().Select(x => Map(x)).ToList()
        };
    }
}