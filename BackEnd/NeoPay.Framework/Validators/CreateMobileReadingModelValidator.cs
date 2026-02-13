using FluentValidation;
using NeoPay.Framework.Models.Mobile;

namespace NeoPay.Framework.Validators;

public class CreateMobileReadingModelValidator : AbstractValidator<CreateMobileReadingModel>
{
    public CreateMobileReadingModelValidator()
    {
        RuleFor(x => x.ClientGeneratedId)
            .NotEmpty()
            .WithMessage("Client generated ID is required for idempotency.");

        RuleFor(x => x.MeterId)
            .GreaterThan(0)
            .WithMessage("Meter ID is required.");

        RuleFor(x => x.Value)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Reading value must be non-negative.");

        RuleFor(x => x.Timestamp)
            .NotEmpty()
            .LessThanOrEqualTo(DateTime.UtcNow.AddMinutes(5))
            .WithMessage("Reading timestamp cannot be in the future.");

        RuleFor(x => x.Source)
            .NotEmpty()
            .WithMessage("Source is required.");
    }
}
