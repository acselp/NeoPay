using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Filters;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Customer;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Shared.GridModels;
using NeoPay.Framework.Validators;

namespace NeoPay.Framework.Managers;

public class CustomerManager
{
    private readonly ICustomerService             _customerService;
    private readonly CustomerMapper               _customerMapper;
    private readonly CreateCustomerModelValidator _createCustomerModelValidator;
    private readonly UpdateCustomerModelValidator _updateCustomerModelValidator;

    public CustomerManager(
        ICustomerService             customerService,
        CustomerMapper               customerMapper,
        CreateCustomerModelValidator createCustomerModelValidator,
        UpdateCustomerModelValidator updateCustomerModelValidator)
    {
        _customerService              = customerService;
        _customerMapper               = customerMapper;
        _createCustomerModelValidator = createCustomerModelValidator;
        _updateCustomerModelValidator = updateCustomerModelValidator;
    }

    public async Task<Result> Create(CreateCustomerModel model)
    {
        var validation = await _createCustomerModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _customerService.Create(_customerMapper.Map(model));
    }

    public async Task<Result> Update(UpdateCustomerModel model)
    {
        var validation = await _updateCustomerModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _customerService.Update(_customerMapper.Map(model));
    }

    public async Task<Result> Delete(int id)
    {
        return await _customerService.Delete(id);
    }

    public async Task<ResultWithValue<PagedResultModel<CustomerModel>>> GetAll(GetCustomerFilterModel filterModel)
    {
        var filter = new CustomerGetAllFilter
        {
            PageIndex     = filterModel.PageIndex,
            PageSize      = filterModel.PageSize,
            SortField     = filterModel.SortField,
            SortDirection = filterModel.SortDirection,
            SearchTerm    = filterModel.SearchTerm,
            FirstName     = filterModel.FirstName,
            LastName      = filterModel.LastName,
            Email         = filterModel.Email,
            Phone         = filterModel.Phone,
            AccountNr     = filterModel.AccountNr
        };

        var result = await _customerService.GetAll(filter);
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_customerMapper.Map(result.Value!));
    }

    public async Task<ResultWithValue<CustomerModel>> GetById(int id)
    {
        var result = await _customerService.GetById(id);
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_customerMapper.Map(result.Value!));
    }
}
