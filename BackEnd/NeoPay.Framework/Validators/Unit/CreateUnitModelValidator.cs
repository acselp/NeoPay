using FluentValidation;
using NeoPay.Framework.Models.Unit;

namespace NeoPay.Framework.Validators.Unit;

public class CreateUnitModelValidator : AbstractValidator<CreateUnitModel>
{
    public CreateUnitModelValidator()
    {
        RuleFor(x => x.Code).NotEmpty().WithMessage("Code is required");
        RuleFor(x => x.LongName).NotEmpty().WithMessage("Long name is required");
        RuleFor(x => x.Symbol).NotEmpty().WithMessage("Symbol is required");
    }
}