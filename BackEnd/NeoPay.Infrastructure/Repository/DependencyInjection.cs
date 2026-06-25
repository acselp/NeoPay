using Microsoft.Extensions.DependencyInjection;
using NeoPay.Application.Repository;

namespace NeoPay.Infrastructure.Repository;

public static class DependencyInjection
{
    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<ICustomerRepository, CustomerRepository>();
        services.AddScoped<IAddressRepository, AddressRepository>();
        services.AddScoped<IUtilityRepository, UtilityRepository>();
        services.AddScoped<IConnectionRepository, ConnectionRepository>();
        services.AddScoped<IMeterRepository, MeterRepository>();
        services.AddScoped<IMeterReadingRepository, MeterReadingRepository>();
        services.AddScoped<IUnitRepository, UnitRepository>();
        services.AddScoped<ITariffRepository, TariffRepository>();
    }
}