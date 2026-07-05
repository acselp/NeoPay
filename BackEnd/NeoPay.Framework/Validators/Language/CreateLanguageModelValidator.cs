using FluentValidation;
using NeoPay.Framework.Models.Language;

namespace NeoPay.Framework.Validators.Language;

public class CreateLanguageModelValidator : AbstractValidator<CreateLanguageModel>
{
    public CreateLanguageModelValidator()
    {
        RuleFor(x => x.Code).NotEmpty().WithMessage("Code is required").MaximumLength(10);
        RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required").MaximumLength(50);
        RuleFor(x => x.Status).NotEmpty().WithMessage("Status is required");
    }
}