using FluentValidation;
using NeoPay.Framework.Models.Language;

namespace NeoPay.Framework.Validators.Language;

public class CreateLanguageModelValidator : AbstractValidator<CreateLanguageModel>
{
    public CreateLanguageModelValidator()
    {
        RuleFor(x => x.Code).NotEmpty().WithMessage("Code is required");
        RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => x.Status).NotEmpty().WithMessage("Status is required");
    }
}