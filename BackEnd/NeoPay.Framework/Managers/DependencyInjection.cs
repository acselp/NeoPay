using Microsoft.Extensions.DependencyInjection;
using NeoPay.Framework.Managers.AdminTable;

namespace NeoPay.Framework.Managers;

public static class DependencyInjection
{
    public static void AddManagers(this IServiceCollection services)
    {
        services.AddAdminTableManager();

        services.AddScoped<AddressManager>();
        services.AddScoped<ConnectionManager>();
        services.AddScoped<CustomerManager>();
        services.AddScoped<MeterManager>();
        services.AddScoped<UtilityManager>();
    }
}