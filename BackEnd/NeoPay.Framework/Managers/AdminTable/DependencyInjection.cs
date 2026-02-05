using Microsoft.Extensions.DependencyInjection;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Managers.AdminTable.Abstractions;
using NeoPay.Framework.Managers.AdminTable.Handlers;
using NeoPay.Framework.Models.Customer;
using NeoPay.Framework.Models.Utility;

namespace NeoPay.Framework.Managers.AdminTable;

public static class DependencyInjection
{
    public static void AddAdminTableManager(this IServiceCollection services)
    {
        services.AddScoped<AdminTableManager>();

        services.AddScoped<AdminTableService>();

        services.AddScoped<IAdminTableHandler, CustomerTableHandler>();
        services.AddScoped<IAdminTableHandler, UtilityTableHandler>();
    }
}