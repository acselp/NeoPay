using Microsoft.Extensions.DependencyInjection;
using NeoPay.Framework.Helpers;
using NeoPay.Framework.Managers;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Validators;

namespace NeoPay.Framework;

public static class DependencyInjection
{
    public static void AddFramework(this IServiceCollection services)
    {
        services.AddValidators();
        services.AddMappers();
        services.AddManagers();
        services.AddHelpers();
    }
}