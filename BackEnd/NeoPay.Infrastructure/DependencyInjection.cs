using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NeoPay.Application.Service;
using NeoPay.Framework;
using NeoPay.Infrastructure.HostedServices;
using NeoPay.Infrastructure.Options;
using NeoPay.Infrastructure.Persistence;
using NeoPay.Infrastructure.Repository;

namespace NeoPay.Infrastructure;

public static class DependencyInjection
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

        services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // Use PascalCase for JSON property names (default .NET naming)
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                });

        services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontendCorsPolicy",
                              policy =>
                              {
                                  // TODO: Restrict origins in production
                                  policy.AllowAnyOrigin()
                                        .AllowAnyHeader()
                                        .AllowAnyMethod();
                              });
        });
        services.AddOptions(configuration);
        services.AddOptions();
        services.AddFramework();
        services.AddRepositories();
        services.AddServices();
        services.AddPersistance(configuration);
        services.AddHostedServices();
    }

    private static void AddOptions(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<DbConnectionStringOptions>(configuration.GetSection(DbConnectionStringOptions.SectionName));
        services.Configure<FrontendOptions>(configuration.GetSection(FrontendOptions.SectionName));
    }
}