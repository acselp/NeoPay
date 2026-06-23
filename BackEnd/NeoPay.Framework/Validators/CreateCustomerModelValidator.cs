using FluentValidation;
using NeoPay.Framework.Models.Customer;

namespace NeoPay.Framework.Validators;

public class CreateCustomerModelValidator : AbstractValidator<CreateCustomerModel>
{
    public CreateCustomerModelValidator()
    {
        RuleFor(x => x.FirstName).NotEmpty().WithMessage("First name is required.");
        RuleFor(x => x.LastName).NotEmpty().WithMessage("Last name is required.");
        RuleFor(x => x.Email).EmailAddress().WithMessage("Email is required.");
        RuleFor(x => x.Phone).NotEmpty().WithMessage("Phone is required.");
        RuleFor(x => x.AccountNr).NotEmpty().WithMessage("Account number is required.");
    }
}