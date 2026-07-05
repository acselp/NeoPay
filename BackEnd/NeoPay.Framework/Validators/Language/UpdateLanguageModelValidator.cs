using FluentValidation;
using NeoPay.Framework.Models.Language;

namespace NeoPay.Framework.Validators.Language;

public class UpdateLanguageModelValidator : AbstractValidator<UpdateLanguageModel>
{
    public UpdateLanguageModelValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0).WithMessage("Id must be greater than 0")
            .NotEmpty().WithMessage("Id is required");
        RuleFor(x => x.Code).NotEmpty().WithMessage("Code is required");
        RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => x.Status).NotEmpty().WithMessage("Status is required");
    }
}