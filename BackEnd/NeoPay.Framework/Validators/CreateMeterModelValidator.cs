using FluentValidation;
using NeoPay.Framework.Models.Meter;

namespace NeoPay.Framework.Validators;

public class CreateMeterModelValidator : AbstractValidator<CreateMeterModel>
{
    public CreateMeterModelValidator()
    {
        RuleFor(x => x.SerialNumber).NotEmpty().WithMessage("Serial number is required.");
    }
}
