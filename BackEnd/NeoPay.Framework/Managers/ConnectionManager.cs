using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Connection;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Validators;

namespace NeoPay.Framework.Managers;

public class ConnectionManager
{
    private readonly IConnectionService             _connectionService;
    private readonly ConnectionMapper               _connectionMapper;
    private readonly CreateConnectionModelValidator _createConnectionModelValidator;
    private readonly UpdateConnectionModelValidator _updateConnectionModelValidator;

    public ConnectionManager(
        IConnectionService             connectionService,
        ConnectionMapper               connectionMapper,
        CreateConnectionModelValidator createConnectionModelValidator,
        UpdateConnectionModelValidator updateConnectionModelValidator)
    {
        _connectionService              = connectionService;
        _connectionMapper               = connectionMapper;
        _createConnectionModelValidator = createConnectionModelValidator;
        _updateConnectionModelValidator = updateConnectionModelValidator;
    }

    public async Task<Result> Create(CreateConnectionModel model)
    {
        var validation = await _createConnectionModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _connectionService.Create(_connectionMapper.Map(model));
    }

    public async Task<Result> Update(UpdateConnectionModel model)
    {
        var validation = await _updateConnectionModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _connectionService.Update(_connectionMapper.Map(model));
    }

    public async Task<Result> Delete(int id)
    {
        return await _connectionService.Delete(id);
    }

    public async Task<ResultWithValue<PagedResultModel<ConnectionModel>>> GetAll(GetConnectionFilterModel filterModel)
    {
        var filter = new PagedFilter
        {
            PageIndex = filterModel.PageIndex,
            PageSize  = filterModel.PageSize
        };

        var result = await _connectionService.GetAll(filter);
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_connectionMapper.Map(result.Value!));
    }

    public async Task<ResultWithValue<ConnectionModel>> GetById(int id)
    {
        var result = await _connectionService.GetById(id);
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_connectionMapper.Map(result.Value!));
    }
}
