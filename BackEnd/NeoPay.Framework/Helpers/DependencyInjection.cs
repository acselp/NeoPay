using Microsoft.Extensions.DependencyInjection;

namespace NeoPay.Framework.Helpers;

public static class DependencyInjection
{
    public static void AddHelpers(this IServiceCollection services)
    {
        services.AddScoped<MeterHelper>();
    }
}