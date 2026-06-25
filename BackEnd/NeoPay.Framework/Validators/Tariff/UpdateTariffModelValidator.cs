using FluentValidation;
using NeoPay.Framework.Models.Tariff;

namespace NeoPay.Framework.Validators.Tariff;

public class UpdateTariffModelValidator : AbstractValidator<UpdateTariffModel>
{
    public UpdateTariffModelValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0).WithMessage("Id must be greater than 0")
            .NotEmpty().WithMessage("Id is required");
        RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => x.UnitPrice).GreaterThanOrEqualTo(0).WithMessage("Unit price must be greater than or equal to 0");
    }
}
