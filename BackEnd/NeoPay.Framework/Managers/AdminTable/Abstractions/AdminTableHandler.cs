using System.Reflection;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Shared.GridModels;

namespace NeoPay.Framework.Managers.AdminTable.Abstractions;

public abstract class AdminTableHandler<TModel, TEntity> : IAdminTableHandler where TEntity : BaseEntity
{
    public abstract   string                     Entity         { get; set; }
    protected virtual IQueryable<TEntity>        Query          { get; set; }
    private readonly  AdminTableService          _adminTableService;


    protected AdminTableHandler(AdminTableService adminTableService)
    {
        _adminTableService = adminTableService;
    }

    protected abstract TModel Map(TEntity entity);
    
    public async Task<IPagedResultModel> Search(GridCommand command)
    {
        var data = await _adminTableService.Search(command, Query);

        return new PagedResultModel<TModel>
        {
            Data      = data.Select(Map).ToList(),
            Total     = data.Count,
            PageIndex = data.PageIndex,
            PageSize  = data.PageSize,
        };
    }
}