using FluentValidation;
using NeoPay.Framework.Models.Utility;

namespace NeoPay.Framework.Validators;

public class CreateUtilityModelValidator : AbstractValidator<CreateUtilityModel>
{
    public CreateUtilityModelValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("Utility name is required.");
        RuleFor(x => x.UnitId).GreaterThan(0).WithMessage("Unit is required.");
    }
}
