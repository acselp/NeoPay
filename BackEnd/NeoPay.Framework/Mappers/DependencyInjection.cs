using Microsoft.Extensions.DependencyInjection;

namespace NeoPay.Framework.Mappers;

public static class DependencyInjection
{
    public static void AddMappers(this IServiceCollection services)
    {
        services.AddScoped<AddressMapper>();
        services.AddScoped<ConnectionMapper>();
        services.AddScoped<CustomerMapper>();
        services.AddScoped<MeterMapper>();
        services.AddScoped<UtilityMapper>();
        services.AddScoped<MobileMapper>();
    }
}