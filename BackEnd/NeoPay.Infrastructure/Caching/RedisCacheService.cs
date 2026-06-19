using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;
using NeoPay.Application.Interfaces;

namespace NeoPay.Infrastructure.Caching;

public class RedisCacheService : ICacheService
{
    private readonly IDistributedCache _redisCache;

    public RedisCacheService(IDistributedCache redisCache)
    {
        _redisCache = redisCache;
    }

    public async Task<T?> GetAsync<T>(string key)
    {
        var cacheData = await _redisCache.GetStringAsync(key);

        return cacheData == null
                   ? default
                   : JsonSerializer.Deserialize<T>(cacheData);
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan expiresAt)
    {
        var serializedData = JsonSerializer.Serialize(value);

        await _redisCache.SetStringAsync(
                                   key,
                                   serializedData,
                                   new DistributedCacheEntryOptions
                                   {
                                       AbsoluteExpirationRelativeToNow = expiresAt
                                   });
    }

    public async Task RemoveAsync(string key)
    {
        await _redisCache.RemoveAsync(key);
    }
}