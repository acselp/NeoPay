using Microsoft.Extensions.DependencyInjection;
using NeoPay.Application.Service.Abstractions;

namespace NeoPay.Application.Service;

public static class DependencyInjection
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddScoped<IAddressService, AddressService>();
        services.AddScoped<IConnectionService, ConnectionService>();
        services.AddScoped<IMeterReadingService, MeterReadingService>();
        services.AddScoped<ICustomerService, CustomerService>();
        services.AddScoped<IMeterService, MeterService>();
        services.AddScoped<IUtilityService, UtilityService>();
        services.AddScoped<IUnitService, UnitService>();
        services.AddScoped<ITariffService, TariffService>();
        services.AddScoped<ILanguageService, LanguageService>();
    }
}
