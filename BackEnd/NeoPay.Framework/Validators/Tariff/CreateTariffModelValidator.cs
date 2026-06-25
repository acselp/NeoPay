using FluentValidation;
using NeoPay.Framework.Models.Tariff;

namespace NeoPay.Framework.Validators.Tariff;

public class CreateTariffModelValidator : AbstractValidator<CreateTariffModel>
{
    public CreateTariffModelValidator()
    {
        RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => x.UnitPrice).GreaterThanOrEqualTo(0).WithMessage("Unit price must be greater than or equal to 0");
    }
}
