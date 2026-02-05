using NeoPay.Framework.Managers.AdminTable.Abstractions;
using NeoPay.Framework.Managers.AdminTable.Handlers;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Shared.GridModels;

namespace NeoPay.Framework.Managers.AdminTable;

public class AdminTableManager
{
    private readonly Dictionary<string, IAdminTableHandler?> _strategies;

    public AdminTableManager(IEnumerable<IAdminTableHandler> strategies)
    {
        _strategies = strategies.ToDictionary(s => s.Entity, StringComparer.OrdinalIgnoreCase);
    }

    public async Task<IPagedResultModel> Search(GridCommand command)
    {
        if (_strategies.TryGetValue(command.Entity, out IAdminTableHandler handler))
        {
            return await handler.Search(command);
        }
        else
        {
            throw new ArgumentException($"No strategy found for name: {command.Entity}");
        }
    }
}