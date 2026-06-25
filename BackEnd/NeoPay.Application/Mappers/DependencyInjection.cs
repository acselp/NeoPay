using Microsoft.Extensions.DependencyInjection;

namespace NeoPay.Application.Mappers;

public static class DependencyInjection
{
    public static void AddMappers(this IServiceCollection services)
    {
        services.AddScoped<MeterReadingMapper>();
    }
}