using Microsoft.Extensions.DependencyInjection;
using NeoPay.Application.Mappers;
using NeoPay.Application.Service;

namespace NeoPay.Application;

public static class DependencyInjection
{
    public static void AddApplication(this IServiceCollection services)
    {
        services.AddServices();
        services.AddMappers();
    }
}