using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Shared.GridModels;

namespace NeoPay.Framework.Managers.AdminTable.Abstractions;

public interface IAdminTableHandler
{
    string                     Entity         { get; }
    Dictionary<string, string> ColumnMappings { get; }
    Task<IPagedResultModel>    Search(GridCommand command);
}