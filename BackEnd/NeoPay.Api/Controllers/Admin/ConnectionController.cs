using Microsoft.AspNetCore.Mvc;
using NeoPay.Api.Extensions;
using NeoPay.Framework.Managers;
using NeoPay.Framework.Models.Connection;

namespace NeoPay.Api.Controllers.Admin;

[Route("api/[controller]/[action]")]
public class ConnectionController : BaseAdminController
{
    private readonly ConnectionManager _connectionManager;

    public ConnectionController(ConnectionManager connectionManager)
    {
        _connectionManager = connectionManager;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateConnectionModel connection)
    {
        var result = await _connectionManager.Create(connection);
        return result.ToActionResult();
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateConnectionModel connection)
    {
        var result = await _connectionManager.Update(connection);
        return result.ToActionResult();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _connectionManager.Delete(id);
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(GetConnectionFilterModel filter)
    {
        var result = await _connectionManager.GetAll(filter);
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _connectionManager.GetById(id);
        return result.ToActionResult();
    }
}
