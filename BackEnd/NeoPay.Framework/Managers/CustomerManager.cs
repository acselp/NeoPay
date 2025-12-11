using FluentValidation;
using NeoPay.Application.Service;
using NeoPay.Domain.Exceptions;
using NeoPay.Domain.Filters;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Customer;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Validators;

namespace NeoPay.Framework.Managers;

public class CustomerManager
{
    private readonly CustomerService _customerService;
    private readonly CustomerMapper _customerMapper;
    private readonly CreateCustomerModelValidator _createCustomerModelValidator;
    private readonly UpdateCustomerModelValidator _updateCustomerModelValidator;

    public CustomerManager(
        CustomerService customerService,
        CustomerMapper customerMapper,
        CreateCustomerModelValidator createCustomerModelValidator,
        UpdateCustomerModelValidator updateCustomerModelValidator)
    {
        _customerService = customerService;
        _customerMapper = customerMapper;
        _createCustomerModelValidator = createCustomerModelValidator;
        _updateCustomerModelValidator = updateCustomerModelValidator;
    }

    public async Task Create(CreateCustomerModel model)
    {
        await _createCustomerModelValidator.ValidateAndThrowAsync(model);
        await _customerService.Create(_customerMapper.Map(model));
    }

    public async Task Update(UpdateCustomerModel model)
    {
        await _updateCustomerModelValidator.ValidateAndThrowAsync(model);
        await _customerService.Update(_customerMapper.Map(model));
    }

    public async Task Delete(int id)
    {
        await _customerService.Delete(id);
    }

    public async Task<PagedResultModel<CustomerModel>> GetAll(GetCustomerFilterModel filterModel)
    {
        var filter = new CustomerGetAllFilter
        {
            PageIndex = filterModel.PageIndex,
            PageSize = filterModel.PageSize,
            SortField = filterModel.SortField,
            SortDirection = filterModel.SortDirection,
            SearchTerm = filterModel.SearchTerm,
            FirstName = filterModel.FirstName,
            LastName = filterModel.LastName,
            Email = filterModel.Email,
            Phone = filterModel.Phone,
            AccountNr = filterModel.AccountNr
        };

        var pagedList = await _customerService.GetAll(filter);
        return _customerMapper.Map(pagedList);
    }

    public async Task<CustomerModel> GetById(int id)
    {
        var entity = await _customerService.GetById(id);
        if (entity == null)
            throw new NotFoundException($"Customer with ID {id} not found");

        return _customerMapper.Map(entity);
    }
}