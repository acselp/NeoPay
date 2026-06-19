using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NeoPay.Application.Interfaces;

namespace NeoPay.Infrastructure.Caching;

public static class DependencyInjection
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = configuration.GetConnectionString("Redis");
        });
        
        services.AddScoped<ICacheService, RedisCacheService>();
    }
}