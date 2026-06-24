using FluentValidation;
using NeoPay.Framework.Models.Unit;

namespace NeoPay.Framework.Validators.Unit;

public class UpdateUnitModelValidator : AbstractValidator<UpdateUnitModel>
{
    public UpdateUnitModelValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0).WithMessage("Id must be greater than 0")
            .NotEmpty().WithMessage("Id is required");
        RuleFor(x => x.Code).NotEmpty().WithMessage("Code is required");
        RuleFor(x => x.LongName).NotEmpty().WithMessage("Long name is required");
        RuleFor(x => x.Symbol).NotEmpty().WithMessage("Symbol is required");
    }
}