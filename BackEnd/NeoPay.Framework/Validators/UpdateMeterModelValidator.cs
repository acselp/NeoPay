using FluentValidation;
using NeoPay.Framework.Models.Meter;

namespace NeoPay.Framework.Validators;

public class UpdateMeterModelValidator : AbstractValidator<UpdateMeterModel>
{
    public UpdateMeterModelValidator()
    {
        RuleFor(x => x.Id).GreaterThan(0).WithMessage("Meter ID is required.");
        RuleFor(x => x.SerialNumber).NotEmpty().WithMessage("Serial number is required.");
        RuleFor(x => x.ConnectionId).GreaterThan(0).WithMessage("Connection ID is required.");
    }
}
