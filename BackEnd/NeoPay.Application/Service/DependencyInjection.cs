using Microsoft.Extensions.DependencyInjection;

namespace NeoPay.Application.Service;

public static class DependencyInjection
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddScoped<AddressService>();
        services.AddScoped<ConnectionService>();
        services.AddScoped<ConsumptionRecordService>();
        services.AddScoped<CustomerService>();
        services.AddScoped<MeterService>();
        services.AddScoped<UtilityService>();
        services.AddScoped<UnitService>();
        services.AddScoped<TariffService>();
    }
}