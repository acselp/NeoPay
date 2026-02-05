using FluentValidation;
using NeoPay.Application.Service;
using NeoPay.Domain.Exceptions;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Connection;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Validators;

namespace NeoPay.Framework.Managers;

public class ConnectionManager
{
    private readonly ConnectionService              _connectionService;
    private readonly ConnectionMapper               _connectionMapper;
    private readonly CreateConnectionModelValidator _createConnectionModelValidator;
    private readonly UpdateConnectionModelValidator _updateConnectionModelValidator;

    public ConnectionManager(
        ConnectionService              connectionService,
        ConnectionMapper               connectionMapper,
        CreateConnectionModelValidator createConnectionModelValidator,
        UpdateConnectionModelValidator updateConnectionModelValidator)
    {
        _connectionService              = connectionService;
        _connectionMapper               = connectionMapper;
        _createConnectionModelValidator = createConnectionModelValidator;
        _updateConnectionModelValidator = updateConnectionModelValidator;
    }

    public async Task Create(CreateConnectionModel model)
    {
        await _createConnectionModelValidator.ValidateAndThrowAsync(model);
        await _connectionService.Create(_connectionMapper.Map(model));
    }

    public async Task Update(UpdateConnectionModel model)
    {
        await _updateConnectionModelValidator.ValidateAndThrowAsync(model);
        await _connectionService.Update(_connectionMapper.Map(model));
    }

    public async Task Delete(int id)
    {
        await _connectionService.Delete(id);
    }

    public async Task<PagedResultModel<ConnectionModel>> GetAll(GetConnectionFilterModel filterModel)
    {
        var filter = new PagedFilter
        {
            PageIndex = filterModel.PageIndex,
            PageSize  = filterModel.PageSize
        };

        var pagedList = await _connectionService.GetAll(filter);
        return _connectionMapper.Map(pagedList);
    }

    public async Task<ConnectionModel> GetById(int id)
    {
        var entity = await _connectionService.GetById(id);
        if (entity == null)
            throw new NotFoundException($"Connection with ID {id} not found");

        return _connectionMapper.Map(entity);
    }
}