using System.Reflection;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Shared.GridModels;

namespace NeoPay.Framework.Managers.AdminTable.Abstractions;

public abstract class AdminTableHandler<TModel, TEntity> : IAdminTableHandler where TEntity : BaseEntity
{
    public abstract   string                     Entity         { get; set; }
    protected virtual IQueryable<TEntity>        Query          { get; set; }
    public abstract   Dictionary<string, string> ColumnMappings { get; }
    private readonly  AdminTableService          _adminTableService;


    protected AdminTableHandler(AdminTableService adminTableService)
    {
        _adminTableService = adminTableService;
    }

    public async Task<IPagedResultModel> Search(GridCommand command)
    {
        ConfigureFilterMapping(command.Filters);

        var data = await _adminTableService.Search(command, Query);

        return new PagedResultModel<TModel>
        {
            Data      = data.Select(Map).ToList(),
            Total     = data.Count,
            PageIndex = data.PageIndex,
            PageSize  = data.PageSize,
        };
    }

    private TModel Map(TEntity entity)
    {
        TModel model = Activator.CreateInstance<TModel>();

        foreach (var mapping in ColumnMappings)
        {
            string modelPropName  = mapping.Key;
            string entityPropName = mapping.Value;

            PropertyInfo modelProp  = typeof(TModel).GetProperty(modelPropName);
            PropertyInfo entityProp = typeof(TEntity).GetProperty(entityPropName);

            if (modelProp != null && entityProp != null)
            {
                // Ensure property types are compatible before copying value
                if (modelProp.PropertyType == entityProp.PropertyType)
                {
                    object value = entityProp.GetValue(entity);
                    modelProp.SetValue(model, value);
                }
                else
                {
                    // Handle type conversion if necessary
                    // For simplicity, this example skips incompatible types
                    Console.WriteLine($"Warning: Property types for mapping '{modelPropName}' -> '{entityPropName}' are incompatible.");
                }
            }
        }

        return model;
    }

    private void ConfigureFilterMapping(List<GridFilter> models)
    {
        foreach (var filter in models)
        {
            if (!string.IsNullOrWhiteSpace(filter.Property) &&
                ColumnMappings.TryGetValue(filter.Property, out var entityProperty))
            {
                filter.Property = entityProperty;
            }
            else
            {
                throw new Exception($"Property {filter.Property} does not have a filter mapping configured");
            }
        }
    }
}